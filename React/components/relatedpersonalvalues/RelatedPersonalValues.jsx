import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import personalValuesService from "../../services/personalValuesService";
import { getTypes } from "../../services/lookUpService";
import toastr from "toastr";
import Swal from "sweetalert2";
import personalValueSchema from "../../schemas/personalValueSchema";
import RelatedPersonalValuesCard from "./RelatedPersonalValuesCard";

const _logger = sabioDebug.extend("RelatedPersonalValues");

function RelatedPersonalValues() {
  const [mappedPairings, setMappedPairings] = useState([]);
  const [personalValues, setPersonalValues] = useState([]);

  useEffect(() => {
    personalValuesService
      .selectAll()
      .then(onGetValuesSuccess)
      .catch(onGetValuesError);
  }, []);

  useEffect(() => {
    getTypes(["personalvalues"]).then(onGetTypesSuccess).catch(onGetTypesError);
  }, []);

  const mapPairings = useCallback((pairing) => {
    return (
      <RelatedPersonalValuesCard
        personalValue={pairing}
        key={`ValuePairing-${pairing.personalValueA.id}-${pairing.personalValueB.id}`}
        onDelete={handleDeleteValues}
      />
    );
  }, []);

  const onGetTypesSuccess = useCallback((response) => {
    const personalValuesArray = response.item.personalvalues;
    setPersonalValues(personalValuesArray);
  });

  const onGetTypesError = (err) => {
    _logger("onGetTypesError", err);
  };

  const onGetValuesSuccess = useCallback((response) => {
    const responseArray = response.items;
    const updatedPairings = responseArray.reverse().map((pairing) => {
      return mapPairings(pairing);
    });

    setMappedPairings(updatedPairings);
  }, []);

  const onGetValuesError = (err) => {
    toastr.error("There was an error. Please refresh your page");
    _logger("onGetValuesError", err);
  };

  const initialValues = {
    personalValueA: "",
    personalValueB: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    const successHandler = onSubmitSuccess(values, resetForm);

    personalValuesService
      .createRelated(values)
      .then(successHandler)
      .catch(onSubmitError);
  };

  const onSubmitSuccess = (values, resetForm) => {
    toastr.success("Pairing submitted successfully");

    const newRelatedValues = {
      personalValueA: {
        id: values.personalValueA,
        name:
          personalValues.find(
            (personalValues) => personalValues.id === values.personalValueA
          )?.name || "",
      },
      personalValueB: {
        id: values.personalValueB,
        name:
          personalValues.find(
            (personalValues) => personalValues.id === values.personalValueB
          )?.name || "",
      },
    };

    setMappedPairings((prevPairings) => {
      const newState = [...prevPairings];

      newState.unshift(mapPairings(newRelatedValues));

      return newState;
    });

    resetForm();
  };

  const onSubmitError = (err) => {
    toastr.error("There was an error. Please try again!");
    _logger("onSubmitError", err);
  };

  const handleDeleteValues = (personalValue) => {
    const { personalValueA, personalValueB } = personalValue;

    const payload = {
      personalValueA: personalValueA.id,
      personalValueB: personalValueB.id,
    };

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const onSuccess = () => onHandleDeleteSuccess(payload);
          personalValuesService
            .deleteRelated(payload.personalValueA, payload.personalValueB)
            .then(onSuccess)
            .catch(onHandleDeleteError);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Delete cancelled",
            "error"
          );
        }
      });
  };

  const onHandleDeleteSuccess = (payload) => {
    setMappedPairings((prevState) => {
      const filteredPairings = prevState.map((valuePairing) => {
        const updatedPairing = {
          ...valuePairing,
          personalValue: {
            ...valuePairing.personalValue,
          },
        };

        if (
          updatedPairing.props.personalValue.personalValueA.id ===
            payload.personalValueA &&
          updatedPairing.props.personalValue.personalValueB.id ===
            payload.personalValueB
        ) {
          return null;
        }

        return updatedPairing;
      });

      return filteredPairings;
    });
    swalWithBootstrapButtons.fire(
      "Deleted!",
      "Personal Value Pairing deleted",
      "success"
    );
  };

  const onHandleDeleteError = (err) => {
    toastr.error("Deleting values unsuccessful, Please try again!");
    _logger("onHandleDeleteError", err);
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <h4 className="bm-2">Insert Personal Values</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={personalValueSchema.relatedPersonalValues}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="form-group mt-4 col-9">
                <label htmlFor="personalValueA">Personal Value A</label>
                <Field
                  type="number"
                  id="personalValueA"
                  name="personalValueA"
                  className="form-control"
                  placeholder="10"
                />
                <ErrorMessage
                  name="personalValueA"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group mt-4 mb-2 col-9">
                <label htmlFor="personalValueB">Personal Value B</label>
                <Field
                  type="number"
                  id="personalValueB"
                  name="personalValueB"
                  className="form-control"
                  placeholder="11"
                />
                <ErrorMessage
                  name="personalValueB"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button type="submit" className="btn btn-primary mt-2">
                Add Pairing
              </button>
            </Form>
          </Formik>
        </div>
        <div className="col-5">
          <h4 className="bm-2">Personal Value Pairings</h4>
          {mappedPairings}
        </div>
      </div>
    </div>
  );
}

export default RelatedPersonalValues;

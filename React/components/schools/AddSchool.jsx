import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Swal from "sweetalert2";
import schoolService from "../../services/schoolService";
import schoolSchema from "../../schemas/schoolSchema";
import { useLocation, useNavigate } from "react-router";
import AutoCompleteWithName from "./AutoCompleteWithName";
import * as lookUpService from "../../services/lookUpService";
import locationServices from "../../services/locationService";
import toastr from "toastr";

const AddSchool = () => {
  const _logger = debug.extend("SchoolsAdd");
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false); // address fields show on autocomplete load
  const [schoolData, setSchoolData] = useState({
    id: 0,
    name: "",
    locationId: 0,
    locationTypeId: 3,
    logoUrl: "",
    state: "",
    latitude: 0,
    longitude: 0,
    lineOne: "",
    city: "",
    zip: 0,
    stateId: 0,
  });

  const [states, setStates] = useState({
    states: [],
  });
  useEffect(() => {
    lookUpService
      .getTypes(["States"])
      .then(onStateLookUpSuccess)
      .catch(onStateLookUpError);
    if (
      location?.state?.type === "school-edit-view" &&
      location.state.payload
    ) {
      _logger(location.state.payload);
      setSchoolData((prev) => {
        const n = { ...prev };
        n.id = location.state.payload.id;
        n.name = location.state.payload.name;
        n.locationId = location.state.payload.location.id;
        n.logoUrl = location.state.payload.logoUrl;
        return n;
      });
    }
  }, []);

  const onStateLookUpSuccess = (response) => {
    let statesArray = response.item.states;
    setStates((prevState) => {
      let newState = { ...prevState };
      newState.states = statesArray;
      return newState;
    });
  };

  const onStateLookUpError = (error) => {
    _logger("onStateLookUpError", error);
  };

  const handleSubmit = (school) => {
    if (schoolData.id !== 0) {
      schoolService
        .updateSchool(school, location.state.payload.id)
        .then(updateSchoolSuccess)
        .catch(updateSchoolError);
    } else {
      schoolService
        .addSchool(school)
        .then(addSchoolSuccess)
        .catch(addSchoolError);
    }
  };

  const addSchoolSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "School is added",
      confirmButtonText: "Ok",
    });
  };

  const addSchoolError = (error) => {
    _logger("School add error", error);
    Swal.fire({
      icon: "error",
      title: "Could not add school",
      confirmButtonText: "Try Again",
    });
  };

  const updateSchoolSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "School information updated",
      confirmButtonText: "Ok",
      showCloseButton: true,
      padding: "2em",
    });
  };

  const updateSchoolError = (error) => {
    _logger("School update error", error);
    Swal.fire({
      icon: "error",
      title: "Could not update information",
      confirmButtonText: "Try Again",
      padding: "2em",
    });
  };

  const navigateToList = () => {
    navigate(`/schools/paged`);
  };

  const captureAutocompleteLocation = (
    setValues,
    name,
    lat,
    lng,
    address,
    city,
    zipCode,
    state
  ) => {
    const stateValue = states.states.find((stateDb) => stateDb.name === state);

    setValues((prevState) => {
      let nS = { ...prevState };
      nS.name = name;
      nS.latitude = lat;
      nS.longitude = lng;
      nS.lineOne = address.split(",").shift();
      nS.city = city;
      nS.zip = zipCode;
      nS.state = stateValue.name;
      nS.stateId = stateValue.id;
      _logger(nS);
      return nS;
    });
    setShow(true);
    Swal.fire({
      icon: "info",
      title: "School location selected",
      text: "Some schools do not have a central postal address",
      confirmButtonText: "Ok",
      showCloseButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      padding: "2em",
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          LocationTypeId: schoolData.locationTypeId,
          LineOne: address.split(",").shift(),
          LineTwo: "",
          City: city,
          Zip: zipCode,
          StateId: stateValue.id,
          Latitude: lat,
          Longitude: lng,
        };
        locationServices
          .addLocation(payload)
          .then((response) => addLocationSuccess(response, setValues))
          .catch(addLocationError);
      }
    });
  };

  const addLocationSuccess = (response, setValues) => {
    setValues((prev) => {
      const n = { ...prev };
      n.locationId = response?.data?.item;
      return n;
    });
  };

  const addLocationError = (error) => {
    _logger(error);
    toastr.error("Could not add location");
  };
  return (
    <>
      <Container fluid className="mt-5 pt-5 ms-5">
        <Row className="ms-7">
          <Col lg={5} md={5}>
            <Card className="p-3 ms-5">
              <Card.Title className="my-0">
                <h1 className="ms-3 text-primary">
                  {location?.state?.payload?.id ? "Edit School" : "Add School"}
                </h1>
              </Card.Title>
              <Card.Body>
                <Formik
                  initialValues={schoolData}
                  onSubmit={handleSubmit}
                  validationSchema={schoolSchema.addSchema}
                  enableReinitialize={true}
                >
                  {({ values, setValues }) => (
                    <Form>
                      <div className="form-group d-none">
                        <label htmlFor="id">School Id</label>
                        <Field
                          type="number"
                          name="id"
                          className="form-control mb-2"
                          placeholder="School Id"
                        />
                        <ErrorMessage name="id" component="div"></ErrorMessage>
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">School Name</label>
                        <AutoCompleteWithName
                          captureAutocompleteLocation={(
                            name,
                            lat,
                            lng,
                            address,
                            city,
                            zipCode,
                            state
                          ) =>
                            captureAutocompleteLocation(
                              setValues,
                              name,
                              lat,
                              lng,
                              address,
                              city,
                              zipCode,
                              state
                            )
                          }
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                        ></ErrorMessage>
                      </div>
                      {show && (
                        <>
                          {values.lineOne !== values.city ? (
                            <div className="form-group">
                              <label htmlFor="lineOne">Address</label>
                              <Field
                                type="text"
                                name="lineOne"
                                className="form-control mb-2"
                              />
                              <ErrorMessage
                                name="lineOne"
                                component="div"
                                className="mb-2"
                              ></ErrorMessage>
                            </div>
                          ) : null}
                          <div className="form-group">
                            <label htmlFor="city">City</label>
                            <Field
                              type="text"
                              name="city"
                              className="form-control mb-2"
                            />
                            <ErrorMessage
                              name="city"
                              component="div"
                              className="mb-2"
                            ></ErrorMessage>
                          </div>
                          <div className="form-group">
                            <label htmlFor="state">State</label>
                            <Field
                              type="text"
                              name="state"
                              className="form-control mb-2"
                            />
                            <ErrorMessage
                              name="state"
                              component="div"
                              className="mb-2"
                            ></ErrorMessage>
                          </div>
                          <div className="form-group">
                            <label htmlFor="zip">Zip Code</label>
                            <Field
                              type="text"
                              name="zip"
                              className="form-control mb-2 disabled"
                            />
                            <ErrorMessage
                              name="zip"
                              component="div"
                              className="mb-2"
                            ></ErrorMessage>
                          </div>
                        </>
                      )}
                      <div className="form-group mt-3">
                        <label htmlFor="logoUrl">
                          Add a URL for the school&apos;s logo
                        </label>
                        <Field
                          type="uri"
                          name="logoUrl"
                          id="logoUrl"
                          className="form-control mb-2"
                          placeholder="Enter logo url"
                        />
                        <ErrorMessage
                          name="logoUrl"
                          component="div"
                          className="mb-2"
                        ></ErrorMessage>
                      </div>
                      <Row>
                        <Col md={4} lg={4} xs={4}>
                          <Button type="submit">
                            {location?.state?.payload?.id
                              ? "Update"
                              : "Add School"}
                          </Button>
                        </Col>
                        <Col>
                          <p
                            onClick={navigateToList}
                            className="mt-1 text-primary text-decoration-underline cursor-pointer"
                          >
                            See All Schools
                          </p>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddSchool;

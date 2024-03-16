import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Field, Formik, ErrorMessage, Form } from "formik";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as workHistoryServices from "../../services/workHistoryServices";
import wpSchema from "../../schemas/workPositionFormSchema.js";
import { getTypes } from "../../services/lookUpService.js";
import Swal from "sweetalert2";

const _logger = sabioDebug.extend("workPositionForm");

export default function WorkPositionForm(props) {
  _logger("workPositionForm", props);
  const [pageData, setPageData] = useState({
    id: props.parentState.workPositionId,
    name: props.parentState.name,
    description: props.parentState.description,
    workHistoryId: props.parentState.workHistoryId,
    wageTypeId: props.parentState.wageTypeId,
    wageType: [],
    wageTypeComponent: [],
    jobTypeId: props.parentState.jobTypeId,
    jobType: [],
    jobTypeComponent: [],
  });

  useEffect(() => {
    getTypes(["JobTypes", "JobWageTypes"])
      .then(lookUpSuccess)
      .catch(lookUpError);
  }, []);

  const onSubmitHandler = (values) => {
    if (pageData.id === 0) {
      workHistoryServices
        .addWorkPosition(values)
        .then((response) => addWPSuccess(response))
        .catch(addWPError);
    } else {
      workHistoryServices
        .editWorkPosition(values)
        .then((response) => editWPSuccess(response))
        .catch(editWPError);
    }
  };

  const deleteWP = () => {
    Swal.fire({
      title: "Delete Work position record?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Close`,
    }).then((result) => {
      if (result.isConfirmed) {
        workHistoryServices
          .deleteWorkPosition(pageData.id)
          .then(deleteWPSuccess)
          .catch(deleteWPError);
      } else if (result.isDenied) {
        props.setParentState((prevState) => {
          const newState = { ...prevState };
          newState.showId = 1;
          newState.button1 = "+ Create";
          newState.workHistoryId = 0;
          newState.companyName = "";
          newState.companyContact = "";
          newState.companyEmail = "";
          newState.companyPhone = "";
          newState.locationId = 0;
          newState.industryId = 0;
          newState.startDate = new Date();
          newState.endDate = new Date();
          newState.workPositionId = 0;
          newState.name = "";
          newState.description = "";
          newState.wageTypeId = 0;
          newState.jobTypeId = 0;
          return newState;
        });
      }
    });
  };

  const mapLookUp = (element) => {
    return (
      <option key={element.id} value={element.id}>
        {element.name}
      </option>
    );
  };

  const addWPSuccess = (response) => {
    _logger("add WP success...", response);
    Swal.fire({
      icon: "success",
      title: "Work position record created.",
      showDenyButton: true,
      confirmButtonText: "Create Position",
      denyButtonText: `Close`,
    }).then((result) => {
      if (result.isConfirmed) {
        props.setParentState((prevState) => {
          const newState = { ...prevState };
          newState.showId = 1;
          return newState;
        });
        props.setParentState((prevState) => {
          const newState = { ...prevState };
          newState.showId = 3;
          newState.button1 = "Display Work History";
          newState.workPositionId = 0;
          newState.name = "";
          newState.description = "";
          newState.wageTypeId = 0;
          newState.jobTypeId = 0;
          return newState;
        });
      } else if (result.isDenied) {
        props.setParentState((prevState) => {
          const newState = { ...prevState };
          newState.showId = 1;
          newState.button1 = "+ Create";
          newState.workHistoryId = 0;
          newState.companyName = "";
          newState.companyContact = "";
          newState.companyEmail = "";
          newState.companyPhone = "";
          newState.locationId = 0;
          newState.industryId = 0;
          newState.startDate = new Date();
          newState.endDate = new Date();
          newState.workPositionId = 0;
          newState.name = "";
          newState.description = "";
          newState.wageTypeId = 0;
          newState.jobTypeId = 0;
          return newState;
        });
      }
    });
  };

  const addWPError = (error) => {
    _logger("create WP error...", error);
    Swal.fire({
      icon: "error",
      title: "Error creating work position record.",
      confirmButtonText: "Close",
    });
  };

  const editWPSuccess = (response) => {
    _logger("edit WP success...", response);
    Swal.fire({
      icon: "success",
      title: "Work position record edited.",
      confirmButtonText: `Close`,
    }).then((result) => {
      if (result.isConfirmed) {
        props.setParentState((prevState) => {
          const newState = { ...prevState };
          newState.showId = 1;
          newState.button1 = "+ Create";
          newState.workHistoryId = 0;
          newState.companyName = "";
          newState.companyContact = "";
          newState.companyEmail = "";
          newState.companyPhone = "";
          newState.locationId = 0;
          newState.industryId = 0;
          newState.startDate = new Date();
          newState.endDate = new Date();
          newState.workPositionId = 0;
          newState.name = "";
          newState.description = "";
          newState.wageTypeId = 0;
          newState.jobTypeId = 0;
          return newState;
        });
      }
    });
  };

  const editWPError = (error) => {
    _logger("edit WP error...", error);
    Swal.fire({
      icon: "error",
      title: "Error editing work position record.",
      confirmButtonText: "Close",
    });
  };

  const deleteWPSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Work position record deleted.",
      confirmButtonText: `Close`,
    }).then((result) => {
      if (result.isConfirmed) {
        props.setParentState((prevState) => {
          const newState = { ...prevState };
          newState.showId = 1;
          newState.button1 = "+ Create";
          newState.workHistoryId = 0;
          newState.companyName = "";
          newState.companyContact = "";
          newState.companyEmail = "";
          newState.companyPhone = "";
          newState.locationId = 0;
          newState.industryId = 0;
          newState.startDate = new Date();
          newState.endDate = new Date();
          newState.workPositionId = 0;
          newState.name = "";
          newState.description = "";
          newState.wageTypeId = 0;
          newState.jobTypeId = 0;
          return newState;
        });
      }
    });
  };

  const deleteWPError = (error) => {
    _logger("delete WP error...", error);
    Swal.fire({
      icon: "error",
      title: "Error deleting work position record.",
      confirmButtonText: "Close",
    });
  };

  const lookUpSuccess = (data) => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.wageType = [data.item.jobWageTypes];
      newState.wageTypeComponent = [data.item.jobWageTypes.map(mapLookUp)];
      newState.wageTypeId = data.item.jobWageTypes[0].id;
      newState.jobType = [data.item.jobTypes];
      newState.jobTypeComponent = [data.item.jobTypes.map(mapLookUp)];
      newState.jobTypeId = data.item.jobTypes[0].id;
      return newState;
    });
  };

  const lookUpError = (error) => {
    _logger("location error...", error);
  };

  return (
    <Card className="m-1">
      <Card.Body>
        <Formik
          enableReinitialize={true}
          initialValues={pageData}
          onSubmit={onSubmitHandler}
          validationSchema={wpSchema}
        >
          {({ isSubmitting, submitForm, isValid, dirty }) => (
            <Form>
              <Row className="justify-content-md-center p-2">
                <Col md="auto">
                  <label htmlFor="name" className="pe-1">
                    Position Name
                  </label>
                  <Field id="name" type="text" name="name"></Field>
                  <ErrorMessage name="name"></ErrorMessage>
                </Col>
                <Col md="auto">
                  <label htmlFor="wageTypeId" className="pe-1">
                    Wage
                  </label>
                  <Field as="select" id="wageTypeId" name="wageTypeId">
                    {pageData.wageTypeComponent}
                  </Field>
                  <ErrorMessage name="wageTypeId"></ErrorMessage>
                </Col>
              </Row>
              <Row className="justify-content-md-center p-2">
                <Col md="auto">
                  <label htmlFor="description" className="pe-1">
                    Description
                  </label>
                  <Field
                    id="description"
                    type="text"
                    name="description"
                  ></Field>
                  <ErrorMessage name="description"></ErrorMessage>
                </Col>
                <Col md="auto">
                  <label htmlFor="jobTypeId" className="pe-1">
                    Job
                  </label>
                  <Field as="select" id="jobTypeId" name="jobTypeId">
                    {pageData.jobTypeComponent}
                  </Field>
                  <ErrorMessage name="jobTypeId"></ErrorMessage>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Button
                    disabled={!isValid || !dirty || isSubmitting}
                    type="submit"
                    fluidsize="large"
                    color="teal"
                    content="Submit"
                    onClick={submitForm}
                  >
                    Submit form
                  </Button>
                  {pageData.id > 0 && (
                    <Button onClick={deleteWP}>Delete</Button>
                  )}
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}

WorkPositionForm.propTypes = {
  parentState: PropTypes.shape({
    workPositionId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    workHistoryId: PropTypes.number.isRequired,
    wageTypeId: PropTypes.number.isRequired,
    jobTypeId: PropTypes.number.isRequired,
  }),
  setParentState: PropTypes.func,
};

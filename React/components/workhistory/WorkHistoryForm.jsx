import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Field, Formik, ErrorMessage, Form } from "formik";
import { Button, Card, Row, Col } from "react-bootstrap";
import * as workHistoryServices from "../../services/workHistoryServices";
import workHistorySchema from "../../schemas/workHistoryFormSchema.js";
import { getTypes } from "../../services/lookUpService.js";
import LocationServices from "../../services/locationService.js";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const _logger = sabioDebug.extend("workHistoryForm");

export default function WorkHistoryForm(props) {
  _logger("WorkHistoryForm", props);
  const [pageData, setPageData] = useState({
    id: props.parentState.workHistoryId,
    companyName: props.parentState.companyName,
    companyContact: props.parentState.companyContact,
    companyEmail: props.parentState.companyEmail,
    companyPhone: props.parentState.companyPhone,
    locationId: props.parentState.locationId,
    locations: [],
    locationsComponent: [],
    industryId: props.parentState.industryId,
    industries: [],
    industriesComponent: [],
    startDate: props.parentState.startDate,
    endDate: props.parentState.endDate,
  });

  useEffect(() => {
    getTypes(["Industries", "States"]).then(lookUpSuccess).catch(lookUpError);
  }, []);

  const onSubmitHandler = (values) => {
    if (pageData.id === 0) {
      workHistoryServices
        .addWorkHistory(values)
        .then((response) => addWHSuccess(response))
        .catch(addWHError);
    } else {
      workHistoryServices
        .editWorkHistory(values)
        .then((response) => editWHSuccess(response))
        .catch(editWHError);
    }
  };

  const deleteWH = () => {
    Swal.fire({
      title: "Delete Work history record?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Close`,
    }).then((result) => {
      if (result.isConfirmed) {
        workHistoryServices
          .deleteWorkHistory(pageData.id)
          .then(deleteWHSuccess)
          .catch(deleteWHError);
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

  const mapLoc = (element) => {
    return (
      <option key={element.id} value={element.id}>
        {element.state.name}, {element.lineOne}, {element.zip}
      </option>
    );
  };

  const mapLookUp = (element) => {
    return (
      <option key={element.id} value={element.id}>
        {element.name}
      </option>
    );
  };

  const addWHSuccess = (response) => {
    _logger("add WH success...", response);
    Swal.fire({
      icon: "success",
      title: "Work history record created.",
      showDenyButton: true,
      confirmButtonText: "Create Position",
      denyButtonText: `Close`,
    }).then((result) => {
      if (result.isConfirmed) {
        props.setParentState((prevState) => {
          const newState = { ...prevState };
          newState.workHistoryId = response.item;
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

  const addWHError = (error) => {
    _logger("WH error...", error);
    Swal.fire({
      icon: "error",
      title: "Error creating work history record.",
      confirmButtonText: "Close",
    });
  };

  const editWHSuccess = (response) => {
    _logger("edit WH success...", response);
    Swal.fire({
      icon: "success",
      title: "Work history record edited.",
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

  const editWHError = (error) => {
    _logger("edit Wh error...", error);
    Swal.fire({
      icon: "error",
      title: "Error editing work history record.",
      confirmButtonText: "Close",
    });
  };

  const deleteWHSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Work history record deleted.",
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

  const deleteWHError = (error) => {
    _logger("delete WH error...", error);
    Swal.fire({
      icon: "error",
      title: "Error deleting work history record.",
      confirmButtonText: "Close",
    });
  };

  const locationSuccess = (data) => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.locations = [data.data.item.pagedItems];
      newState.locationsComponent = [data.data.item.pagedItems.map(mapLoc)];
      newState.locationId = data.data.item.pagedItems[0].id;
      return newState;
    });
  };

  const locationError = (error) => {
    _logger("location error...", error);
  };

  const lookUpSuccess = (data) => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.industries = [data.item.industries];
      newState.industriesComponent = [data.item.industries.map(mapLookUp)];
      newState.industryId = data.item.industries[0].id;
      return newState;
    });
    LocationServices.getAllPaginated(0, 200)
      .then(locationSuccess)
      .catch(locationError);
  };

  const lookUpError = (error) => {
    _logger("lookup error...", error);
  };

  return (
    <Card className="m-1">
      <Card.Body>
        <Formik
          enableReinitialize={true}
          initialValues={pageData}
          onSubmit={onSubmitHandler}
          validationSchema={workHistorySchema}
        >
          {({
            isSubmitting,
            submitForm,
            isValid,
            dirty,
            setFieldValue,
            values,
          }) => (
            <Form>
              <Row className="justify-content-md-center p-2">
                <Col md="auto">
                  <label htmlFor="companyName" className="pe-1">
                    Company Name
                  </label>
                  <Field
                    id="companyName"
                    type="text"
                    name="companyName"
                  ></Field>
                  <ErrorMessage name="companyName"></ErrorMessage>
                </Col>
                <Col md="auto">
                  <label htmlFor="companyEmail" className="pe-1">
                    Email
                  </label>
                  <Field
                    id="companyEmail"
                    type="text"
                    name="companyEmail"
                  ></Field>
                  <ErrorMessage name="companyEmail"></ErrorMessage>
                </Col>
              </Row>
              <Row className="justify-content-md-center p-2">
                <Col md="auto">
                  <label htmlFor="companyContact" className="pe-1">
                    Company Contact
                  </label>
                  <Field
                    id="companyContact"
                    type="text"
                    name="companyContact"
                  ></Field>
                  <ErrorMessage name="companyContact"></ErrorMessage>
                </Col>
                <Col md="auto">
                  <label htmlFor="companyPhone" className="pe-1">
                    Phone Number
                  </label>
                  <Field
                    id="companyPhone"
                    type="text"
                    name="companyPhone"
                  ></Field>
                  <ErrorMessage name="companyPhone"></ErrorMessage>
                </Col>
              </Row>
              <Row className="justify-content-md-center p-2">
                <Col md="auto">
                  <label htmlFor="locationId" className="pe-1">
                    Location
                  </label>
                  <Field as="select" id="locationId" name="locationId">
                    {pageData.locationsComponent}
                  </Field>
                  <ErrorMessage name="locationId"></ErrorMessage>
                </Col>
                <Col md="auto">
                  <label htmlFor="industryId" className="pe-1">
                    Industry
                  </label>
                  <Field as="select" id="industryId" name="industryId">
                    {pageData.industriesComponent}
                  </Field>
                  <ErrorMessage name="industryId"></ErrorMessage>
                </Col>
              </Row>
              <Row className="justify-content-md-center p-2">
                <Col md="auto">
                  <label htmlFor="startDate" className="pe-1">
                    Start Date
                  </label>
                  <DatePicker
                    id="startDate"
                    name="startDate"
                    selected={values.startDate}
                    onChange={(date) => setFieldValue("startDate", date)}
                  />
                  <ErrorMessage name="startDate"></ErrorMessage>
                </Col>
                <Col md="auto">
                  <label htmlFor="endDate" className="pe-1">
                    End Date
                  </label>
                  <DatePicker
                    id="endDate"
                    name="endDate"
                    selected={values.endDate}
                    onChange={(date) => setFieldValue("endDate", date)}
                  />
                  <ErrorMessage name="endDate"></ErrorMessage>
                </Col>
              </Row>
              <Row className="justify-content-md-center p-2">
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
                    <Button onClick={deleteWH}>Delete</Button>
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

WorkHistoryForm.propTypes = {
  parentState: PropTypes.shape({
    workHistoryId: PropTypes.number.isRequired,
    companyName: PropTypes.string.isRequired,
    companyContact: PropTypes.string.isRequired,
    companyEmail: PropTypes.string.isRequired,
    companyPhone: PropTypes.string.isRequired,
    locationId: PropTypes.number.isRequired,
    industryId: PropTypes.number.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
  }),
  setParentState: PropTypes.func,
};

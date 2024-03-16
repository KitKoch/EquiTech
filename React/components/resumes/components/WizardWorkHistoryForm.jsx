import React, { useState, useEffect } from "react";
import { withFormik, Field, Form as FormikForm } from "formik";
import LocationServices from "../../../services/locationService.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import toastr from "toastr";
import wizardWorkHistorySchema from "../../../schemas/wizardWorkHistorySchema.js";

const _logger = logger.extend("work history");

const WizardWorkHistoryForm = (props) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,

    onBack,
    nextLabel,
    backLabel,
  } = props;

  const [pageData, setPageData] = useState({
    companyName: "",
    contactReference: "",
    companyEmail: "",
    companyPhone: "",
    locationId: 0,
    locations: [],
    locationName: "",
    locationsComponent: [],
    industryId: 0,
    industries: "",
    industriesComponent: [],
    startDate: { Date },
    endDate: { Date },
  });

  useEffect(() => {
    lookUp(props.types);
    _logger(props.types);
  }, []);
  props.types;
  const lookUp = (data) => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.industriesComponent = [data.industries.map(mapLookUp)];
      newState.industryId = data.industries[0].id;
      _logger("this is data", data);
      _logger("this is newstate", newState);
      return newState;
    });
    LocationServices.getAllPaginated(0, 200)
      .then(locationSuccess)
      .catch(locationError);
  };

  const locationSuccess = (data) => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.locationsComponent = [data.data.item.pagedItems.map(mapLoc)];
      _logger(newState.locationsComponent);
      newState.locationId = data.data.item.pagedItems[0].id;
      return newState;
    });
  };

  const locationError = (error) => {
    _logger("location error...", error);
    toastr["error"]("Could Not retrieve Location");
  };

  const mapLookUp = (element) => {
    return (
      <option key={element.id} value={element.id}>
        {element.name}
      </option>
    );
  };

  const mapLoc = (element) => {
    return (
      <option key={element.id} value={element.id}>
        {element.state.name}, {element.lineOne}, {element.zip}
      </option>
    );
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center g-0">
          <Col lg={8} md={8} className="py-8 py-x1-0">
            <Card>
              <Card.Header>
                <h1 className="ms-3 text-primary">Work History</h1>
              </Card.Header>
              <Card.Body>
                <FormikForm initialvalues={pageData} onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="companyName">Company Name</label>
                    <Field
                      id="companyName"
                      type="text"
                      name="companyName"
                      className={`form-control mb-2 ${
                        errors.companyName &&
                        touched.companyName &&
                        "is-invalid"
                      }`}
                      value={values?.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></Field>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactReference">Contact Reference</label>
                    <Field
                      id="contactReference"
                      type="text"
                      name="contactReference"
                      className={`form-control mb-2 ${
                        errors.contactReference &&
                        touched.contactReference &&
                        "is-invalid"
                      }`}
                      value={values?.contactReference}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></Field>
                  </div>
                  <div className="form-group">
                    <label htmlFor="companyEmail">Contact Email</label>
                    <Field
                      id="companyEmail"
                      type="email"
                      name="companyEmail"
                      className={`form-control mb-2 ${
                        errors.companyEmail &&
                        touched.companyEmail &&
                        "is-invalid"
                      }`}
                      value={values?.companyEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></Field>
                  </div>
                  <div className="form-group">
                    <label htmlFor="companyPhone">Contact Number</label>
                    <Field
                      id="companyPhone"
                      type="text"
                      name="companyPhone"
                      className={`form-control mb-2 ${
                        errors.companyPhone &&
                        touched.companyPhone &&
                        "is-invalid"
                      }`}
                      value={values?.companyPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></Field>
                  </div>
                  <div className="form-group">
                    <label htmlFor="companyIndustry">Industry</label>
                    <Field
                      id="companyIndustry"
                      as="select"
                      name="industries"
                      className={`form-control mb-2 ${
                        errors.industries && touched.industries && "is-invalid"
                      }`}
                      value={values?.industries}
                      onChange={handleChange}
                    >
                      <option value={0}>Select Industry</option>
                      {pageData.industriesComponent}
                      {""}
                    </Field>
                  </div>
                  <div className="form-group justify-content-md-center">
                    <label htmlFor="companyLocation">Location</label>
                    <Field
                      id="locations"
                      as="select"
                      name="locations"
                      className={`form-control mb-2 ${
                        errors.locations && touched.locations && "is-invalid"
                      }`}
                      value={values?.locations}
                      onChange={handleChange}
                    >
                      <option value={0}> Select Location </option>
                      {pageData.locationsComponent}
                      {""}
                    </Field>
                  </div>

                  <div className="form-group d-flex">
                    <label htmlFor="startDate" className="pe-1">
                      Start Date
                    </label>
                    <DatePicker
                      id="startDate"
                      name="startDate"
                      selected={values?.startDate}
                      onChange={(date) => setFieldValue("startDate", date)}
                      className={`form-control mb-2 ${
                        errors.startDate && touched.startDate && "is-invalid"
                      }`}
                    />
                    <label htmlFor="endDate" className="pe-1">
                      End Date
                    </label>
                    <DatePicker
                      id="endDate"
                      name="endDate"
                      selected={values?.endDate}
                      onChange={(date) => setFieldValue("endDate", date)}
                      className={`form-control mb-2 ${
                        errors.endDate && touched.endDate && "is-invalid"
                      }`}
                    />
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <Button
                      type="button"
                      className="med-md-2 mb-3"
                      onClick={onBack}
                      disabled={isSubmitting}
                    >
                      {backLabel}
                    </Button>
                    <Button type="submit" className="med-md-2 mb-3">
                      {nextLabel}
                    </Button>
                  </div>
                </FormikForm>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

WizardWorkHistoryForm.propTypes = {
  types: PropTypes.shape({
    industries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
  resume: PropTypes.shape({
    companyName: PropTypes.string,
    contactReference: PropTypes.string,
    companyEmail: PropTypes.string,
    companyPhone: PropTypes.string,
    locations: PropTypes.string,
    industries: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
  }).isRequired,
  values: PropTypes.shape({
    companyName: PropTypes.string,
    contactReference: PropTypes.string,
    companyEmail: PropTypes.string,
    companyPhone: PropTypes.string,
    locations: PropTypes.string,
    industries: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
  }).isRequired,
  errors: PropTypes.shape({
    companyName: PropTypes.string,
    contactReference: PropTypes.string,
    companyEmail: PropTypes.string,
    companyPhone: PropTypes.string,
    locations: PropTypes.string,
    industries: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
  }).isRequired,
  touched: PropTypes.shape({
    companyName: PropTypes.bool,
    contactReference: PropTypes.bool,
    companyEmail: PropTypes.bool,
    companyPhone: PropTypes.bool,
    locations: PropTypes.bool,
    industries: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.bool,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  valueId: PropTypes.number,
  onNext: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  backLabel: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    companyName: props.resume.companyName,
    contactReference: props.resume.contactReference,
    companyEmail: props.resume.companyEmail,
    companyPhone: props.resume.companyPhone,
    locations: props.resume.locations,
    industries: props.resume.industries,
    startDate: props.resume.startDate,
    endDate: props.resume.endDate,
  }),

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
  validationSchema: wizardWorkHistorySchema,
})(WizardWorkHistoryForm);

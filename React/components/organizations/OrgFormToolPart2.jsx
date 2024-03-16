import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "react-bootstrap";
import { Field, Form, withFormik } from "formik";
import AutocompleteField from "../location/AutocompleteField";
import orgFormToolSchema from "../../schemas/orgFormToolSchema";
import * as lookUpService from "../../services/lookUpService";
import MapContainer from "../location/MapContainer";

const _loggerPage = logger.extend("ORG");

function OrgFormToolPart2(props) {
  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    setValues,
    cantBack,
    nextLabel,
    backLabel,
    values,
  } = props;

  const orgLoc = props.orgLoc;
  _loggerPage(orgLoc.latitude, "latitude");

  _loggerPage(props, "formtoolpage2");

  const [locationTypes, setLocationTypes] = useState({
    locationTypes: [],
    locationTypesComponent: [],
  });
  const [states, setStates] = useState({
    statesArr: [],
    statesComponent: [],
  });

  const [initialRender, setInitialRender] = useState({
    state: true,
    locationType: true,
    latLng: true,
  });

  useEffect(() => {
    lookUpService
      .getTypes(["LocationTypes", "States"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);

  const onLookUpSuccess = (response) => {
    let typesArray = response.item.locationTypes;
    let statesArray = response.item.states;

    setLocationTypes((prevState) => {
      let newState = { ...prevState };

      newState.locationTypes = typesArray;
      newState.locationTypesComponent = typesArray.map(mappingOptions);

      return newState;
    });

    setStates((prevState) => {
      let newState = { ...prevState };

      newState.statesArr = statesArray;
      newState.statesComponent = statesArray.map(mappingOptions);

      return newState;
    });
  };

  const onLookUpError = (error) => {
    _loggerPage("onGetTypesError", error);
  };

  const mappingOptions = (option) => {
    return (
      <React.Fragment key={option.id}>
        <option value={option.id}>{option.name}</option>
      </React.Fragment>
    );
  };

  const captureAutocompleteLocation = (
    lat,
    lng,
    address,
    city,
    zipCode,
    state
  ) => {
    const stateValue = states.statesArr.find(
      (stateDb) => stateDb.name === state
    );

    setValues({
      latitude: lat,
      longitude: lng,
      lineOne: address,
      city: city,
      zip: zipCode,
      stateId: stateValue.id,
      stateName: stateValue.name,
    });

    setInitialRender((prevState) => {
      let nS = { ...prevState };
      nS.latLng = false;
      return nS;
    });
  };

  function handleBack() {
    props.onBack(values);
  }

  useEffect(() => {
    let id = parseInt(props.values.locationTypeId);
    if (initialRender.locationType === false && id > 0) {
      let index = props.values.locationTypeId - 1;
      setFieldValue(
        "locationTypeName",
        locationTypes.locationTypes[index].name
      );
    } else if (initialRender.locationType === false && id === 0) {
      setFieldValue("locationTypeName", "");
    } else {
      setInitialRender((prevState) => {
        let nS = { ...prevState };
        nS.locationType = false;
        return nS;
      });
    }
  }, [props.values.locationTypeId]);

  useEffect(() => {
    let id = parseInt(props.values.stateId);
    if (initialRender.state === false && id > 0) {
      let index = props.values.stateId - 1;
      setFieldValue("stateName", states.statesArr[index].name);
    } else if (initialRender.state === false && id === 0) {
      setFieldValue("stateName", "");
    } else {
      setInitialRender((prevState) => {
        let nS = { ...prevState };
        nS.state = false;
        return nS;
      });
    }
  }, [props.values.stateId]);

  return (
    <React.Fragment>
      <Row>
        <Col sm={12} className="mt-3">
          <Card>
            <Card.Header>
              <Card.Title>Primary Location</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={handleSubmit}
                validationSchema={orgFormToolSchema.part2}
              >
                <Row>
                  <Col sm={6}>
                    <Row>
                      <Col>
                        <div className="mb-3">
                          <label htmlFor="lineOne" className="form-label">
                            Line One
                          </label>
                          <AutocompleteField
                            captureAutocompleteLocation={
                              captureAutocompleteLocation
                            }
                            className={`form-control ${
                              errors.lineOne && touched.lineOne
                                ? "input-error"
                                : ""
                            }`}
                          />
                          {errors.lineOne && touched.lineOne && (
                            <p className="input-feedback text-danger">
                              {errors.lineOne}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <label htmlFor="lineTwo" className="form-label">
                            Line Two
                          </label>
                          <Field
                            type="text"
                            id="lineTwo"
                            name="lineTwo"
                            aria-describedby="lineTwo"
                            className={`form-control ${
                              errors.lineTwo && touched.lineTwo
                                ? "input-error"
                                : ""
                            }`}
                          />
                          {errors.lineTwo && touched.lineTwo && (
                            <p className="input-feedback text-danger">
                              {errors.lineTwo}
                            </p>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="mb-3">
                          <label htmlFor="city" className="form-label">
                            City
                          </label>
                          <Field
                            type="text"
                            id="city"
                            name="city"
                            aria-describedby="city"
                            className={`form-control ${
                              errors.city && touched.city ? "input-error" : ""
                            }`}
                          />
                          {errors.city && touched.city && (
                            <p className="input-feedback text-danger">
                              {errors.city}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="mb-3">
                          <label htmlFor="stateId" className="form-label">
                            State
                          </label>
                          <Field
                            as="select"
                            name="stateId"
                            id="stateId"
                            className={`form-select ${
                              errors.stateId && touched.stateId
                                ? "input-error"
                                : ""
                            }`}
                          >
                            <option value="">Select...</option>
                            {states.statesComponent}
                          </Field>
                          {errors.stateId && touched.stateId && (
                            <p className="input-feedback text-danger">
                              {errors.stateId}
                            </p>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="mb-3">
                          <label htmlFor="zip" className="form-label">
                            Zip
                          </label>
                          <Field
                            type="text"
                            id="zip"
                            name="zip"
                            aria-describedby="zip"
                            className={`form-control ${
                              errors.zip && touched.zip ? "input-error" : ""
                            }`}
                          />
                          {errors.zip && touched.zip && (
                            <p className="input-feedback text-danger">
                              {errors.zip}
                            </p>
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="mb-3">
                          <label
                            htmlFor="LocationTypeId"
                            className="form-label"
                          >
                            Location Type
                          </label>
                          <Field
                            as="select"
                            name="locationTypeId"
                            id="locationTypeId"
                            className={`form-control ${
                              errors.locationTypeId && touched.locationTypeId
                                ? "input-error"
                                : ""
                            }`}
                          >
                            <option value="">Select...</option>
                            {locationTypes.locationTypesComponent}
                          </Field>
                          {errors.locationTypeId && touched.locationTypeId && (
                            <p className="input-feedback text-danger">
                              {errors.locationTypeId}
                            </p>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    <div>
                      {" "}
                      {initialRender.latLng === true ? (
                        ""
                      ) : (
                        <MapContainer
                          propLat={values.latitude}
                          propLng={values.longitude}
                          key={`${values.latitude}-${values.longitude}`}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
                <Row className="mb-4 mt-5">
                  <Col>
                    <button
                      type="button"
                      disabled={isSubmitting || cantBack}
                      onClick={handleBack}
                      className="btn btn-secondary"
                    >
                      {backLabel}
                    </button>
                  </Col>
                  <Col>
                    <Row className="text-end">
                      <Col>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary"
                        >
                          {nextLabel}
                        </button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

OrgFormToolPart2.propTypes = {
  orgLoc: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  touched: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  isSubmitting: PropTypes.func.isRequired,
  cantBack: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,
  backLabel: PropTypes.string.isRequired,
  values: PropTypes.shape({
    locationTypeId: PropTypes.string.isRequired,
    locationTypeName: PropTypes.string.isRequired,
    stateId: PropTypes.string.isRequired,
    stateName: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
};

export default withFormik({
  mapPropsToValues: (props) => ({
    lineOne: props.orgLoc.lineOne,
    lineTwo: props.orgLoc.lineTwo,
    city: props.orgLoc.city,
    stateId: props.orgLoc.stateId,
    stateName: props.orgLoc.stateName,
    zip: props.orgLoc.zip,
    locationTypeId: props.orgLoc.locationTypeId,
    locationTypeName: props.orgLoc.locationTypeName,
    latitude: props.orgLoc.latitude,
    longitude: props.orgLoc.longitude,
  }),

  enableReinitialize: true,
  validationSchema: orgFormToolSchema.part2,
  handleSubmit: (values, { props }) => {
    _loggerPage("onNext", props, values);
    props.onNext(values);
  },
})(OrgFormToolPart2);

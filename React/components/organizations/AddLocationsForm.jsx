import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import locationServices from "../../services/locationService";
import * as lookUpService from "../../services/lookUpService";
import { useLocation } from "react-router-dom";
import toastr from "toastr";
import LocationFormSchema from "../../schemas/locationFormSchema";
import AutocompleteField from "../location/AutocompleteField";
import MapContainer from "../location/MapContainer";
import "toastr/build/toastr.css";
import PropTypes from "prop-types";
import organizationsServices from "../../services/organizationsServices";

function AddLocationForm(props) {
  const currentUser = props.currentUser;
  const _logger = debug.extend("AddLocation");
  const location = useLocation();
  const [formState, setFormState] = useState({
    locationTypes: [],
    locationTypesComponent: [],
    states: [],
    statesComponent: [],
    showMap: false,
    formData: {
      locationTypeId: 0,
      lineOne: "",
      lineTwo: "",
      city: "",
      zip: "",
      stateId: 0,
      latitude: 0,
      longitude: 0,
    },
  });

  useEffect(() => {
    if (location.state) {
      _logger("state found it", location);
      const {
        locationTypeId,
        lineOne,
        lineTwo,
        city,
        zip,
        stateId,
        latitude,
        longitude,
      } = location.state;

      setFormState((prevState) => ({
        ...prevState,
        formData: {
          locationTypeId: locationTypeId !== null ? locationTypeId : 0,
          lineOne: lineOne !== null ? lineOne : "",
          lineTwo: lineTwo !== null ? lineTwo : "",
          city: city !== null ? city : "",
          zip: zip !== null ? zip : "",
          stateId: stateId !== null ? stateId : 0,
          latitude: latitude !== null ? latitude : 0,
          longitude: longitude !== null ? longitude : 0,
        },
      }));
    }
  }, [location.state]);

  useEffect(() => {
    lookUpService
      .getTypes(["LocationTypes", "States"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);

  const onLookUpSuccess = (response) => {
    let typesArray = response.item.locationTypes;
    let statesArray = response.item.states;

    setFormState((prevState) => ({
      ...prevState,
      locationTypes: typesArray,
      locationTypesComponent: typesArray.map(mappingOptions),
      states: statesArray,
      statesComponent: statesArray.map(mappingOptions),
    }));
  };

  const onLookUpError = (error) => {
    _logger("onGetTypesError", error);
    toastr.error("Form Error", response);
  };

  const mappingOptions = (option) => {
    return (
      <React.Fragment key={option.id}>
        <option value={option.id}>{option.name}</option>
      </React.Fragment>
    );
  };

  const onAddLocationSuccess = (response) => {
    _logger("Your new location was successfully created", response);
    toastr.success("Your new location was successfully created", response);
    const locationId = response.data.item;

    _logger("loc ID:", locationId);

    organizationsServices
      .organizationLocationsInsert(locationId)
      .then(organizationLocationsInsertSuccess)
      .catch(organizationLocationsInsertError);
  };

  const onAddLocationError = (error) => {
    _logger(
      "There was an error when attempting to create your new location",
      error
    );
    toastr.error(
      "There was an error when attempting to create your new location",
      error
    );
  };

  const organizationLocationsInsertSuccess = (response) => {
    _logger(
      "We successfully saved a new location to your organization",
      response
    );
    toastr.success(
      "We successfully saved a new location to your organization",
      response
    );
  };

  const organizationLocationsInsertError = (error) => {
    toastr.error(
      "There was an error when trying to connect a new location with your organization",
      error
    );
  };

  const handleSubmit = (values) => {
    const dataForService = {
      ...values,
      userId: currentUser ? currentUser.id : null,
    };
    _logger(currentUser);
    locationServices
      .addLocation(dataForService)
      .then(onAddLocationSuccess)
      .catch(onAddLocationError);
  };

  const captureAutocompleteLocation = (
    lat,
    lng,
    address,
    city,
    zipCode,
    state
  ) => {
    const stateValue = formState.states.find(
      (stateDb) => stateDb.name === state
    );

    setFormState((prevState) => ({
      ...prevState,
      showMap: true,
      formData: {
        ...prevState.formData,
        latitude: lat !== null ? lat : 0,
        longitude: lng !== null ? lng : 0,
        lineOne: address !== null ? address : "",
        city: city !== null ? city : "",
        zip: zipCode !== null ? zipCode : "",
        stateId: stateValue !== null && stateValue ? stateValue.id : 0,
      },
    }));
  };

  return (
    <React.Fragment>
      <div className="container mt-3">
        <h1 className="text-center my-4">Add new Location</h1>
        <div className="row justify-content-center">
          {formState.showMap && (
            <div className="col-6">
              <MapContainer
                propLat={formState.formData.latitude}
                propLng={formState.formData.longitude}
                key={`${formState.formData.latitude}-${formState.formData.longitude}`}
              />
            </div>
          )}
          <div className="col-6">
            <Formik
              enableReinitialize={true}
              initialValues={formState.formData}
              onSubmit={handleSubmit}
              validationSchema={LocationFormSchema}
            >
              <Form>
                <div className="mb-3">
                  <label htmlFor="lineOne" className="form-label">
                    Line One
                  </label>
                  <AutocompleteField
                    captureAutocompleteLocation={captureAutocompleteLocation}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lineTwo" className="form-label">
                    Line Two
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="lineTwo"
                    name="lineTwo"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stateId" className="form-label">
                    State
                  </label>
                  <Field
                    as="select"
                    name="stateId"
                    id="stateId"
                    className="form-select"
                  >
                    <option value="0">--Please choose an option--</option>
                    {formState.statesComponent}
                  </Field>
                </div>
                <div className="mb-3">
                  <label htmlFor="locationTypeId" className="form-label">
                    Type Of Address:
                  </label>
                  <Field
                    as="select"
                    name="locationTypeId"
                    id="locationTypeId"
                    className="form-select"
                  >
                    <option value="0">--Please choose an option--</option>
                    {formState.locationTypesComponent}
                  </Field>
                </div>
                <button type="submit" className="btn btn-primary" id="submit">
                  Submit
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddLocationForm;

AddLocationForm.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

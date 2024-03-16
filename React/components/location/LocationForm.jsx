import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import locationServices from "../../services/locationService";
import * as lookUpService from "../../services/lookUpService";
import { useLocation } from "react-router-dom";
import toastr from "toastr";
import LocationFormSchema from "../../schemas/locationFormSchema";
import AutocompleteField from "../location/AutocompleteField";
import MapContainer from "./MapContainer";
import "toastr/build/toastr.css";

function LocationForm() {
  const _logger = debug.extend("autocomplete");
  const location = useLocation();
  const [locationId, setLocationId] = useState({
    id: 0,
  });
  const [locationTypes, setLocationTypes] = useState({
    locationTypes: [],
    locationTypesComponent: [],
  });
  const [states, setStates] = useState({
    states: [],
    statesComponent: [],
  });

  const [showMap, setShowMap] = useState(false);

  const [formData, setFormData] = useState({
    locationTypeId: 0,
    lineOne: "",
    lineTwo: "",
    city: "",
    zip: "",
    stateId: 0,
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (location.state) {
      _logger("state found it", location);
      setLocationId((prevState) => {
        let newState = { ...prevState };
        newState.id = location.state.id;
        return newState;
      });

      setFormData({
        locationTypeId: location.state.locationTypeId,
        lineOne: location.state.lineOne,
        lineTwo: location.state.lineTwo,
        city: location.state.city,
        zip: location.state.zip,
        stateId: location.state.stateId,
        latitude: location.state.latitude,
        longitude: location.state.longitude,
      });
    }

    lookUpService
      .getTypes(["LocationTypes", "States"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, [location.state]);

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

      newState.states = statesArray;
      newState.statesComponent = statesArray.map(mappingOptions);

      return newState;
    });
  };

  const onLookUpError = (error) => {
    _logger("onGetTypesError", error);
  };

  const mappingOptions = (option) => {
    return (
      <React.Fragment key={option.id}>
        <option value={option.id}>{option.name}</option>
      </React.Fragment>
    );
  };

  const onAddLocationSuccess = (response) => {
    _logger("Your new location was succcesfullly created", response);
    toastr.success("Your new location was succcesfullly created", response);

    const newLocationId = response.data.item;

    setLocationId((prevState) => {
      let newState = { ...prevState };
      newState.id = newLocationId;
      return newState;
    });
  };

  const onAddLocationError = (error) => {
    toastr.error("There was an error trying to create a new location", error);
  };

  const handleSubmit = (values) => {
    let dataForService = { ...values };

    if (locationId.id !== 0) {
      dataForService.id = locationId.id;

      locationServices
        .updateLocation(dataForService)
        .then(onUpdateLocationSuccess)
        .catch(onUpdateLocationError);
    } else {
      locationServices
        .addLocation(dataForService)
        .then(onAddLocationSuccess)
        .catch(onAddLocationError);
    }
  };

  const onUpdateLocationSuccess = (response) => {
    _logger("onUpdateLocationSuccess", response);
    toastr.success("Your new location was succcesfullly updated", response);
  };

  const onUpdateLocationError = (error) => {
    _logger("onUpdateFriendError", error);
    toastr.error("There was an error trying to update a new location", error);
  };

  const captureAutocompleteLocation = (
    lat,
    lng,
    address,
    city,
    zipCode,
    state
  ) => {
    const stateValue = states.states.find((stateDb) => stateDb.name === state);

    setShowMap(true);

    setFormData((prevState) => {
      let nS = { ...prevState };

      nS.latitude = lat;
      nS.longitude = lng;
      nS.lineOne = address;
      nS.city = city;
      nS.zip = zipCode;
      nS.stateId = stateValue.id;

      return nS;
    });
  };

  const resetForm = () => {
    setLocationId((prevState) => {
      let newState = { ...prevState };
      newState.id = 0;
      return newState;
    });

    setShowMap(false);

    setFormData(() => {
      let newState = {
        locationTypeId: 0,
        lineOne: "",
        lineTwo: "",
        city: "",
        zip: "",
        stateId: 0,
        latitude: 0,
        longitude: 0,
      };

      return newState;
    });
    _logger("reseting form");
  };

  return (
    <React.Fragment>
      <div className="container mt-3">
        <h1 className="text-center my-4">
          {locationId.id > 0 ? "Update" : "Add new"} Location
        </h1>
        <div className="row justify-content-center">
          {showMap && (
            <div className="col-6">
              <MapContainer
                propLat={formData.latitude}
                propLng={formData.longitude}
                key={`${formData.latitude}-${formData.longitude}`}
              />
            </div>
          )}
          <div className="col-6">
            <Formik
              enableReinitialize={true}
              initialValues={formData}
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
                    aria-describedby="lineTwo"
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
                    aria-describedby="city"
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
                    aria-describedby="zip"
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
                    {states.statesComponent}
                  </Field>
                </div>
                <div className="mb-3">
                  <label htmlFor="LocationTypeId" className="form-label">
                    Type Of Address:
                  </label>
                  <Field
                    as="select"
                    name="locationTypeId"
                    id="locationTypeId"
                    className="form-select"
                  >
                    <option value="0">--Please choose an option--</option>
                    {locationTypes.locationTypesComponent}
                  </Field>
                </div>
                <button
                  type="submit"
                  className={
                    locationId.id > 0 ? "btn btn-secondary" : "btn btn-primary"
                  }
                  id="submit"
                >
                  {locationId.id > 0 ? "Update current location" : "Submit"}
                </button>
                {locationId.id > 0 ? (
                  <button
                    type="button"
                    className={"mx-2 btn btn-info"}
                    id="reset"
                    onClick={resetForm}
                  >
                    Add a new location
                  </button>
                ) : (
                  <></>
                )}
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LocationForm;

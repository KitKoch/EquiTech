import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as lookUpService from "../../services/lookUpService";
import { useLocation, useNavigate } from "react-router-dom";
import toastr from "toastr";
import AutocompleteField from "../location/AutocompleteField";
import MapContainer from "../location/MapContainer";
import "toastr/build/toastr.css";
import candidateLocationServices from "../../services/candidateLocationsService";
import candidateLocationFormSchema from "../../schemas/candidateLocationsSchema";
import { LoadScript } from "@react-google-maps/api";

function CandidateLocationsForm() {
  const _logger = debug.extend("autocomplete");
  const location = useLocation();
  const navigate = useNavigate();

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
  const [order, setOrder] = useState({
    orderNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    orderComponent: [],
  });

  const [showMap, setShowMap] = useState(false);
  const [showUpdateMap, setShowUpdateMap] = useState(false);
  const [formData, setFormData] = useState({
    locationTypeId: 0,
    lineOne: "",
    lineTwo: "",
    city: "",
    zip: "",
    stateId: 0,
    latitude: 0,
    longitude: 0,
    preferenceId: 8,
    sortOrder: 0,
    isNegotiable: false,
  });

  useEffect(() => {
    _logger("state found it", location);
    if (location.state) {
      const locationData = location.state.payload.location;
      const candidateData = location.state.payload;
      setLocationId((prevState) => {
        let newState = { ...prevState };
        newState.id = locationData.id;
        return newState;
      });
      setFormData({
        locationTypeId: locationData.locationType.id,
        lineOne: locationData.lineOne,
        lineTwo: locationData.lineTwo,
        city: locationData.city,
        zip: locationData.zip,
        stateId: locationData.state.id,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        preferenceId: candidateData.preferenceId,
        sortOrder: candidateData.sortOrder,
        isNegotiable: candidateData.isNegotiable,
      });
      setShowUpdateMap(true);
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
      newState.locationTypesComponent = typesArray.map(mapOptions);

      return newState;
    });

    setOrder((prevState) => {
      let newState = { ...prevState };
      newState.orderComponent = newState.orderNumbers.map(mapOrder);
      return newState;
    });

    setStates((prevState) => {
      let newState = { ...prevState };

      newState.states = statesArray;
      newState.statesComponent = statesArray.map(mapOptions);

      return newState;
    });
  };

  const onLookUpError = (error) => {
    _logger("onGetTypesError", error);
    toastr("The types were not found", error);
  };

  const mapOrder = (number) => {
    return (
      <React.Fragment key={number}>
        <option value={number}>{number}</option>
      </React.Fragment>
    );
  };

  const mapOptions = (option) => {
    return (
      <React.Fragment key={option.id}>
        <option value={option.id}>{option.name}</option>
      </React.Fragment>
    );
  };

  const handleSubmit = (values) => {
    let dataForService = { ...values };

    if (locationId.id !== 0) {
      dataForService.id = locationId.id;

      candidateLocationServices
        .updateCandidateLocationForm(dataForService)
        .then(onUpdateCandidateLocationSuccess)
        .catch(onUpdateCandidateLocationError);
    } else {
      candidateLocationServices
        .addCandidateLocationForm(dataForService)
        .then(onAddCandidateLocationSuccess)
        .catch(onAddCandidateLocationError);
    }
  };
  const onUpdateCandidateLocationSuccess = (response) => {
    _logger("onUpdateSuccess", response);
    toastr.success(
      "Candidate, your location was succcesfullly updated",
      response
    );
    navigate("../candidate/locations");
  };

  const onUpdateCandidateLocationError = (error) => {
    _logger("onUpdateError", error);
    toastr.error(
      "There was an error trying to update a new location for the candidate",
      error
    );
  };
  const onAddCandidateLocationSuccess = (response) => {
    _logger(
      "Candidate, Your new  location was succcesfullly created",
      response
    );
    toastr.success(
      "Candidate, Your new location was succcesfullly created",
      response
    );
    navigate("../candidate/locations");
  };

  const onAddCandidateLocationError = (error) => {
    toastr.error(
      "There was an error trying to create a new location for this candidate",
      error
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
    const stateValue = states.states.find((stateDb) => stateDb.name === state);

    setShowMap(true);
    setShowUpdateMap(false);

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
        preferenceId: 8,
        sortOrder: 0,
        isNegotiable: false,
      };

      return newState;
    });
    _logger("reseting form");
  };
  const libraries = ["places"];
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  return (
    <React.Fragment>
      <div className="container mt-3">
        <h1 className="text-center my-1">
          {" "}
          {locationId.id > 0 ? "Update" : "Add new"} Location
        </h1>
        <div className="row justify-content-center">
          <LoadScript
            googleMapsApiKey={GOOGLE_API_KEY}
            libraries={libraries}
            region="us"
          >
            {showUpdateMap && (
              <div className="col-6">
                <div className="img-thumbnail rounded me-4 mb-6">
                  <MapContainer
                    propLat={formData.latitude}
                    propLng={formData.longitude}
                    key={`${formData.latitude}-${formData.longitude}`}
                  />
                </div>
              </div>
            )}
          </LoadScript>
          {showMap && (
            <div className="col-6">
              <div className="img-thumbnail rounded me-4 mb-6">
                <MapContainer
                  propLat={formData.latitude}
                  propLng={formData.longitude}
                  key={`${formData.latitude}-${formData.longitude}`}
                />
              </div>
            </div>
          )}
          <div className="col-6">
            <Formik
              enableReinitialize={true}
              initialValues={formData}
              onSubmit={handleSubmit}
              validationSchema={candidateLocationFormSchema}
            >
              {({ values }) => (
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
                      placeholder="Apartment, studio or floor"
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
                  <div className="mb-3">
                    <label htmlFor="sortOrder" className="form-label">
                      Sort Order: 1 being the highest preference
                    </label>
                    <Field
                      as="select"
                      name="sortOrder"
                      id="sortOrder"
                      className="form-select"
                    >
                      <option value="0">--Please choose a number--</option>
                      {order.orderComponent}
                    </Field>
                    <ErrorMessage
                      name="sortOrder"
                      component="div"
                      className="haserror"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="isNegotiable"
                      className="form-check-label input"
                    >
                      Is Negotiable?
                    </label>
                    <div>
                      {values.isNegotiable}
                      <Field
                        id="isNegotiable"
                        type="checkbox"
                        className="form-check-input checkboxsize"
                        name="isNegotiable"
                      />
                    </div>
                    <ErrorMessage
                      name="isNegotiable"
                      component="div"
                      className="haserror"
                    />
                  </div>
                  <button
                    type="submit"
                    className={
                      locationId.id > 0
                        ? "btn btn-secondary"
                        : "btn btn-primary"
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
                      Reset fields
                    </button>
                  ) : (
                    <></>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CandidateLocationsForm;

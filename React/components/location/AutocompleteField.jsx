import React, { useState } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { Field } from "formik";
import PropTypes from "prop-types";
import MapContainer from "./MapContainer";

function AutocompleteField(props) {
  const _logger = debug.extend("autocomplete");
  const [autoCompleteState, setAutoCompleteState] = useState(null);
  const mainCaptureLocation = props.captureAutocompleteLocation;
  const [formData] = useState({
    lineOne: "",
  });
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });
  const libraries = ["places"];

  false && _logger();

  const localHandleOnLoad = (autocomplete) => {
    setAutoCompleteState(() => {
      let newState = autocomplete;
      return newState;
    });
  };

  const localHandlePlaceChanged = () => {
    const place = autoCompleteState.getPlace();
    const address = place.formatted_address;

    const placeCoords = place.geometry.location;
    const lat = placeCoords.lat();
    const lng = placeCoords.lng();

    const addressComponents = place.address_components;
    let city = "";
    let zipCode = "";
    let state = "";

    for (let i = 0; i < addressComponents.length; i++) {
      const component = addressComponents[i];
      const componentTypes = component.types;

      if (componentTypes.includes("locality")) {
        city = component.long_name;
      }

      if (componentTypes.includes("administrative_area_level_1")) {
        state = component.short_name;
      }

      if (componentTypes.includes("postal_code")) {
        zipCode = component.long_name;
      }

      if (city !== "" && zipCode !== "" && state !== 0) {
        break;
      }
    }

    setCoords((prevState) => {
      let nS = { ...prevState };

      nS.lat = lat;
      nS.lng = lng;

      return nS;
    });
    mainCaptureLocation(lat, lng, address, city, zipCode, state);
  };

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  return (
    <React.Fragment>
      <LoadScript
        googleMapsApiKey={GOOGLE_API_KEY}
        libraries={libraries}
        region="us"
      >
        <Autocomplete
          onLoad={localHandleOnLoad}
          onPlaceChanged={localHandlePlaceChanged}
          value={formData.lineOne}
          options={{
            componentRestrictions: { country: "us" },
          }}
        >
          <Field
            className="form-control"
            type="text"
            placeholder="Enter location"
            id="lineOne"
            name="lineOne"
          />
        </Autocomplete>
        {false && (
          <MapContainer
            propLat={coords.lat}
            propLng={coords.lng}
            key={`${coords.lat}-${coords.lng}`}
          />
        )}
      </LoadScript>
    </React.Fragment>
  );
}

AutocompleteField.propTypes = {
  captureAutocompleteLocation: PropTypes.func,
};

export default AutocompleteField;

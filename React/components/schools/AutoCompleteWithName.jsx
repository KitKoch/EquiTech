import React, { useState } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { Field } from "formik";
import PropTypes from "prop-types";
import MapContainer from "../location/MapContainer";
const libraries = ["places"];

function AutocompleteWithName(props) {
  const _logger = debug.extend("schoolsautocomplete");
  const [autoCompleteState, setAutoCompleteState] = useState(null);
  const mainCaptureLocation = props.captureAutocompleteLocation;
  const [formData] = useState({
    name: "",
  });
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });

  const localHandleOnLoad = (autocomplete) => {
    setAutoCompleteState(() => {
      let newState = autocomplete;
      _logger(newState);
      return newState;
    });
  };

  const localHandlePlaceChanged = () => {
    const place = autoCompleteState.getPlace();
    const address = place.formatted_address;
    const name = place.name;
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
    mainCaptureLocation(name, lat, lng, address, city, zipCode, state);
  };

  return (
    <React.Fragment>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        libraries={libraries}
        region="us"
      >
        <Autocomplete
          onLoad={localHandleOnLoad}
          onPlaceChanged={localHandlePlaceChanged}
          value={formData.name}
          options={{
            componentRestrictions: { country: "us" },
          }}
        >
          <Field
            className="form-control"
            type="text"
            placeholder="Enter school name"
            id="name"
            name="name"
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

AutocompleteWithName.propTypes = {
  captureAutocompleteLocation: PropTypes.func,
};

export default AutocompleteWithName;

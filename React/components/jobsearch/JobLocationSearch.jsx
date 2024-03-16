import React, { useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const _logger = debug.extend("joblocation");

const LIBRARIES = ["places"];

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

function JobsLocationSearch(props) {
  const [locationData, setLocationData] = useState(null);

  const handleLocationInput = (locref) => {
    setLocationData(() => {
      const locSearchObj = locref;
      return locSearchObj;
    });
  };

  const onPlaceChanged = () => {
    const place = locationData.getPlace();

    const locCoords = place.geometry.location;
    const lat = locCoords.lat();
    const lng = locCoords.lng();
    _logger(place);

    props.setJobsPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.lat = lat;
      pageData.long = lng;

      return pageData;
    });
  };

  _logger(props);

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_API_KEY}
      libraries={LIBRARIES}
      region="us"
    >
      <Autocomplete
        onLoad={handleLocationInput}
        onPlaceChanged={onPlaceChanged}
        options={{
          componentRestrictions: { country: "us" },
        }}
      >
        <Form.Control
          ref={props.inputValue}
          type="text"
          name="queryByLocation"
          placeholder="Location"
          className="form-control rounded"
          size="lg"
        />
      </Autocomplete>
    </LoadScript>
  );
}

JobsLocationSearch.propTypes = {
  setJobsPageData: PropTypes.func.isRequired,
  inputValue: PropTypes.shape({
    current: PropTypes.shape({
      value: PropTypes.string,
    }),
  }),
};
export default JobsLocationSearch;

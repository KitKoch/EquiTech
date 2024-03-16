import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { XSquare } from "react-feather";

const _logger = debug.extend("map");

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
function JobDetailMap(props) {
  _logger("props", props);
  const { propLat, propLng, onClickDisableMap } = props;
  const [mapInfo, setMapInfo] = useState({
    center: { lat: propLat, lng: propLng },
    containerStyle: { width: "100%", height: "380px" },
  });

  useEffect(() => {
    setMapInfo((prevState) => {
      let newState = { ...prevState };

      newState.center.lat = propLat;
      newState.center.lng = propLng;

      return newState;
    });
  }, [propLat, propLng]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="my-3">
          <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
            <span
              className="float-end job-detail-pointer"
              onClick={onClickDisableMap}
            >
              Close Map <XSquare></XSquare>
            </span>
            <GoogleMap
              mapContainerStyle={mapInfo.containerStyle}
              center={mapInfo.center}
              zoom={15}
            >
              <Marker position={mapInfo.center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </React.Fragment>
  );
}

JobDetailMap.propTypes = {
  propLat: PropTypes.number,
  propLng: PropTypes.number,
  onClickDisableMap: PropTypes.func,
};

export default JobDetailMap;

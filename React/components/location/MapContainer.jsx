import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";

function MapContainer(props) {
  const _logger = debug.extend("map");
  _logger("props", props);
  const { propLat, propLng } = props;
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

  if (!propLat || !propLng) {
    return <div></div>;
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="card my-3">
          <GoogleMap
            mapContainerStyle={mapInfo.containerStyle}
            center={mapInfo.center}
            zoom={15}
          >
            <Marker position={mapInfo.center} />
          </GoogleMap>
        </div>
      </div>
    </React.Fragment>
  );
}

MapContainer.propTypes = {
  propLat: PropTypes.number,
  propLng: PropTypes.number,
};

export default MapContainer;

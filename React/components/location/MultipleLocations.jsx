import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import locationServices from "../../services/locationService";
import "./LocationStyles.css";

function MultipleLocation() {
  const _logger = debug.extend("MultipleLocation");
  const [mapInfo] = useState({
    center: { lat: 0, lng: 0 },
    containerStyle: { width: "100%", height: "600px" },
  });
  const [markers, setMarkers] = useState({
    markers: [],
    markersComponents: [],
  });

  const [autoCompleteState, setAutoCompleteState] = useState(null);

  useEffect(() => {
    locationServices
      .getAllPaginated(0, 5)
      .then(onLocationGetAllSuccess)
      .catch(onLocationGetAllError);
  }, []);

  const onLocationGetAllError = (error) => {
    _logger("onEventsFeedError", error);
  };

  const onLocationGetAllSuccess = (response) => {
    _logger("onEventsFeedSuccess", response);
    let arrOfEvents = response.data.item.pagedItems;
    let eventsCoordenates = arrOfEvents.map(getLocationMarkers);

    setMarkers((prevState) => {
      let newMarkers = { ...prevState };
      newMarkers.markers = arrOfEvents;
      newMarkers.markersComponents = eventsCoordenates.map(mapCoordenates);

      return newMarkers;
    });
  };

  const mapCoordenates = (objectWithCoords) => {
    const coords = { lat: objectWithCoords.lat, lng: objectWithCoords.lng };
    const locationId = objectWithCoords.id;

    return <Marker position={coords} key={locationId} />;
  };

  const getLocationMarkers = (event) => {
    let eventLatitude = event.latitude;
    let eventLongitude = event.longitude;
    let eventId = event.id;

    return { lat: eventLatitude, lng: eventLongitude, id: eventId };
  };

  const handleOnLoad = (autocomplete) => {
    _logger("handleOnLoad", autocomplete);

    setAutoCompleteState(() => {
      let newState = autocomplete;
      return newState;
    });
  };

  const handlePlaceChanged = () => {
    const place = autoCompleteState.getPlace();
    _logger("autoComplete place", place);

    const placeCoords = place.geometry.location;
    const lat = placeCoords.lat();
    const lng = placeCoords.lng();

    const coords = { lat: lat, lng: lng };

    _logger("place lat and lng", coords);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="card">
          <LoadScript
            googleMapsApiKey="ENTER YOUR GOOGLE KEY"
            libraries={["places"]}
          >
            <GoogleMap
              mapContainerStyle={mapInfo.containerStyle}
              center={mapInfo.center}
              zoom={2}
            >
              <div>{markers.markersComponents}</div>
              <div>
                <Autocomplete
                  onLoad={handleOnLoad}
                  onPlaceChanged={handlePlaceChanged}
                >
                  <input
                    type="text"
                    placeholder="Enter Address"
                    id="searchBar"
                    name="searchBar"
                    className={"searchBar"}
                  />
                </Autocomplete>
              </div>
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MultipleLocation;

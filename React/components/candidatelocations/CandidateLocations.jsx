import React, { useState, useEffect } from "react";
import candidateLocationServices from "../../services/candidateLocationsService";
import CandidateLocationsCard from "./CandidateLocationsCard";
import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CandidateLocations({ currentUser }) {
  const navigate = useNavigate();
  const _logger = debug.extend("candidate/locations");

  const [pageData, setPageData] = useState({
    locations: [],
    locationsComponents: [],
  });

  useEffect(() => {
    candidateLocationServices
      .GetLocationsByUserId(currentUser.id)
      .then(onGetLocationsByUserIdSuccess)
      .catch(onGetLocationsByUserIdError);
  }, []);
  const handleAddClick = () => {
    navigate("./form");
  };
  function mapCandidateLocation(aCandidateLocation) {
    return (
      <CandidateLocationsCard
        candidatelocation={aCandidateLocation}
        key={
          "listLocations" +
          aCandidateLocation.user.id +
          aCandidateLocation.location.id
        }
        localEditClick={onClickEdit}
      ></CandidateLocationsCard>
    );
  }
  function onGetLocationsByUserIdSuccess(response) {
    _logger("Firing");
    let arrayOfCandidateLocationsResp = response.item;
    setPageData((...prevState) => {
      let pd = { ...prevState };
      pd.locations = arrayOfCandidateLocationsResp;
      pd.locationsComponents = pd.locations.map(mapCandidateLocation);
      return pd;
    });
  }
  function onGetLocationsByUserIdError(error) {
    _logger("onGetLocationsError", error);
  }
  function onClickEdit(aCandidateLocation) {
    let state = {
      type: "Location_EDIT",
      payload: aCandidateLocation,
    };
    let locId = aCandidateLocation.location.id;
    navigate(`./${locId}/edit`, { state });
  }

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="../../dashboards/candidate">Candidate Dashboard</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            View Locations
          </li>
        </ol>
      </nav>
      <div className="container">
        <Col>
          <h1>Your Locations</h1>
        </Col>
        <Col xs="1" className="text-right candidate mx-flex">
          <Button
            variant="secondary"
            className="add-button text-nowrap"
            onClick={handleAddClick}
          >
            Add New Location
          </Button>
        </Col>
      </div>
      <div className="container">
        <div className="col-md-6">
          <div className="row"> {pageData.locationsComponents}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

CandidateLocations.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default CandidateLocations;

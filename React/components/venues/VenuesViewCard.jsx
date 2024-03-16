import React from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Trash } from "react-feather";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "./venue.css";

const _logger = logger.extend("VenueCard");
function VenuesViewCard({ venue, deleteVenue }) {
  const navigate = useNavigate();
  const onSelectVenue = () => {
    _logger("venue to be edited", venue);
    const payload = { state: { type: "VENUE_EDIT", payload: venue } };
    navigate(`/venues/${venue.id}/edit`, payload);
  };

  const onSelectDelete = () => {
    _logger("venue to be deleted", venue);
    deleteVenue(venue.id);
  };

  const location = `${venue.location.lineOne}, ${venue.location.lineTwo}, ${venue.location.city}
  , ${venue.state.name} ${venue.location.zip}`;

  return (
    <tr>
      <td className="text-left">
        {venue.name.length < 15 ? venue.name : `${venue.name.slice(0, 15)}...`}
      </td>
      <td className="text-center">
        {venue.description.length < 20
          ? venue.description
          : `${venue.description.slice(0, 20)}...`}
      </td>
      <td className="text-center">{`${location.slice(0, 25)}...`}</td>
      <td className="text-center">{venue.createdBy.firstName}</td>
      <td className="text-center">{venue.modifiedBy.firstName}</td>
      <td className="table-action text-center">
        <Button className="venue-circle-button">
          <Edit2
            className={`align-middle me-1 text-dark`}
            size={18}
            onClick={onSelectVenue}
          />
        </Button>
        <Button className="venue-circle-button">
          <Trash
            className="align-middle text-dark"
            size={18}
            onClick={onSelectDelete}
          />
        </Button>
      </td>
    </tr>
  );
}

VenuesViewCard.propTypes = {
  deleteVenue: PropTypes.func.isRequired,
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lineOne: PropTypes.string.isRequired,
      lineTwo: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }),
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    createdBy: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
    }),
    modifiedBy: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default VenuesViewCard;

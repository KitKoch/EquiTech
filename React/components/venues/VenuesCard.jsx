import React from "react";
import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "./venue.css";

function VenueCard(props) {
  const aVenue = props.venueCard;

  return (
    <Col md={4} lg={4}>
      <Card className="venue-card">
        <Card.Header>
          <Card.Title className="mb-0 text-primary d-flex school-header">
            <Col lg={10} className="flex-end pt-4">
              {aVenue.name}
            </Col>
          </Card.Title>
          <Card.Img className="venue-img" src={aVenue.url} alt="Venue image" />
        </Card.Header>
        <Card.Body>
          <Card.Text className="fst-italic">
            Description: {aVenue.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
VenueCard.propTypes = {
  venueCard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default VenueCard;

import React from "react";
import { Card, Container, Row, Button, Col } from "react-bootstrap";
import propTypes from "prop-types";

function CandidateLocationsCard(props) {
  const aCandidateLocation = props.candidatelocation; 
  const handleEditClick = () => {
    props.localEditClick(aCandidateLocation);
  };

  const className = `card-main border ${
    Number(aCandidateLocation.sortOrder) === 1 ? "border-success" : ""
  }`;
  return (
    <div className="outer-container p-1">
      <div className={className}>
        <div className="location-card-header-info-container">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <Col>
                <Button
                  variant="primary"
                  className="edit-button"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </Col>
              <Col xl="4" className="text-center candidate mx-auto">
                <div className="container ">
                  <h5>
                    {aCandidateLocation.isNegotiable === true
                      ? " Is Negotiable"
                      : " "}
                  </h5>
                </div>
              </Col>
            </Card.Header>
            <Card.Body>
              <Container>
                <Row className="d-flex">
                  <div className="location-settings-form">
                    <div className="location-info">
                      <span>
                        {" "}
                        Address: {aCandidateLocation.location.lineOne}
                      </span>{" "}
                      <span>{aCandidateLocation.location.lineTwo}</span>{" "}
                      <div>
                        <span>
                          State: {aCandidateLocation.location.state.name}
                        </span>{" "}
                      </div>
                      <div>
                        <span>City: {aCandidateLocation.location.city}</span>{" "}
                      </div>
                      <div>
                        <span>
                          Location Type:{" "}
                          {aCandidateLocation.location.locationType.name}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
CandidateLocationsCard.propTypes = {
  candidatelocation: propTypes.shape({
    location: propTypes.shape({
      lineOne: propTypes.string.isRequired,
      lineTwo: propTypes.string,
      state: propTypes.shape({
        name: propTypes.string.isRequired,
      }),
      city: propTypes.string.isRequired,
      locationType: propTypes.shape({
        name: propTypes.string,
      }).isRequired,
    }).isRequired,
    user: propTypes.shape({
      firstName: propTypes.string.isRequired,
      lastName: propTypes.string.isRequired,
      avatarUrl: propTypes.string,
    }),
    sortOrder: propTypes.number.isRequired,
    isNegotiable: propTypes.bool.isRequired,
  }),
  localEditClick: propTypes.func.isRequired,
};
export default CandidateLocationsCard;

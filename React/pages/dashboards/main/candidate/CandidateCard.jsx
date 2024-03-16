import React from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import blankAvatar from "../../../../assets/img/avatars/blank-avatar.jpg";

function CandidateCard(props) {
  const navigate = useNavigate();

  const onError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = blankAvatar;
  };

  const handleEditClick = () => {
    navigate("/dashboard/settings");
  };

  return (
    <div className="profile-outer-container">
      <div className="card-main">
        <div className="profile-user-info-parent-container">
          <div className="profile-card-header-user-info-container">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">Profile Info</Card.Title>
                <Button
                  variant="primary"
                  className="edit-button"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              </Card.Header>
              <Card.Body>
                <Container>
                  <Row className="d-flex">
                    <Col md="7">
                      <div className="user-settings-form">
                        <div className="name-info">
                          <span>{props.userData.firstName}</span>{" "}
                          <span>{props.userData.lastName}</span>
                        </div>
                      </div>
                      <div className="user-settings-form">
                        <div>{props.userData.email}</div>
                      </div>
                    </Col>
                    <Col xl="4" className="text-center candidate mx-auto">
                      <img
                        alt="Avatar"
                        src={props.userData.avatarUrl || blankAvatar}
                        className="rounded-circle mb-3 profile-image img-fluid"
                        onError={onError}
                      />
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

CandidateCard.propTypes = {
  userData: propTypes.shape({
    avatarUrl: propTypes.string,
    email: propTypes.string.isRequired,
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string.isRequired,
  }).isRequired,
};

export default CandidateCard;

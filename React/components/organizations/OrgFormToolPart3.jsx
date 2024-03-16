import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import MapContainer from "../location/MapContainer";
import Swal from "sweetalert2";
import "./OrganizationStyles.css";

const _loggerPage = logger.extend("ORG");

function OrgFormToolPart3(props) {
  const { isSubmitting, cantBack, nextLabel, backLabel } = props;
  _loggerPage(props.orgLoc);

  const orgLoc = props.orgLoc;

  function onPage3Submit() {
    Swal.fire({
      title: "Submit New Organization?",

      showCancelButton: true,
      confirmButtonText: "Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        props.onFinalSubmit();
      }
    });
  }

  function handleBack() {
    _loggerPage("CLICKED BACK");
    props.onBack(orgLoc);
  }

  return (
    <React.Fragment>
      <Row>
        <Col sm={10}>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Img
                    className="org-form-tool-3-image-size ms-2 mt-2"
                    src={orgLoc.logo}
                    alt="Card image cap"
                  />
                </Col>
                <Col>
                  <Card.Title className="mb-4 mt-3">{orgLoc.name}</Card.Title>
                  <strong>Headline</strong>
                  <p>{orgLoc.headline}</p>
                  <strong>Description</strong>
                  <p>{orgLoc.description}</p>
                  <strong>Organization Type</strong>
                  <p>{orgLoc.organizationTypeName}</p>
                  <strong>Phone</strong>
                  <p>{orgLoc.phone}</p>
                  <strong>Site Url</strong>
                  <p>{orgLoc.siteUrl}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div>
                    <MapContainer
                      propLat={orgLoc.latitude}
                      propLng={orgLoc.longitude}
                      key={`${orgLoc.latitude}-${orgLoc.longitude}`}
                    ></MapContainer>
                  </div>
                </Col>
                <Col>
                  <Card.Title className="mt-5 mb-4">Location</Card.Title>
                  <p>{orgLoc.lineOne}</p>
                  <p>{orgLoc.lineTwo}</p>
                  <p>
                    {orgLoc.city}, {orgLoc.stateName}
                  </p>
                  <p>{orgLoc.zip}</p>
                  <strong>Location Type</strong>
                  <p>{orgLoc.locationTypeName}</p>
                </Col>
              </Row>
              <Row className="mb-3 mt-4">
                <Col sm={5}>
                  <button
                    disabled={isSubmitting || cantBack}
                    onClick={handleBack}
                    className="btn btn-secondary"
                  >
                    {backLabel}
                  </button>
                </Col>
                <Col>
                  <Row className="text-end">
                    <Col>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary"
                        onClick={onPage3Submit}
                      >
                        {nextLabel}
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

OrgFormToolPart3.propTypes = {
  orgLoc: PropTypes.shape({
    lineOne: PropTypes.string,
    lineTwo: PropTypes.string,
    city: PropTypes.string,
    stateName: PropTypes.string,
    zip: PropTypes.string,
    locationTypeName: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    name: PropTypes.string,
    logo: PropTypes.string,
    siteUrl: PropTypes.string,
    description: PropTypes.string,
    headline: PropTypes.string,
    phone: PropTypes.string,
    organizationTypeName: PropTypes.string,
  }),
  onFinalSubmit: PropTypes.func,
  onBack: PropTypes.func.isRequired,
  isSubmitting: PropTypes.func.isRequired,
  cantBack: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,
  backLabel: PropTypes.string.isRequired,
};

export default OrgFormToolPart3;

import React from "react";
import { Badge, Card, Dropdown, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { MoreHorizontal } from "react-feather";

function SurveyCard({ info, option, option2, onDelete }) {
  function onChange() {
    option(info);
  }
  function onTitle() {
    option2(info);
  }

  const deleteSurvey = () => {
    onDelete(info);
  };
  const badgeUpdate = (color) => {
    if (color === "Active") {
      return "success";
    } else if (color === "Inactive") {
      return "danger";
    } else if (color === "Pending") {
      return "warning";
    } else if (color === "Canceled") {
      return "secondary";
    }
  };
  return (
    <Col md="6" lg="3">
      <Card>
        <Card.Header className="px-4 pt-4">
          <div className="card-actions float-end">
            <Dropdown align="end">
              <Dropdown.Toggle as="a" bsPrefix="-">
                <MoreHorizontal />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={onChange}>Change Status</Dropdown.Item>
                <Dropdown.Item onClick={onTitle}>Edit Title</Dropdown.Item>
                {info?.surveyStatus?.name === "Active" ? (
                  <Dropdown.Item disabled={true}>Delete Survey</Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={deleteSurvey}>
                    Delete Survey
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card.Title className="mb-0">{info?.name}</Card.Title>
          <Badge className="my-2" bg={badgeUpdate(info?.surveyStatus?.name)}>
            {info?.surveyStatus?.name}
          </Badge>
        </Card.Header>
        <Card.Body className="px-4 pt-2">
          <p>{info?.description}</p>
        </Card.Body>
      </Card>
    </Col>
  );
}
SurveyCard.propTypes = {
  option: PropTypes.func,
  option2: PropTypes.func,
  onDelete: PropTypes.func,
  info: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    surveyStatus: PropTypes.shape({ name: PropTypes.string }),
  }),
};

export default SurveyCard;

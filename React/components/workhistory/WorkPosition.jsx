import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export default function WorkPosition(props) {
  _logger("WorkPosition", props);
  const [pageData] = useState({
    element: props.wp,
  });

  const editWP = (e) => {
    e.preventDefault();
    props.setGrandGrandParentState((prevState) => {
      const newState = { ...prevState };
      newState.workPositionId = props.wp.id;
      newState.name = props.wp.name;
      newState.description = props.wp.description;
      newState.workHistoryId = props.wp.workHistoryId;
      newState.wageTypeId = props.wp.wageType.id;
      newState.jobTypeId = props.wp.jobType.id;
      newState.showId = 3;
      newState.button1 = "Display Work History";
      return newState;
    });
  };

  return (
    <Card bg="light">
      <Card.Body>
        <Card.Title>{pageData.element?.name}</Card.Title>
        <Card.Subtitle>{pageData.element?.description}</Card.Subtitle>
        <Card.Text>
          {pageData.element?.jobType.name}
          {" ("}
          {pageData.element?.wageType.name}
          {")"}
        </Card.Text>
        <Button onClick={editWP}>Edit</Button>
      </Card.Body>
    </Card>
  );
}

WorkPosition.propTypes = {
  wp: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    workHistoryId: PropTypes.number.isRequired,
    wageType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    jobType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
  }),
  setGrandGrandParentState: PropTypes.func,
};

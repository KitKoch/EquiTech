import React from "react";
import PropTypes from "prop-types";
import { Card, Dropdown } from "react-bootstrap";
import { MoreHorizontal } from "react-feather";

function RelatedPersonalValuesCard({ personalValue, onDelete }) {
  const personalValueNameA = personalValue?.personalValueA?.name;
  const personalValueNameB = personalValue?.personalValueB?.name;

  const handleDeleteValues = () => {
    onDelete(personalValue);
  };

  return (
    <React.Fragment>
      <Card className="mb-3 bg-light border">
        <Card.Header className="px-4 pt-4">
          <div className="card-actions float-end">
            <Dropdown align="end">
              <Dropdown.Toggle as="a" bsPrefix="-">
                <MoreHorizontal />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleDeleteValues}>
                  Delete Values
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Card.Title className="mb-0">Personal Values Pairing</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text>{personalValueNameA}</Card.Text>
          <Card.Text>{personalValueNameB}</Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

RelatedPersonalValuesCard.propTypes = {
  personalValue: PropTypes.shape({
    personalValueA: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
    }),
    personalValueB: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
    }),
  }),
  onDelete: PropTypes.func,
};

export default RelatedPersonalValuesCard;

import React from "react";
import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";

function ForumsCard(props) {
  const layout = props.forumById;

  return (
    <>
      <tbody className="card-subtitle text-muted striped hover">
        <tr>
          <Nav.Link href={`/forums/${layout.id}`}>
            <td>{layout.name}</td>
          </Nav.Link>
        </tr>
      </tbody>
    </>
  );
}

ForumsCard.propTypes = {
  forumById: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default ForumsCard;

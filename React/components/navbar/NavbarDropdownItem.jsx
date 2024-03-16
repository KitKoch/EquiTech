import React from "react";
import PropTypes from "prop-types";

import { Row, Col, ListGroup } from "react-bootstrap";

const NavbarDropdownItem = ({ icon, title, description, time, hasSpacing }) => (
  <ListGroup.Item>
    <Row className="align-items-center g-0">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className={hasSpacing ? "pl-2" : null}>
        <div className="text-dark">{title}</div>
        <div className="text-muted small mt-1">{description}</div>
        <div className="text-muted small mt-1">{time}</div>
      </Col>
    </Row>
  </ListGroup.Item>
);

NavbarDropdownItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  time: PropTypes.string,
  hasSpacing: PropTypes.bool,
  icon: PropTypes.element,
};

export default NavbarDropdownItem;

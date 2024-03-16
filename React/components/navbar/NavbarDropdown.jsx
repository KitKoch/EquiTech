import React from "react";
import PropTypes from "prop-types";

import { Dropdown, ListGroup } from "react-bootstrap";

const NavbarDropdown = ({
  children,
  count,
  hasBadge,
  header,
  footer,
  icon: Icon,
}) => (
  <Dropdown className="me-2 nav-item" align="end">
    <Dropdown.Toggle as="a" className="nav-link nav-icon dropdown-toggle">
      <div className="position-relative">
        <Icon className="align-middle" size={18} />
        {hasBadge ? <span className="indicator">{count}</span> : null}
      </div>
    </Dropdown.Toggle>
    <Dropdown.Menu drop="end" className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count} {header}
      </div>
      <ListGroup>{children}</ListGroup>
      <Dropdown.Header className="dropdown-menu-footer">
        <span className="text-muted">{footer}</span>
      </Dropdown.Header>
    </Dropdown.Menu>
  </Dropdown>
);

NavbarDropdown.propTypes = {
  title: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.shape({})),
  header: PropTypes.string,
  hasSpacing: PropTypes.bool,
  icon: PropTypes.shape({}),
  footer: PropTypes.string,
  count: PropTypes.number,
  hasBadge: PropTypes.bool,
};
export default NavbarDropdown;

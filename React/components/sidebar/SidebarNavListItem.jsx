import React, { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Badge, Collapse } from "react-bootstrap";

const CustomRouterLink = forwardRef((props, ref) => (
  <React.Fragment ref={ref}>
    <NavLink {...props} />
  </React.Fragment>
));

const SidebarNavListItem = (props) => {
  const {
    title,
    href,
    // depth = 0,
    children,
    icon: Icon,
    badge,
    isOpen: isOpenProp = false,
  } = props;

  const [isOpen, setisOpen] = React.useState(isOpenProp);

  const handleToggle = () => {
    setisOpen((state) => !state);
  };

  if (children) {
    return (
      <li className={`sidebar-item ${isOpen ? "active" : ""}`}>
        <a
          className={`sidebar-link ${isOpen ? "" : "collapsed"}`}
          data-bs-toggle="collapse"
          aria-expanded={isOpen ? "true" : "false"}
          // depth={depth}
          onClick={handleToggle}
        >
          {Icon && <Icon className="feather align-middle" />}{" "}
          <span className="align-middle">
            {/* depth={depth} */}
            {title}
          </span>
          {badge && (
            <Badge className="badge-sidebar-primary" bg="" size={18}>
              {badge}
            </Badge>
          )}
          {isOpen ? <div /> : <div />}
        </a>
        <Collapse in={isOpen}>
          <ul className="sidebar-dropdown list-unstyled">{children}</ul>
        </Collapse>
      </li>
    );
  }

  return (
    <li className="sidebar-item">
      <CustomRouterLink
        // depth={depth}
        to={href}
        activeclassname="active"
        className="sidebar-link"
      >
        {Icon && <Icon className="feather align-middle" />}{" "}
        <span className="align-middle">
          {/*  depth={depth} */}
          {title}
        </span>
        {badge && (
          <Badge className="badge-sidebar-primary" bg="" size={18}>
            {badge}
          </Badge>
        )}
      </CustomRouterLink>
    </li>
  );
};
SidebarNavListItem.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  // depth: PropTypes.number,
  children: PropTypes.shape({}),
  icon: PropTypes.shape({}),
  badge: PropTypes.string,
  isOpen: PropTypes.bool,
};
export default SidebarNavListItem;

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Main = ({ className, children }) => (
  <div className={classNames("main", className)}>{children}</div>
);

Main.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
};

export default Main;

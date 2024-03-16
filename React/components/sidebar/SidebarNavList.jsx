import React from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import reduceChildRoutes from "./reduceChildRoutes";

const SidebarNavList = (props) => {
  const { pages, depth } = props;
  const router = useLocation();
  const currentRoute = router.pathname;

  const childRoutes = pages.reduce(
    (items, page) => reduceChildRoutes({ items, page, currentRoute, depth }),
    []
  );

  return <React.Fragment>{childRoutes}</React.Fragment>;
};
SidebarNavList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.arrayOf(PropTypes.shape({})),
};
export default SidebarNavList;

import React from "react";
import PropTypes from "prop-types";

import PerfectScrollbar from "react-perfect-scrollbar";

import useSidebar from "../../hooks/useSidebar";
import SidebarFooter from "./SidebarFooter";
import SidebarNav from "./SidebarNav";

const Sidebar = (props) => {
  const { isOpen } = useSidebar();

  return (
    <nav className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/">
            <span className="align-middle me-3">Fairly</span>
          </a>
          <SidebarNav {...props} />
          {!!props.hasFooter && <SidebarFooter />}
        </PerfectScrollbar>
      </div>
    </nav>
  );
};
Sidebar.propTypes = {
  hasFooter: PropTypes.bool,
};
export default Sidebar;

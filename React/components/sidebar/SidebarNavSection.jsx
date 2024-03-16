import React from "react";
import PropTypes from "prop-types";

import SidebarNavList from "./SidebarNavList";

const SidebarNavSection = (props) => {
  const { title, pages, ...rest } = props;

  return (
    <React.Fragment {...rest}>
      {title && <li className="sidebar-header">{title}</li>}
      <SidebarNavList pages={pages} depth={0} />
    </React.Fragment>
  );
};

SidebarNavSection.propTypes = {
  title: PropTypes.string,
  pages: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SidebarNavSection;

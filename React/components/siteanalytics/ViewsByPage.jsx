import React from "react";
import PropTypes from "prop-types";
import usePalette from "../../hooks/usePalette";
import { Table } from "react-bootstrap";

const _logger = debug.extend("ViewsByPage");

function ViewsByPage(props) {
  false && _logger(props, palette);

  const palette = usePalette();

  const pageDataRows = props.pageData.labels.slice(0, 6).map((label, index) => (
    <tr key={index}>
      <td>{label}</td>
      <td className="text-end">{props.pageData.data[index]}</td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th className="pt-1">Page</th>
          <th className="text-end pt-1">Pageviews</th>
        </tr>
      </thead>
      <tbody>{pageDataRows}</tbody>
    </Table>
  );
}

ViewsByPage.propTypes = {
  pageData: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default ViewsByPage;

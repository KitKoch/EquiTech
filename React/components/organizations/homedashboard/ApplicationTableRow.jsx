import React from "react";
import { Badge } from "react-bootstrap";
import PropTypes from "prop-types";

function ApplicationTableRow({ app }) {
  let statusToRender = "";

  switch (app.status.name) {
    case "Accepted":
      statusToRender = <Badge bg="success">Accepted</Badge>;
      break;
    case "Pending":
      statusToRender = <Badge bg="info">Pending</Badge>;
      break;
    case "Offered":
      statusToRender = <Badge bg="primary">Offered</Badge>;
      break;
    case "Negotiation":
      statusToRender = <Badge bg="warning">Negotiation</Badge>;
      break;
    case "Employed":
      statusToRender = <Badge bg="dark">Negotiation</Badge>;
      break;
    default:
      statusToRender = <Badge bg="danger">Rejected</Badge>;
  }

  return (
    <tr>
      <td>{app.job.title}</td>
      <td className="d-none d-xl-table-cell">
        {new Date(app.job.estimatedStartDate).toLocaleDateString("en-us")}
      </td>
      <td className="d-none d-xl-table-cell">
        {new Date(app.job.estimatedFinishDate).toLocaleDateString("en-us")}
      </td>
      <td>{statusToRender}</td>
      <td className="d-none d-md-table-cell">
        {app.createdBy.firstName} {app.createdBy.lastName}
      </td>
      <td className="d-none d-md-table-cell">{app.email}</td>
    </tr>
  );
}

ApplicationTableRow.propTypes = {
  app: PropTypes.shape({
    email: PropTypes.string.isRequired,
    status: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    job: PropTypes.shape({
      title: PropTypes.string.isRequired,
      estimatedFinishDate: PropTypes.string.isRequired,
      estimatedStartDate: PropTypes.string.isRequired,
    }).isRequired,
    createdBy: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
  }),
};

export default ApplicationTableRow;

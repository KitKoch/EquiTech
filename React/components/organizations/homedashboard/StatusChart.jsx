import React from "react";
import { Pie } from "react-chartjs-2";

import { Card, Table } from "react-bootstrap";

import { Circle } from "react-feather";

import usePalette from "../../../hooks/usePalette";
import PropTypes from "prop-types";

function StatusChart({ appStatus }) {
  const palette = usePalette();

  const data = {
    labels: [
      "Offered",
      "Accepted",
      "Employed",
      "Negotiation",
      "Pending",
      "Rejected",
    ],
    datasets: [
      {
        data: [
          appStatus.offered,
          appStatus.accepted,
          appStatus.employed,
          appStatus.negotiation,
          appStatus.pending,
          appStatus.rejected,
        ],
        backgroundColor: [
          palette.primary,
          palette.success,
          palette.dark,
          palette.warning,
          palette.info,
          palette.danger,
        ],
        borderWidth: 5,
        borderColor: palette.white,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    legend: {
      display: false,
    },
  };

  const sum =
    appStatus.offered +
    appStatus.pending +
    appStatus.rejected +
    appStatus.employed +
    appStatus.negotiation +
    appStatus.accepted;

  return (
    <Card className="flex-fill w-100">
      <Card.Header>
        <Card.Title className="mb-0">Application Status Tracker</Card.Title>
      </Card.Header>
      <Card.Body className="d-flex">
        <div className="align-self-center w-100">
          <div className="py-3">
            <div className="chart chart-sm">
              <Pie data={data} options={options} />
            </div>
          </div>

          <Table className="mb-0">
            <thead>
              <tr>
                <th>Status</th>
                <th className="text-end">Number</th>
                <th className="text-end">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Circle className="bg-primary text-primary" /> Offered
                </td>
                <td className="text-end">{appStatus.offered}</td>
                <td className="text-end text-success">{`${Math.round(
                  (appStatus.offered / sum) * 100
                )}%`}</td>
              </tr>
              <tr>
                <td>
                  <Circle className="bg-success text-success" /> Accepted
                </td>
                <td className="text-end">{appStatus.accepted}</td>
                <td className="text-end text-success">{`${Math.round(
                  (appStatus.accepted / sum) * 100
                )}%`}</td>
              </tr>
              <tr>
                <td>
                  <Circle className="bg-warning text-warning" /> Negotation
                </td>
                <td className="text-end">{appStatus.negotiation}</td>
                <td className="text-end text-success">{`${Math.round(
                  (appStatus.negotiation / sum) * 100
                )}%`}</td>
              </tr>
              <tr>
                <td>
                  <Circle className="bg-info text-info" /> Pending
                </td>
                <td className="text-end">{appStatus.pending}</td>
                <td className="text-end text-success">{`${Math.round(
                  (appStatus.pending / sum) * 100
                )}%`}</td>
              </tr>
              <tr>
                <td>
                  <Circle className="bg-danger text-danger" /> Rejected
                </td>
                <td className="text-end">{appStatus.rejected}</td>
                <td className="text-end text-success">{`${Math.round(
                  (appStatus.rejected / sum) * 100
                )}%`}</td>
              </tr>
              <tr>
                <td>
                  <Circle className="bg-dark text-dark" /> Employed
                </td>
                <td className="text-end">{appStatus.employed}</td>
                <td className="text-end text-success">{`${Math.round(
                  (appStatus.employed / sum) * 100
                )}%`}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}

StatusChart.propTypes = {
  appStatus: PropTypes.shape({
    offered: PropTypes.number.isRequired,
    pending: PropTypes.number.isRequired,
    rejected: PropTypes.number.isRequired,
    employed: PropTypes.number.isRequired,
    negotiation: PropTypes.number.isRequired,
    accepted: PropTypes.number.isRequired,
  }),
};

export default StatusChart;

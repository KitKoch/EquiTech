import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function AppointmentCard({ anAppointment, checkDate }) {
  return (
    <li className="timeline-item">
      <Row>
        <Col sm={8}>
          <strong>{anAppointment.notes}</strong>
        </Col>
        <Col sm={4}>
          {" "}
          <span className="float-end text-muted text-sm">
            {checkDate(anAppointment.dateModified)}
          </span>
        </Col>
        <Col sm={12}>
          <p>
            Start: {anAppointment.appointmentStart.split("T")[0]} at{" "}
            {anAppointment.appointmentStart.split("T")[1]} <br /> Client:{" "}
            {anAppointment.client.firstName} {anAppointment.client.lastName}{" "}
            <br />
            Team Member: {anAppointment.teamMember.firstName}{" "}
            {anAppointment.teamMember.lastName}
          </p>
        </Col>
      </Row>
    </li>
  );
}

AppointmentCard.propTypes = {
  checkDate: PropTypes.func.isRequired,
  anAppointment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    notes: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    appointmentStart: PropTypes.string.isRequired,
    client: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    teamMember: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
  }),
};

export default AppointmentCard;

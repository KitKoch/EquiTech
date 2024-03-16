import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const CandidateAppointment = ({ appointment }) => {
  const onToggleColors = (color) => {
    if (color === "Active") {
      return "success";
    } else if (color === "Removed") {
      return "danger";
    } else if (color === "Inactive") {
      return "secondary";
    } else {
      return "primary";
    }
  };

  if (appointment.statusType.name !== "Active") {
    return null;
  }

  return (
    <tr key={"List-A" + appointment.id}>
      <td className="text-md-center">
        {appointment.client.firstName} {appointment.client.lastName}
      </td>
      <td className="text-md-center">{appointment.appointmentType.name}</td>
      <td onChange={onToggleColors}>{appointment.statusType.name}</td>
      <td className="text-md-center">{appointment.location.lineOne}</td>
      <td className="text-md-center">
        {moment(appointment.appointmentStart).format("MMM Do YYYY")}
      </td>
      <td className="text-md-center">
        {moment(appointment.appointmentStart).format("LT")}
      </td>
    </tr>
  );
};

CandidateAppointment.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    client: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    teamMember: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      lastName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    appointmentStart: PropTypes.string.isRequired,
    appointmentEnd: PropTypes.string.isRequired,
    appointmentType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      lineOne: PropTypes.string.isRequired,
    }).isRequired,
    statusType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CandidateAppointment;

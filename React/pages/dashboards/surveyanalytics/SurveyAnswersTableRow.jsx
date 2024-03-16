import React from "react";
import PropTypes from "prop-types";
import { formatDateTime } from "../../../utils/dateFormater.js";

function SurveyAnsweredTableRow(props) {
  const element = props.survey;

  return (
    <tr className="text-center">
      <td>{element?.surveyId}</td>
      <td>{element?.instanceId}</td>
      <td><img src={element?.surveyTaker.avatarUrl} className="avatar img-fluid rounded-circle p-1" alt="userAvatar"/> 
      {`${element?.surveyTaker.firstName} ${element?.surveyTaker.lastName}`}</td>
      <td>{formatDateTime(element?.dateCreated)}</td>
    </tr>
  );
}

SurveyAnsweredTableRow.propTypes = {
  survey: PropTypes.shape({
    surveyAnswerId: PropTypes.number.isRequired,
    surveyId: PropTypes.number.isRequired,
    surveyName: PropTypes.string.isRequired,
    surveyStatus: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    surveyType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
    instanceId: PropTypes.number.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    surveyTaker: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      MI: PropTypes.string,
      avatarUrl: PropTypes.string.isRequired,

    })
  })
};

export default SurveyAnsweredTableRow;

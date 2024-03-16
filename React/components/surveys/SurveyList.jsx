import React from "react";
import propTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useEffect } from "react";
import { formatDateTime } from "../../utils/dateFormater";

const SurveyList = ({ surveys, currentSurvey, setCurrentSurvey }) => {
  const getBagde = (color) => {
    let badge = "";
    switch (color) {
      case "Active":
        badge = "success";
        break;
      case "Inactive":
        badge = "warning";
        break;
      case "Canceled":
        badge = "secondary";
        break;
      case "Pending":
        badge = "warning";
        break;
      default:
        badge = "warning";
        break;
    }
    return badge;
  };

  useEffect(() => {
    if (!currentSurvey) setCurrentSurvey(surveys[0]);
  }, [surveys]);

  const mappedSurvey = surveys.map((survey) => (
    <Card key={survey.id}>
      <div
        className={`p-3 rounded ${
          currentSurvey &&
          currentSurvey.id === survey.id &&
          "border border-dark"
        }`}
        onClick={() => setCurrentSurvey(survey)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h3>{survey.name}</h3>
          <div>
            <div
              className={`bg-${getBagde(
                survey.surveyStatus.name
              )} text-white px-2 rounded-lg`}
            >
              {survey.surveyStatus.name}
            </div>
          </div>
        </div>
        <h5>{survey.description}</h5>
      </div>
    </Card>
  ));

  const avatar = {
    verticalAlign: "middle",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  };

  return (
    <div className="d-flex">
      <div>{mappedSurvey}</div>
      <div className="w-50 d-none d-lg-block ms-2 p-3 bg-white shadow h-auto">
        <img
          src={currentSurvey?.createdBy.avatarUrl}
          alt=""
          className="m-auto thumbnail"
          style={avatar}
        />
        <div>Created by: {currentSurvey?.createdBy.firstName}</div>
        <div className="my-3">
          <div className="fs-4 font-weight-bold">{currentSurvey?.name}</div>
          <div>{currentSurvey?.description}</div>
        </div>
        <div>
          <div>Survey Name: {currentSurvey?.name}</div>
          <div>Dated created: {formatDateTime(currentSurvey?.dateCreated)}</div>
        </div>
      </div>
    </div>
  );
};

SurveyList.propTypes = {
  surveys: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      name: propTypes.string,
      description: propTypes.string,
      surveyStatus: propTypes.shape({ name: propTypes.string }),
    })
  ),
  currentSurvey: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    description: propTypes.string,
    surveyStatus: propTypes.shape({ name: propTypes.string }),
    createdBy: propTypes.shape({
      avatarUrl: propTypes.string,
      firstName: propTypes.string,
    }),
    surveyTypes: propTypes.shape({
      name: propTypes.string,
    }),
    dateCreated: propTypes.string,
  }),
  setCurrentSurvey: propTypes.func.isRequired,
};
export default SurveyList;

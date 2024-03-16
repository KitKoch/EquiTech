import React from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import surveyService from "../../services/surveyService";
import { useState } from "react";
import BuilderSideBar from "./BuilderSideBar";
import "./surveyform.css";
import SurveyList from "./SurveyList";
import SurveyQuestionForm from "./SurveyQuestionForm";
import Response from "./Response";

const SurveyBuilder = () => {
  const _logger = debug.extend("survey");
  const [currentQuestion, setCurrenQuestion] = useState();
  const [currentTab, setCurrentTab] = useState(1);
  const [surveys, setSurveys] = useState([]);
  const [currentSurvey, setCurrentSurvey] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  const onNext = () => {
    if (currentTab === 4) return;
    setCurrentTab((prev) => prev + 1);
  };

  const onGetSurveysSuccess = (response) => {
    _logger(response);
    let mySurvey = response.item.pagedItems;
    setSurveys(mySurvey);
  };
  const onGetSurveysError = (err) => {
    _logger(err);
  };

  useEffect(() => {
    surveyService
      .getSurveys(0, 10)
      .then(onGetSurveysSuccess)
      .catch(onGetSurveysError);
  }, []);

  return (
    <div>
      <div className="d-flex flex-column flex-md-row justify-content-md-between">
        <h2 className="mb-0">Customer Survey Builder</h2>
        <div>
          <span className="fw-bold me-2">Current survey: </span>{" "}
          {currentSurvey?.name}
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <div className="d-flex gap-4 align-items-center">
          <div
            className={`survey-tab ${
              currentTab === 1 && "survey-tab-underline"
            }`}
            onClick={() => setCurrentTab(1)}
          >
            Select Survey
          </div>
          <div
            className={`survey-tab ${
              currentTab === 2 && "survey-tab-underline"
            }`}
            onClick={() => setCurrentTab(2)}
          >
            Design Question
          </div>
          <div
            className={`survey-tab d-none ${
              currentTab === 3 && "survey-tab-underline"
            }`}
            onClick={() => setCurrentTab(3)}
          >
            Collect Response
          </div>
          <div
            className={`survey-tab ${
              currentTab === 4 && "survey-tab-underline"
            }`}
            onClick={() => setCurrentTab(4)}
          >
            Review Reponse
          </div>
        </div>

        {currentTab < 4 && (
          <Button className="m-1 d-none" onClick={onNext}>
            Next
          </Button>
        )}
      </div>
      <hr className="m-0" />

      {currentTab === 1 && (
        <section className="d-flex mt-3 survey-sidebar">
          <SurveyList
            surveys={surveys}
            currentSurvey={currentSurvey}
            setCurrentSurvey={setCurrentSurvey}
          />
        </section>
      )}

      {currentTab === 2 && (
        <section className="d-flex mt-3 survey-sidebar ">
          <BuilderSideBar
            currentSurvey={currentSurvey}
            setCurrentQuestion={setCurrenQuestion}
            currentQuestion={currentQuestion}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
          <SurveyQuestionForm
            surveyId={currentSurvey.id}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrenQuestion}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
        </section>
      )}
      {currentTab === 4 && (
        <section className="d-flex mt-3 survey-sidebar">
          <Response currentSurvey={currentSurvey} />
        </section>
      )}
    </div>
  );
};

export default SurveyBuilder;

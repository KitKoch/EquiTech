import React from "react";
import propTypes from "prop-types";
import QuestionTab from "./QuestionTab";
import surveyService from "../../services/surveyService";
import { useEffect, useState } from "react";
import toastr from "toastr";
import Swal from "sweetalert2";

const BuilderSideBar = ({
  currentSurvey,
  currentQuestion,
  setCurrentQuestion,
  isUpdated,
  setIsUpdated,
}) => {
  const _logger = logger.extend("survey");

  const [questions, setQuestions] = useState({
    questionArray: [],
    questionComp: [],
  });

  const onFetchSuccess = ({ items }) => {
    _logger("question list", items);
    setQuestions((prevState) => {
      const newState = { ...prevState };
      newState.questionArray = items;
      newState.questionComp = items.map(mappedQuestions);
      return newState;
    });
    setIsUpdated(false);
  };
  const onFetchFailed = (e) => {
    _logger(e);
    toastr.error(e);
  };

  useEffect(() => {
    if (!currentSurvey) return;
    setCurrentQuestion();
    fetchQuestions();
  }, [currentSurvey, isUpdated]);

  const fetchQuestions = () => {
    if (!currentSurvey) return;
    setCurrentQuestion();
    surveyService
      .getSurveyQuestionsById(currentSurvey.id)
      .then(onFetchSuccess)
      .catch(onFetchFailed);
  };

  const handleDeleteQuestion = (questionId) => {
    Swal.fire({
      title: "Deleting Question",
      showDenyButton: true,
      confirmButtonText: "Are you sure you want to Delete?",
      denyButtonText: "Cancel Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        surveyService
          .deleteById(questionId)
          .then(onDeleteSuccess(questionId))
          .catch(onDeleteError);
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "", "info");
      }
    });
  };

  const onDeleteSuccess = (questionId) => {
    _logger("Delete Success", questionId);
    setQuestions((pState) => {
      const newSt = { ...pState };
      newSt.questionArray = [...pState.questionArray];

      const indexOfQuestion = newSt.questionArray.findIndex(
        (question) => questionId === question.id
      );

      if (indexOfQuestion >= 0) {
        newSt.questionArray.splice(indexOfQuestion, 1);
        newSt.questionComp = newSt.questionArray.map(mappedQuestions);
      }
      return newSt;
    });
  };

  const onDeleteError = (e) => {
    _logger("Delete error", e);
  };

  const mappedQuestions = (question) => {
    return (
      <QuestionTab
        key={question.id}
        question={question}
        setCurrentQuestion={setCurrentQuestion}
        currentQuestion={currentQuestion}
        onDeleteQuestion={handleDeleteQuestion}
      />
    );
  };

  const styleScroll = {
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    minWidth: "200px",
    height: "580px",
  };

  return (
    <div style={styleScroll}>
      <div>{questions.questionComp}</div>
    </div>
  );
};

BuilderSideBar.propTypes = {
  setCurrentQuestion: propTypes.func.isRequired,
  currentQuestion: propTypes.shape({
    question: propTypes.string,
    helpText: propTypes.string,
    id: propTypes.number,
  }),
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
  }).isRequired,
  isUpdated: propTypes.bool,
  setIsUpdated: propTypes.func,
  onDeleteQuestion: propTypes.func,
};

export default BuilderSideBar;

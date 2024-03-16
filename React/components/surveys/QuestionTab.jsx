import React, { useState } from "react";
import { AiFillQuestionCircle, AiOutlineDelete } from "react-icons/ai";
import propTypes from "prop-types";

const _logger = logger.extend("QuestionTab");

const QuestionTab = ({
  question,
  setCurrentQuestion,
  currentQuestion,
  onDeleteQuestion,
}) => {
  const [isHelpText, setHelpText] = useState(false);

  const onSelectQuestion = (question) => {
    setCurrentQuestion(question);
  };

  const handleDelete = (questionId) => {
    _logger("deleted", question.id);
    onDeleteQuestion(questionId);
  };

  return (
    <div
      key={question.id}
      className={`p-2 border d-flex justtify-content-between align-items-center ${
        question.id === currentQuestion?.id && "bg-light"
      }`}
      onClick={() => onSelectQuestion(question)}
      role="button"
    >
      <p className="flex-grow-1 m-0">{question.question}</p>
      <AiOutlineDelete size={21} onClick={() => handleDelete(question.id)} />
      <div>
        <AiFillQuestionCircle
          className="text-grey position-relative"
          size={14}
          onMouseEnter={() => setHelpText(true)}
          onMouseLeave={() => setHelpText(false)}
        />
        {isHelpText && (
          <div className="position-absolute bg-white rounded shadow px-2 z-10 py-1">
            {question.helpText}
          </div>
        )}
      </div>
    </div>
  );
};

QuestionTab.propTypes = {
  question: propTypes.shape({
    question: propTypes.string,
    helpText: propTypes.string,
    id: propTypes.number,
  }).isRequired,
  setCurrentQuestion: propTypes.func.isRequired,
  currentQuestion: propTypes.shape({
    question: propTypes.string,
    helpText: propTypes.string,
    id: propTypes.number,
  }),
  onDeleteQuestion: propTypes.func.isRequired,
};

export default QuestionTab;

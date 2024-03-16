import React from "react";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";
import * as Icon from "react-feather";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

const _logger = debug.extend("CheckBox");

function CheckBox({ question }) {
  _logger(question);
  const { handleChange, errors, touched } = useFormikContext();

  const helpMessage = (
    <Popover placement="left">
      <Popover.Header>{<strong>Why do we ask this?</strong>}</Popover.Header>
      <Popover.Body>{question.helpText}</Popover.Body>
    </Popover>
  );

  const mapFormCheck = (element) => {
    return (
      <React.Fragment key={`"AnswerId "${element.id}`}>
        <Form.Check
          name={element.questionId}
          component="checkbox"
          value={element.id}
          inline
          label={element.text}
          onChange={handleChange}
        />
      </React.Fragment>
    );
  };

  return (
    <Form.Group className="mb-3 ">
      <Form.Label htmlFor={question.id}>
        {question.question}
        <OverlayTrigger overlay={helpMessage}>
          <Icon.HelpCircle size={20} />
        </OverlayTrigger>
      </Form.Label>
      <div></div>
      {question.answerOptions.map(mapFormCheck)}
      {touched[question.id] && !!errors[question.id] ? (
        <div className="text-danger">{errors[question.id]}</div>
      ) : null}
    </Form.Group>
  );
}

CheckBox.propTypes = {
  question: PropTypes.shape({
    answerOptions: PropTypes.arrayOf(PropTypes.shape({})),
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    helpText: PropTypes.string.isRequired,
  }),
};

export default CheckBox;

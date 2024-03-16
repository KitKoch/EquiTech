import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Nav, Tab, Card, Col, Row, Container } from "react-bootstrap";
import toastr from "toastr";
import Swal from "sweetalert2";
import SurveyQuestionFormShcema from "../../schemas/surveyQuestionFormSchema";
import * as lookUpService from "../../services/lookUpService";
import * as surveyQuestionService from "../../services/surveyQuestionService";
import "../skills/skills.css";

const _logger = debug.extend("SurveyQuestionForm");

const defaultFormData = {
  id: null,
  question: "",
  helpText: "",
  isRequired: false,
  isMultipleAllowed: false,
  questionTypeId: 0,
  surveyId: 0,
  statusId: 0,
  sortOrder: 0,
};

export default function SurveyQuestionForm(props) {
  _logger(props);
  const aQuestion = props.currentQuestion;

  const [formData, setFormData] = useState(defaultFormData);

  _logger(setFormData);
  const [questionTypes, setQuestionTypes] = useState({
    questionTypes: [],
    questionTypeNames: [],
  });

  useEffect(() => {
    lookUpService
      .getTypes(["QuestionTypes"])
      .then(onGetQuestionTypesSuccess)
      .catch(onGetQuestionTypesError);
  }, []);

  const onGetQuestionTypesSuccess = (response) => {
    _logger(response, "onGetQuestionTypesSuccess");
    let questionTypeArray = response.item.questionTypes;

    setQuestionTypes((prevState) => {
      let newQuestionType = { ...prevState };

      newQuestionType.questionTypes = questionTypeArray;
      newQuestionType.questionTypeNames =
        questionTypeArray.map(mapQuestionType);

      return newQuestionType;
    });
  };

  const mapQuestionType = (questionType) => {
    return (
      <option value={questionType.id} key={`questionType_${questionType.id}`}>
        {questionType.name}
      </option>
    );
  };

  const onGetQuestionTypesError = (error) => {
    _logger(error, "onGetQuestionTypesError");
    toastr.error("Unable to get question type!");
  };

  const [surveyStatus, setSurveyStatus] = useState({
    surveyStatus: [],
    surveyStatusNames: [],
  });

  useEffect(() => {
    lookUpService
      .getTypes(["SurveyStatus"])
      .then(onGetSurveyStatusSuccess)
      .catch(onGetSurveyStatusError);
  }, []);

  const onGetSurveyStatusSuccess = (response) => {
    _logger(response, "onGetSurveyStatusSuccess");
    let surveyStatusArray = response.item.surveyStatus;

    setSurveyStatus((prevState) => {
      let newSurveyStatus = { ...prevState };

      newSurveyStatus.surveyStatus = surveyStatusArray;
      newSurveyStatus.surveyStatusNames =
        surveyStatusArray.map(mapSurveyStatus);

      return newSurveyStatus;
    });
  };

  const mapSurveyStatus = (surveyStatus) => {
    return (
      <option value={surveyStatus.id} key={`surveyStatus_${surveyStatus.id}`}>
        {surveyStatus.name}
      </option>
    );
  };

  const onGetSurveyStatusError = (error) => {
    _logger(error, "onGetSurveyStatusError");
    toastr.error("Unable to get survey status!");
  };

  useEffect(() => {
    if (!aQuestion) {
      setFormData((prevState) => {
        let newFormData = { ...prevState };
        newFormData.surveyId = props.surveyId;

        return newFormData;
      });
    } else {
      setFormData((prevState) => {
        let newFormData = { ...prevState };
        newFormData.question = aQuestion.question;
        newFormData.helpText = aQuestion.helpText;
        newFormData.isRequired = aQuestion.isRequired;
        newFormData.isMultipleAllowed = aQuestion.isMultipleAllowed;
        newFormData.questionTypeId = aQuestion.questionType.id;
        newFormData.statusId = aQuestion.statusType.id;
        newFormData.surveyId = aQuestion.surveyId;
        newFormData.sortOrder = aQuestion.sortOrder;
        newFormData.id = aQuestion.id;

        return newFormData;
      });
    }
  }, [aQuestion]);

  const handleSubmit = (values, { resetForm }) => {
    let newFormData = { ...values };
    _logger("Submit new survey question data", newFormData);

    if (!aQuestion) {
      surveyQuestionService
        .addSurveyQuestion(newFormData)
        .then(onAddSurveyQuestionSuccess)
        .then(() => resetForm())
        .catch(onAddSurveyQuestionError);
    } else {
      Swal.fire({
        title: "Are you sure you want to update?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
        dangerMode: true,
      }).then((result) => {
        if (result.isConfirmed) {
          surveyQuestionService
            .updateSurveyQuestion(newFormData, newFormData.id)
            .then(onUpdateSurveyQuestionSuccess)
            .catch(onUpdateSurveyQuestionError);
        } else if (result.dismiss) {
          Swal.fire({
            title: "Update cancelled!",
            icon: "info",
          });
        }
      });
    }
  };

  const onAddSurveyQuestionSuccess = (response) => {
    _logger(response, "onAddSurveyQuestionSuccess");
    toastr.success("Survey question is successfully added!");
    props.setIsUpdated(true);
  };

  const onAddSurveyQuestionError = (error) => {
    _logger(error, "onAddSurveyQuestionError");
    toastr.error("Survey question is NOT added, please try again!");
  };

  const onUpdateSurveyQuestionSuccess = (response) => {
    _logger(response, "onUpdateSurveyQuestionSuccess");
    toastr.success("Survey question is successfully updated!");
    defaultFormData.surveyId = props.surveyId;
    setFormData(defaultFormData);
    props.setIsUpdated(true);
  };

  const onUpdateSurveyQuestionError = (error) => {
    _logger(error, "onUpdateSurveyQuestionError");
    toastr.error("Survey question is NOT updated, please try again!");
  };

  const onAddClicked = () => {
    _logger("cancel clicked");

    defaultFormData.surveyId = props.surveyId;
    setFormData(defaultFormData);
    props.setCurrentQuestion(null);
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <Nav fill variant="tabs" className="justify-content-center">
                    <Nav.Item>
                      <Nav.Link eventKey="first">EDIT</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <div className="row justify-content-center">
                        <Formik
                          enableReinitialize={true}
                          initialValues={formData}
                          onSubmit={handleSubmit}
                          validationSchema={SurveyQuestionFormShcema}
                        >
                          <Form>
                            <div className="form-group mt-2 mb-3">
                              <label htmlFor="question" className="text-dark">
                                Question
                              </label>
                              <Field
                                type="text"
                                component="textarea"
                                name="question"
                                id="question"
                                className="form-control"
                                autoFocus={true}
                              />
                              <ErrorMessage
                                name="question"
                                component="div"
                                className="has-error"
                              />
                            </div>
                            <div className="form-group mt-2 mb-3">
                              <label htmlFor="helpText" className="text-dark">
                                Help Text
                              </label>
                              <Field
                                type="text"
                                component="textarea"
                                name="helpText"
                                id="helpText"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="helpText"
                                component="div"
                                className="has-error"
                              />
                            </div>
                            <div className="form-group mt-2 mb-3">
                              <label className="text-dark">
                                <Field
                                  type="checkbox"
                                  name="isRequired"
                                  id="isRequired"
                                  className="form-check-input me-2"
                                />
                                Is answer required
                              </label>
                            </div>
                            <div className="form-group mt-2 mb-3">
                              <label className="text-dark">
                                <Field
                                  type="checkbox"
                                  name="isMultipleAllowed"
                                  id="isMultipleAllowed"
                                  className="form-check-input me-2"
                                />
                                Are multiple answers allowed
                              </label>
                            </div>
                            <div className="form-group mt-2 mb-3">
                              <label
                                htmlFor="questionTypeId"
                                className="text-dark"
                              >
                                Question Type Name
                              </label>
                              <Field
                                as="select"
                                name="questionTypeId"
                                id="questionTypeId"
                                className="form-select"
                              >
                                <option value="">
                                  Please choose a question type
                                </option>
                                {questionTypes.questionTypeNames}
                              </Field>
                              <ErrorMessage
                                name="questionTypeId"
                                component="div"
                                className="has-error"
                              />
                            </div>
                            <div className="form-group mt-2 mb-3 d-none">
                              <label htmlFor="surveyId" className="text-dark">
                                Survey Id
                              </label>
                              <Field
                                type="text"
                                name="surveyId"
                                id="surveyId"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="surveyId"
                                component="div"
                                className="has-error"
                              />
                            </div>
                            <div className="form-group mt-2 mb-3">
                              <label htmlFor="statusId" className="text-dark">
                                Survey Status
                              </label>
                              <Field
                                as="select"
                                name="statusId"
                                id="statusId"
                                className="form-select"
                              >
                                <option value="">
                                  Please choose a survey status
                                </option>
                                {surveyStatus.surveyStatusNames}
                              </Field>
                              <ErrorMessage
                                name="statusId"
                                component="div"
                                className="has-error"
                              />
                            </div>
                            <div className="form-group mt-2 mb-3">
                              <label htmlFor="sortOrder" className="text-dark">
                                Sort Order
                              </label>
                              <Field
                                type="text"
                                name="sortOrder"
                                id="sortOrder"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="sortOrder"
                                component="div"
                                className="has-error"
                              />
                            </div>
                            <button type="submit" className="btn btn-primary">
                              {props.currentQuestion ? "Update" : "Submit"}
                            </button>
                            {props.currentQuestion && (
                              <button
                                type="button"
                                className="btn float-end btn-success"
                                onClick={onAddClicked}
                              >
                                Add New Question
                              </button>
                            )}
                          </Form>
                        </Formik>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

SurveyQuestionForm.propTypes = {
  surveyId: PropTypes.number.isRequired,
  currentQuestion: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    helpText: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired,
    isMultipleAllowed: PropTypes.bool.isRequired,
    questionType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    surveyId: PropTypes.number.isRequired,
    statusType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    sortOrder: PropTypes.number.isRequired,
  }),
  isUpdated: PropTypes.bool,
  setIsUpdated: PropTypes.func,
  onAddQuestionClick: PropTypes.func,
  setCurrentQuestion: PropTypes.func,
};

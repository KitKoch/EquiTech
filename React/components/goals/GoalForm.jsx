import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import goalFormSchema from "../../schemas/goalFormSchema";
import "../goals/goals.css";
import goalsService from "../../services/goalService";
import toastr from "toastr";
import * as lookUpService from "../../services/lookUpService";
import { useLocation, useNavigate } from "react-router-dom";

const _logger = debug.extend("Goals");

function GoalForm() {
  const location = useLocation();
  const { state } = location;

  const [pageData, setPageData] = useState({
    id: null,
    name: "",
    statement: "",
    preferenceId: 0,
    minimumPay: 0,
    desiredPay: 0,
    isHourly: false,
    priority: 0,
    yearsToGoal: 0,
    isCompleted: false,
    isDeleted: false,
    goalValues: [],
  });
  const [personalValues, setPersonalValues] = useState([]);
  useEffect(() => {
    const payload = ["PersonalValues"];
    lookUpService.getTypes(payload).then(getTypeSuccess).catch(getTypeError);
  }, []);
  const getTypeSuccess = (response) => {
    setPersonalValues(response.item.personalValues);
  };
  const getTypeError = (err) => {
    _logger(err, "onGetTypeError");
  };

  const mapPersonalValue = (pv, values) => {
    const idToBeChecked = pv.id;
    let isChecked;
    for (let index = 0; index < values.goalValues.length; index++) {
      const element = values.goalValues[index];
      if (element === idToBeChecked.toString()) {
        isChecked = true;
      }
    }
    return (
      <Form.Label htmlFor="goalValues" key={pv.id}>
        <Field
          type="checkbox"
          name="goalValues"
          value={pv.id}
          checked={isChecked}
          className="mx-2"
        />
        {pv.name}
      </Form.Label>
    );
  };

  useEffect(() => {
    if (state?.type === "CANDIDATE_GOAL" && state?.payload) {
      setPageData((prevState) => {
        const pd = { ...prevState, ...state.payload };
        pd.goalValues = pd.goalValues.map((item) => item.id.toString());
        _logger(prevState, state.payload);
        pd.minimumPay = state.payload.paymentPreference.minimumPay;
        pd.desiredPay = state.payload.paymentPreference.desiredPay;
        pd.isHourly = state.payload.paymentPreference.isHourly;
        return pd;
      });
    }
  }, []);

  const handleSubmit = (values) => {
    _logger("Values", values);
    const payload = { ...values };
    if (pageData.id === null) {
      goalsService
        .addGoal(payload)
        .then(onAddGoalSuccess)
        .catch(onAddGoalError);
    } else {
      payload.preferenceId = values.paymentPreference.id;
      goalsService
        .updateGoal(payload.id, payload)
        .then(onUpdateGoalSuccess)
        .catch(onUpdateGoalError);
    }
  };
  const onAddGoalSuccess = (response) => {
    _logger(response, "onAddGoalSuccess");
    toastr.success("Goal is successfully added!");
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.id = response.item;
      return pd;
    });
  };
  const onAddGoalError = (err) => {
    _logger(err, "onAddGoalError");
    toastr.error("Something went wrong. Please try again.");
  };
  const onUpdateGoalSuccess = (response) => {
    _logger(response, "onUpdateGoalSuccess");
    toastr.success("Successful", "Update your Goal");
  };
  const onUpdateGoalError = (err) => {
    _logger(err, "onUpdateGoalError");
    toastr.error("Please try again", "Unable to update your Goal");
  };

  const navigate = useNavigate();
  const goToPage = (e) => {
    navigate(e.currentTarget.dataset.page);
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>
                <h1 className="text-primary">Create A Goal</h1>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Formik
                enableReinitialize={true}
                initialValues={pageData}
                onSubmit={handleSubmit}
                validationSchema={goalFormSchema}
              >
                {({ values, resetForm }) => (
                  <FormikForm className="form-control">
                    <Row className="form-group col-6">
                      <Col className="mb-3">
                        <Form.Label htmlFor="name" className="mt-2">
                          Goal Name:
                        </Form.Label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="goals-has-error"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group col-6">
                      <Col className="mb-3">
                        <Form.Label htmlFor="statement" className="mt-2">
                          Statement:
                        </Form.Label>
                        <Field
                          type="text"
                          as="textarea"
                          name="statement"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="statement"
                          component="div"
                          className="goals-has-error"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col className="mb-3 col-2">
                        <Form.Label htmlFor="minimumPay" className="mt-2">
                          Minimum Pay:
                        </Form.Label>
                        <Field
                          type="number"
                          name="minimumPay"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="minimumPay"
                          component="div"
                          className="goals-has-error"
                        />
                      </Col>
                      <Col className="mb-3 col-2">
                        <Form.Label htmlFor="desiredPay" className="mt-2">
                          Desired Pay:
                        </Form.Label>
                        <Field
                          type="number"
                          name="desiredPay"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="desiredPay"
                          component="div"
                          className="goals-has-error"
                        />
                      </Col>
                      <Col className="mb-3 col-1">
                        <Form.Label htmlFor="isHourly" className="mt-2">
                          Hourly?
                        </Form.Label>
                        <Field
                          as="select"
                          name="isHourly"
                          className="form-control"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </Field>
                      </Col>
                      <Col className="mb-3 col-2">
                        <Form.Label htmlFor="Priority" className="mt-2">
                          Priority Rank:
                        </Form.Label>
                        <Field
                          as="select"
                          name="priority"
                          className="form-control"
                        >
                          <option value={0}>Select Priority</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </Field>
                        <ErrorMessage
                          name="priority"
                          component="div"
                          className="goals-has-error"
                        />
                      </Col>
                      <Col className="mb-3 col-2">
                        <Form.Label htmlFor="yearsToGoal" className="mt-2">
                          Years To Goal:
                        </Form.Label>
                        <Field
                          type="number"
                          name="yearsToGoal"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="yearsToGoal"
                          component="div"
                          className="goals-has-error"
                        />
                      </Col>
                      <Row className="form-group col-10">
                        <Col className="mb-3 col-5">
                          <Form.Label htmlFor="goalValues" className="mt-2">
                            Goal Values:
                          </Form.Label>
                          <Row>
                            {personalValues.map((pv) =>
                              mapPersonalValue(pv, values)
                            )}
                          </Row>
                        </Col>
                      </Row>
                    </Row>
                    <Row className="form-group col-3">
                      <Col className="mb-2 col">
                        <Button className="btn btn-primary" type="submit">
                          Submit
                        </Button>
                      </Col>
                      <Col className="mb-2 col">
                        <Button
                          className="btn btn-warning"
                          type="button"
                          onClick={() => {
                            resetForm();
                          }}
                        >
                          Reset
                        </Button>
                      </Col>
                      <Col className="mb-2 col">
                        <Button
                          className="btn btn-danger"
                          type="button"
                          data-page="/goals"
                          onClick={goToPage}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </FormikForm>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default GoalForm;

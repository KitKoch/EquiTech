import { React, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import "./userSettings.css";
import propTypes from "prop-types";
import changePasswordSchema from "../../schemas/changePasswordSchema";
import { Eye, EyeOff } from "react-feather";

function UserPasswordCard(props) {
  const password = {
    newPassword: "",
    confirm: "",
  };

  const onPasswordSubmit = (values) => {
    props.handlePasswordChange(values);
  };

  const [viewPassword, setViewPassword] = useState("password");

  const onClickView = () => {
    if (viewPassword === "password") {
      setViewPassword("text");
    } else {
      setViewPassword("password");
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title className="mb-0">Password</Card.Title>
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col>
              <Formik
                enableReinitialize={true}
                initialValues={password}
                onSubmit={onPasswordSubmit}
                validationSchema={changePasswordSchema}
              >
                <FormikForm>
                  <Container>
                    <Row className="user-settings-form">
                      <Col>
                        <label className="form-label" htmlFor="newPassword">
                          New Password
                        </label>
                        <Field
                          name="newPassword"
                          className="form-control"
                          type={viewPassword}
                        ></Field>
                        <ErrorMessage
                          className="change-password-error"
                          name="newPassword"
                          component="div"
                        />
                      </Col>
                      <Col>
                        <label className="form-label" htmlFor="confirm">
                          Confirm New Password
                        </label>
                        <Field
                          name="confirm"
                          className="form-control"
                          type={viewPassword}
                        ></Field>
                        <ErrorMessage
                          className="change-password-error"
                          name="confirm"
                          component="div"
                        />
                      </Col>
                    </Row>
                    <Button
                      type="submit"
                      className="btn btn-primary mt-2 user-settings-form"
                    >
                      Update password
                    </Button>
                    <Button
                      className="btn btn-primary mt-2 ms-2 user-settings-form"
                      onClick={onClickView}
                    >
                      {viewPassword === "password" ? (
                        <Eye className="feather" />
                      ) : (
                        <EyeOff className="feather" />
                      )}
                    </Button>
                  </Container>
                </FormikForm>
              </Formik>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

UserPasswordCard.propTypes = {
  handlePasswordChange: propTypes.func.isRequired,
};

export default UserPasswordCard;

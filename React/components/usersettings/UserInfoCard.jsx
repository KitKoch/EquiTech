import React from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, Field } from "formik";
import "./userSettings.css";
import UserAvatarUpload from "./UserAvatarUpload";
import propTypes from "prop-types";
import blankAvatar from "../../assets/img/avatars/blank-avatar.jpg";

function UserInfoCard(props) {
  const onUserInfoSubmit = (values) => {
    props.handleInfoChange(values);
  };

  const userInfo = {
    firstName: props.userData.firstName,
    lastName: props.userData.lastName,
    email: props.userData.email,
  };

  const onError = (e) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src = blankAvatar;
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title className="mb-0">Profile Info</Card.Title>
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col md="8">
              <Formik
                enableReinitialize={true}
                initialValues={userInfo}
                onSubmit={onUserInfoSubmit}
              >
                <FormikForm>
                  <Container>
                    <Row className="user-settings-form">
                      <Col>
                        <label className="form-label" htmlFor="firstName">
                          First Name
                        </label>
                        <Field
                          name="firstName"
                          className="form-control"
                          type="text"
                        ></Field>
                      </Col>
                      <Col>
                        <label className="form-label" htmlFor="lastName">
                          Last Name
                        </label>
                        <Field
                          name="lastName"
                          className="form-control"
                          type="text"
                        ></Field>
                      </Col>
                    </Row>
                    <Row className="user-settings-form">
                      <Col>
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <Field
                          name="email"
                          className="form-control"
                          type="text"
                        ></Field>
                      </Col>
                    </Row>
                    <Button
                      type="submit"
                      className="btn btn-primary mt-2 user-settings-form"
                    >
                      Save changes
                    </Button>
                  </Container>
                </FormikForm>
              </Formik>
            </Col>
            <Col md="4">
              <div className="text-center">
                <img
                  alt="Avatar"
                  src={props.userData.avatarUrl || blankAvatar}
                  className="rounded-circle mb-3"
                  width="128"
                  height="128"
                  onError={onError}
                />
                <div className="mt-2">
                  <UserAvatarUpload handleFileChange={props.handleFileChange} />
                </div>
                <small>
                  For best results, use an image at least 128px by 128px in .jpg
                  format
                </small>
              </div>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

UserInfoCard.propTypes = {
  userData: propTypes.shape({
    avatarUrl: propTypes.string,
    email: propTypes.string.isRequired,
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string.isRequired,
  }).isRequired,
  handleFileChange: propTypes.func.isRequired,
  handleInfoChange: propTypes.func.isRequired,
};

export default UserInfoCard;

import { React, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import { Button, Card, Col, Row, Container, Form } from "react-bootstrap";
import inviteService from "../../services/inviteService";
import userFormSchema from "../../schemas/userFormSchema";
import userService from "../../services/userService";
import Swal from "sweetalert2";

const _logger = debug.extend("Invite Register");

function InviteSignUp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inviteData, setInviteData] = useState(null);
  const token = searchParams.get("token");
  const initialValues = {
    mi: "",
    avatarUrl: "",
    password: "",
    passwordConfirm: "",
    statusId: 1,
    isProfileViewable: true,
  };

  useEffect(() => {
    inviteService
      .selectByToken(token)
      .then(onGetInviteSuccess)
      .catch(onGetInviteError);
  }, []);

  const onGetInviteSuccess = (res) => {
    setInviteData(res.item);
  };

  const onGetInviteError = (error) => {
    _logger("Token does not exist", error);
    Swal.fire({
      icon: "error",
      title: "Invite token does not exist.",
      text: "Click below to be redirected",
      confirmButtonText: "To Register Page",
    }).then((res) => {
      if (res.isConfirmed) {
        navigate("/auth/signup");
      }
    });
  };

  const onSubmit = (values) => {
    let mergedValues = values;
    mergedValues.firstName = inviteData.firstName;
    mergedValues.lastName = inviteData.lastName;
    mergedValues.email = inviteData.email;
    _logger("Submitting: ", mergedValues);
    userService
      .registerUser(mergedValues)
      .then(onRegisterUserSuccess)
      .catch(onRegisterUserError);
  };

  const onRegisterUserSuccess = () => {
    inviteService
      .deleteById(inviteData.id)
      .then(onDeleteInviteByIdSuccess)
      .catch(onDeleteInviteByIdError);
  };

  const onRegisterUserError = (error) => {
    _logger("Register Error", error);
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      confirmButtonText: "Try Again",
    });
  };

  const onDeleteInviteByIdSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Registered!",
    }).then(navigate("/auth/signin"));
  };

  const onDeleteInviteByIdError = (error) => {
    _logger("Del Error", error);
    Swal.fire({
      icon: "error",
      title: "Deleting token failed.",
      confirmButtonText: "Registration Success! but Invite Token Delete Failed",
    }).then(navigate("/auth/signin"));
  };

  return (
    <Container className="mt-3">
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={8} md={8} className="py-4 py-xl-0">
          <Card>
            <Card.Header>
              <Card.Title className="d-flex justify-content-center mb-0">
                <h1 className="text-primary mb-0">
                  You&apos;ve been invited to Fairly!{" "}
                </h1>
              </Card.Title>
            </Card.Header>
            <Card.Body className="pt-2 pb-0">
              <Col className="fs-4 mx-3">
                {inviteData && (
                  <Row>
                    Email: {inviteData.email}
                    <Row>
                      First: {inviteData.firstName}
                      <Row>Last: {inviteData.lastName}</Row>
                    </Row>
                  </Row>
                )}
              </Col>
              <hr />
              <Formik
                validationSchema={userFormSchema.inviteSignUp}
                onSubmit={onSubmit}
                initialValues={initialValues}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
                }) => (
                  <FormikForm noValidate onSubmit={handleSubmit}>
                    <Row>
                      <Form.Group
                        as={Col}
                        md={6}
                        controlId="password"
                        className="mb-3"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Password"
                          isValid={touched.password && !errors.password}
                          isInvalid={touched.password && errors.password}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md={6}
                        controlId="passwordConfirm"
                        className="mb-3"
                      >
                        <Form.Label>Password Confirm</Form.Label>
                        <Form.Control
                          type="password"
                          name="passwordConfirm"
                          value={values.passwordConfirm}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Password"
                          isValid={
                            touched.passwordConfirm && !errors.passwordConfirm
                          }
                          isInvalid={
                            touched.passwordConfirm && errors.passwordConfirm
                          }
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.passwordConfirm}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group>
                          <Field
                            className="px-1 m-2"
                            type="checkbox"
                            name="isProfileViewable"
                            label="Should your profile be visible?"
                          />
                          <Form.Label>Make your profile viewable?</Form.Label>
                        </Form.Group>
                      </Col>
                      <Col className="d-flex justify-content-end">
                        <Button type="submit">Sign Up</Button>
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

export default InviteSignUp;

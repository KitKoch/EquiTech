import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm, Field } from "formik";
import { Button, Card, Col, Row, Container, Form } from "react-bootstrap";
import userFormSchema from "../../schemas/userFormSchema";
import userService from "../../services/userService";
import Swal from "sweetalert2";

const _logger = logger.extend("Register");

function SignUp() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    mi: "",
    avatarUrl: "",
    password: "",
    passwordConfirm: "",
    StatusId: 1,
    isProfileViewable: true,
  };

  const onSubmit = (values) => {
    _logger("submitted", values);
    userService
      .registerUser(values)
      .then(onRegisterUserSuccess)
      .catch(onRegisterUserError);
  };

  const onRegisterUserSuccess = (values) => {
    Swal.fire({
      icon: "success",
      title: "You have successfully Registered",
    }).then((result) => {
      if (result.isConfirmed) {
        let state = { type: "new", payload: values };
        _logger("this is what the result is", state);
        navigate(`/references`, { state });
      }
    });
  };

  const onRegisterUserError = (error) => {
    _logger("Register User Error", error);
    Swal.fire({
      icon: "error",
      title: "Registration failed, please try again",
      confirmButtonText: "Try Again",
    });
  };

  return (
    <Container className="mt-3">
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={8} md={8} className="py-8 py-xl-0">
          <Card>
            <Card.Header>
              <Card.Title>
                <h1 className="text-primary">Sign-Up!</h1>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={userFormSchema.signUp}
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
                        md={12}
                        controlId="email"
                        className="mb-3"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Email"
                          isValid={touched.email && !errors.email}
                          isInvalid={touched.email && errors.email}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group
                        as={Col}
                        md={5}
                        controlId="firstName"
                        className="mb-3"
                      >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="First Name"
                          isValid={touched.firstName && !errors.firstName}
                          isInvalid={touched.firstName && errors.firstName}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md={2}
                        controlId="mi"
                        className="mb-3"
                      >
                        <Form.Label>Mi</Form.Label>
                        <Form.Control
                          type="text"
                          name="mi"
                          value={values.mi}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Mi"
                          isValid={touched.mi && values.mi && !errors.mi}
                          isInvalid={touched.mi && errors.mi}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.mi}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        md={5}
                        controlId="lastName"
                        className="mb-3"
                      >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Last Name"
                          isValid={touched.lastName && !errors.lastName}
                          isInvalid={touched.lastName && errors.lastName}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
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
                      <Form.Group>
                        <Field
                          className="px-1 m-2"
                          type="checkbox"
                          name="isProfileViewable"
                          label="Should your profile be visible?"
                        />
                        <Form.Label>Make your profile viewable?</Form.Label>
                      </Form.Group>
                    </Row>
                    <Button type="submit">Submit form</Button>
                    <Link className="p-2" to="/auth/signin">
                      {"Already have an account?"}
                    </Link>
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

export default SignUp;

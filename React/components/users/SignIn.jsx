import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Form as FormikForm } from "formik";
import { Button, Card, Col, Row, Container, Form } from "react-bootstrap";
import userFormSchema from "../../schemas/userFormSchema";
import userService from "../../services/userService";
import Swal from "sweetalert2";
import toastr from "toastr";

const _logger = logger.extend("signin");

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    _logger("submitted", values);
    userService.signIn(values).then(onLoginSuccess).catch(onLoginError);
  };

  const onLoginSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "You have logged in!",
    }).then(getRoute);
  };

  const getRoute = () => {
    userService
      .getCurrent()
      .then(onGetCurrentSuccess)
      .catch(onGetCurrentOrderError);
  };

  const onGetCurrentSuccess = (response) => {
    const user = response.item;
    const payload = { state: { type: "LOGIN", payload: user } };
    if (user?.roles?.includes("SysAdmin")) {
      navigate("/dashboard/analytics", payload);
    } else if (user?.roles?.includes("HiringAdmin")) {
      navigate("/hiring/admin/dashboard", payload);
    } else if (user?.organizationId && user?.roles?.includes("OrgAdmin")) {
      navigate("/dashboard/organization", payload);
    } else if (
      location.state?.type === "JOBAPP" &&
      location.state?.jobpayload
    ) {
      navigate(`${location.state.jobpayload}`, payload);
    } else {
      navigate("/", payload);
    }
  };

  const onGetCurrentOrderError = () => {
    toastr.error("There was an error getting user data, please login again");
  };

  const onLoginError = (error) => {
    _logger("onLoginError", error);
    Swal.fire({
      icon: "error",
      title: "Email or Password are Incorrect",
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
                <h1 className="text-primary">Welcome to Fairly!</h1>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={userFormSchema.signIn}
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
                        md={12}
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
                    </Row>

                    <Button type="submit">Sign In</Button>
                    <Link className="p-2" to="/auth/signup">
                      {"Don't have an account?"}
                    </Link>

                    <Link className="p-2" to="/resetpassword">
                      {"Forgot Password?"}
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

export default SignIn;

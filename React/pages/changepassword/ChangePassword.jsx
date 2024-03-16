import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import userService from "../../services/userService";
import changePasswordSchema from "../../schemas/changePasswordSchema";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(document.location.search);

  const initialValues = {
    newPassword: "",
    confirm: "",
  };

  const handleSubmit = (values) => {
    const payload = {
      password: values.newPassword,
      confirmPassword: values.confirm,
      token: params.get("token"),
      email: params.get("email"),
    };

    userService
      .changeUserPassword(payload)
      .then(onChangePasswordSuccess)
      .catch(onChangePasswordError);
  };
  const onChangePasswordSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Password has been changed",
    });
    navigate("/auth/signin");
  };

  const onChangePasswordError = () => {
    Swal.fire({
      icon: "error",
      title: "Password change failed, please try again",
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
                <h1 className="text-primary text-center mt-3">
                  Change Password
                </h1>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Formik
                initialValues={initialValues}
                validationSchema={changePasswordSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="text-center">
                      <p className="lead">Create your new password here!</p>
                      <label className="container input" htmlFor="newPassword">
                        {" "}
                        New Password
                      </label>
                      <Field
                        type="password"
                        name="newPassword"
                        id="newPassword"
                      />
                    </div>
                    <div className="container display-flex max-width ">
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="text-danger mt-3 mx-auto text-center mt-4"
                      />
                    </div>
                    <div className="text-center">
                      <label className="container input" htmlFor="confirm">
                        {" "}
                        Confirm Password
                      </label>
                      <Field type="password" name="confirm" id="confirm" />
                    </div>
                    <div className="container display-flex max-width">
                      <ErrorMessage
                        name="confirm"
                        component="div"
                        className="text-danger mt-3 mx-auto text-center mt-4 "
                      />
                    </div>

                    <div className="mt-3 mx-auto text-center mt-4">
                      <Button className="mb-5" type="submit">
                        Change Password {isSubmitting}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;

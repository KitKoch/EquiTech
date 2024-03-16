import React, { useState } from "react";
import resetPasswordSchema from "../../schemas/resetPasswordSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import userService from "../../services/userService";
import toastr from "toastr";
import Swal from "sweetalert2";

const _logger = logger.extend("ResetPassword");

function ResetPassword() {
  const [formData] = useState({
    email: "",
  });

  const onSubmit = (values) => {
    _logger("submitted", values);
    userService
      .forgotPassword({
        to: { email: values.email, name: "Receiver" },
        sender: { email: "fairlyorgadmin@dispostable.com", name: "Fairly" },
      })
      .then(onSubmitForgotPassSuccess)
      .catch(onSubmitForgotPassError);
  };

  const onSubmitForgotPassSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Email has been sent",
    });
  };

  const onSubmitForgotPassError = () => {
    Swal.fire({
      icon: "error",
      title: "Email could not be sent, please try again",
      confirmButtonText: "Try Again",
    });
    toastr.error("Unsuccessful", "Email Submission");
  };

  return (
    <Container className="mt-3">
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={8} md={8} className="py-8 py-xl-0">
          <Card>
            <Card.Header>
              <Card.Title>
                <h1 className="text-primary text-center mt-4">
                  Reset password
                </h1>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Formik
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={onSubmit}
                validationSchema={resetPasswordSchema}
              >
                <Form>
                  <div className="text-center mt-4">
                    <p className="lead">
                      Enter the email associated with your account to receive a
                      link to reset your password.
                    </p>
                  </div>
                  <div className="form-group mt-3 mx-auto text-center mt-4">
                    <label className="mt-3 mx-auto mt-4 " htmlFor="Email">
                      Email:
                    </label>
                    <Field type="email" name="email"></Field>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                    <div />
                    <div className="mt-3 mx-auto text-center mt-4">
                      <Button type="submit" className="btn btn-primary">
                        submit
                      </Button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ResetPassword;

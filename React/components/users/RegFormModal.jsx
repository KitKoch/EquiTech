import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Form, Col, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import userFormSchema from "../../schemas/userFormSchema";
import userService from "../../services/userService";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const _loggerPage = logger.extend("RegForm");

function RegFormModal({ setShowModal }) {
  const navigate = useNavigate();
  const location = useLocation();

  const initialValuesRegister = {
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

  const onSubmitRegister = (values) => {
    _loggerPage("submitted", values);
    setShowModal(false);
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
        const payload = { state: { type: "NEW", payload: values } };
        navigate(`${location.pathname}`, payload);
      }
    });
  };

  const onRegisterUserError = (error) => {
    _loggerPage("Register User Error", error);
    Swal.fire({
      icon: "error",
      title: "Registration failed, please try again",
      confirmButtonText: "Try Again",
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={userFormSchema.signUp}
      onSubmit={onSubmitRegister}
      initialValues={initialValuesRegister}
    >
      <FormikForm>
        <Row>
          <Form.Group as={Col} md={12} controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Field
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={5} controlId="firstName" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Field
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First Name"
            />
            <ErrorMessage
              name="firstName"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          <Form.Group as={Col} md={2} controlId="mi" className="mb-3">
            <Form.Label>Mi</Form.Label>
            <Field
              type="text"
              name="mi"
              className="form-control"
              placeholder="MI"
            />
            <ErrorMessage name="mi" component="div" className="text-danger" />
          </Form.Group>

          <Form.Group as={Col} md={5} controlId="lastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Field
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last Name"
            />
            <ErrorMessage
              name="lastName"
              component="div"
              className="text-danger"
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6} controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Field
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md={6}
            controlId="passwordConfirm"
            className="mb-3"
          >
            <Form.Label>Password Confirm</Form.Label>
            <Field
              type="password"
              name="passwordConfirm"
              className="form-control"
              placeholder="Email"
            />
            <ErrorMessage
              name="passwordConfirm"
              component="div"
              className="text-danger"
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} md={6} className="mb-3">
            <Field
              className="px-1 m-2"
              type="checkbox"
              name="isProfileViewable"
              label="Should your profile be visible?"
            />
            <Form.Label>Make your profile viewable?</Form.Label>
          </Form.Group>
        </Row>

        <Button type="submit" className="col-12 rounded-pill mb-2 py-2">
          Register
        </Button>
      </FormikForm>
    </Formik>
  );
}

RegFormModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};

export default RegFormModal;

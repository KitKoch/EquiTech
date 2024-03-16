import React, { useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import userFormSchema from "../../schemas/userFormSchema";
import userService from "../../services/userService";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import toastr from "toastr";

const _loggerPage = logger.extend("LogForm");

function LogFormModal({ setShowModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const onSubmitLogin = (values, { resetForm }) => {
    _loggerPage("submitted", values);
    setShowModal(false);
    userService.signIn(values).then(onLoginSuccess).catch(onLoginError);
    resetForm();
  };

  const onLoginSuccess = useCallback(() => {
    Swal.fire({
      icon: "success",
      title: "You have logged in!",
    }).then(getRoute);
  }, []);

  const getRoute = () => {
    userService
      .getCurrent()
      .then(onGetCurrentSuccess)
      .catch(onGetCurrentOrderError);
  };

  const onGetCurrentSuccess = (response) => {
    const user = response.item;
    _loggerPage("currentUser Success", response);
    const payload = { state: { type: "LOGIN", payload: user } };
    navigate(`${location.pathname}`, payload);
    _loggerPage(`${location.pathname}`, payload, "pathname and payload");
  };

  const onGetCurrentOrderError = () => {
    toastr.error("There was an error getting user data, please login again");
  };

  const onLoginError = (error) => {
    _loggerPage("onLoginError", error);
    Swal.fire({
      icon: "error",
      title: "Email or Password are Incorrect",
      confirmButtonText: "Try Again",
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={userFormSchema.signIn}
      onSubmit={onSubmitLogin}
      initialValues={initialValuesLogin}
    >
      <FormikForm>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Field
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
          />
          <ErrorMessage name="email" component="div" className="text-danger" />
        </Form.Group>

        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
          <Link className="p-2" to="/resetpassword">
            {"Forgot Password?"}
          </Link>
        </Form.Group>

        <Button type="submit" className="col-12 rounded-pill py-2 mb-2">
          Sign In
        </Button>
      </FormikForm>
    </Formik>
  );
}

LogFormModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};

export default LogFormModal;

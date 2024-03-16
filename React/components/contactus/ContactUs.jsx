import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card, InputGroup, Button } from "react-bootstrap";
import { MdAccountCircle, MdEmail, MdMessage } from "react-icons/md";
import fairlyLogo from "../../assets/img/contactusLogo/contactUsLogo.png";
import contactUsSchema from "../../schemas/contactUsSchema";
import sendMessage from "../../services/contactUsService";
import Swal from "sweetalert2";
import "./uscontact.css";
const _logger = debug.extend("contactus");

function ContactUs() {
  const [formData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const onSubmit = (inputs, { resetForm }) => {
    let payload = {
      Sender: {
        Email: inputs.email,
        Name: `${inputs.firstName} ${inputs.lastName}`,
      },
      Body: inputs.message,
    };
    _logger("Current inputs: ", payload);
    sendMessage(payload).then(onSendSuccess).catch(onSendError);
    resetForm();
  };
  const onSendSuccess = (response) => {
    _logger("onSendSuccess", response);
    Swal.fire({
      icon: "success",
      title: "We appreciate your inputs.",
      confirmButtonText: "OK",
    });
  };
  const onSendError = (err) => {
    _logger("onSendError", err);
    Swal.fire({
      icon: "warning",
      title: "Sorry, something went wrong. Please try again.",
      confirmButtonText: "OK",
    });
  };
  return (
    <React.Fragment>
      <div className="container align-items-center justify-content-center col-6 mt-5 mb-auto">
        <div className="row ">
          <Card>
            <Card.Header className="pb-0 mt-2 align-items-center">
              <Card.Title className="text-center row mx-auto">
                <div className="col-md-2 text-center my-auto">
                  <img
                    src={fairlyLogo}
                    className="img-fluid "
                    alt="Fairly logo"
                  />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-8 text-center my-auto">
                  <h2>Contact Us</h2>
                  <p className="mb-0">
                    Whether you have questions or you would just like to say
                    hello:
                  </p>
                </div>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Formik
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={onSubmit}
                validationSchema={contactUsSchema}
              >
                <Form>
                  <div className="form-group row">
                    <div className="col-6">
                      <label htmlFor="firstName">First name</label>
                      <InputGroup>
                        <InputGroup.Text>
                          <MdAccountCircle />
                        </InputGroup.Text>
                        <Field
                          type="text"
                          name="firstName"
                          className="form-control"
                        />
                      </InputGroup>
                      <ErrorMessage name="firstName" component="div" />
                    </div>
                    <div className="col-6">
                      <label htmlFor="lastName">Last name</label>
                      <InputGroup>
                        <InputGroup.Text>
                          <MdAccountCircle />
                        </InputGroup.Text>
                        <Field
                          type="text"
                          name="lastName"
                          className="form-control"
                        />
                      </InputGroup>
                      <ErrorMessage name="lastName" component="div" />{" "}
                    </div>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="email">Email</label>
                    <InputGroup>
                      <InputGroup.Text>
                        <MdEmail />
                      </InputGroup.Text>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="message">Your Message</label>
                    <InputGroup>
                      <InputGroup.Text>
                        <MdMessage />
                      </InputGroup.Text>
                      <Field
                        type="text"
                        component="textarea"
                        name="message"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage name="message" component="div" />
                  </div>
                  <div className="text-end">
                    <Button type="submit" className="btn btn-primary mt-2">
                      Send Message
                    </Button>
                  </div>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ContactUs;

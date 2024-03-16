import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as newsletterSubscriptionServices from "../../../services/newslettersSubService.js";
import newsletterSubscriptionSchema from "../../../schemas/newsletterSubSchema.js";
import toastr from "toastr";

function SubscribeForm() {
  const [newsletterSubscriptionFormData] = useState({
    email: "",
  });

  const onSubmitHandler = (values, { resetForm }) => {
    newsletterSubscriptionServices
      .add({
        email: values.email,
        isSubscribed: true,
      })
      .then(onSubmitHandlerSuccess({ resetForm }))
      .catch(onSubmitHandlerError);
  };

  const onSubmitHandlerSuccess = ({ resetForm }) => {
    toastr.success("Subscribed to Newsletter!");
    resetForm();
  };

  const onSubmitHandlerError = (error) => {
    toastr.error("There was an error attempting to subscribe. ", error);
  };

  return (
    <div className="content mt-5">
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-4">
            <div className="card p-3">
              <div className="card-header">
                <div className="card-title text-center mb-0">
                  <h1>Subscribe to Our Newsletter</h1>
                </div>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={newsletterSubscriptionFormData}
                onSubmit={onSubmitHandler}
                validationSchema={newsletterSubscriptionSchema}
              >
                <Form>
                  <div className="input-group mb-3">
                    <Field
                      name="email"
                      type="text"
                      placeholder="Enter email"
                      aria-label="Email"
                      aria-describedby="submit"
                      className="form-control"
                    />
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      id="submit"
                    >
                      Submit
                    </button>
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="has-error"
                  />
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribeForm;

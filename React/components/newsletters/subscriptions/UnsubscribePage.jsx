import React, { useCallback, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as newsletterSubscriptionServices from "../../../services/newslettersSubService.js";
import emailSchema from "../../../schemas/newsletterSubSchema.js";
import toastr from "toastr";

function UnsubscribePage() {
  const _logger = debug.extend("UnsubscribePage");
  const [newsletterUnsubscribeFormData] = useState({
    email: "",
  });

  const onEmailSubmitHandler = useCallback((values, { resetForm }) => {
    const { email } = values;

    newsletterSubscriptionServices
      .getByEmail(email)
      .then(handleGetByEmailResponse)
      .catch(handleGetByEmailError);

    function handleGetByEmailResponse(response) {
      _logger(response);
      const { isSubscribed } = response.item;
      _logger(response.item);
      if (isSubscribed === true) {
        handleSubscription(email, resetForm);
      } else if (isSubscribed === false) {
        toastr.error("Email is not subscribed");
      }
    }
  }, []);

  const handleSubscription = (email, resetForm) => {
    newsletterSubscriptionServices
      .edit({
        email,
        isSubscribed: false,
      })
      .then(onUnsubscribeEmailSuccess({ resetForm }))
      .catch(onUnsubscribeEmailError);
  };

  const onUnsubscribeEmailSuccess = ({ resetForm }) => {
    toastr.success("Email is unsubscribed");
    resetForm();
  };

  const onUnsubscribeEmailError = (error) => {
    toastr.error(error, "Email was not able unsubscribed to our newsletter");
  };

  const handleGetByEmailError = (error) => {
    toastr.error(error, "Email was not found in our database");
  };

  return (
    <div className="content mt-5">
      <div className="container-fluid p-0">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-4">
            <div className="card p-3">
              <div className="card-header">
                <div className="card-title text-center mb-0">
                  <h1>Unsubscribe from our Newsletter</h1>
                </div>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={newsletterUnsubscribeFormData}
                onSubmit={onEmailSubmitHandler}
                validationSchema={emailSchema}
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

export default UnsubscribePage;

import React from "react";
import { withFormik, Form, Field } from "formik";
import PropTypes from "prop-types";
import jobsFormSchemaPart3 from "../../schemas/jobsFormSchemaPart3";
import * as Yup from "yup";

const _logger = logger.extend("Jobs3");

function JobsFormPart3(props) {
  _logger(props);

  const {
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    backLabel,
    nextLabel,
    onBack,
    cantBack,
  } = props;

  return (
    <Form
      className="p-1"
      validationSchema={jobsFormSchemaPart3}
      onSubmit={handleSubmit}
    >
      <container>
        <div className="contactName-form-group">
          <label htmlFor="contactName">Contact Name</label>
          <Field
            type="text"
            className={`form-control ${
              errors.contactName && touched.contactName && "is-invalid"
            }`}
            name="contactName"
            id="contactName"
          />
          {errors.contactName && touched.contactName && (
            <div className="invalid-feedback">{errors.contactName}</div>
          )}
        </div>
        <br />
        <div className="contactPhone-form-group">
          <label htmlFor="contactPhone">Contact Phone</label>
          <Field
            type="text"
            className={`form-control ${
              errors.contactPhone && touched.contactPhone && "is-invalid"
            }`}
            name="contactPhone"
            id="contactPhone"
          />
          {errors.contactPhone && touched.contactPhone && (
            <div className="invalid-feedback">{errors.contactPhone}</div>
          )}
        </div>
        <br />
        <div className="contactEmail-form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <Field
            type="text"
            className={`form-control ${
              errors.contactEmail && touched.contactEmail && "is-invalid"
            }`}
            name="contactEmail"
            id="contactEmail"
          />
          {errors.contactEmail && touched.contactEmail && (
            <div className="invalid-feedback">{errors.contactEmail}</div>
          )}
        </div>
        <br />
        <div className="estimatedStartDate-form-group">
          <label htmlFor="estimatedStartDate">Estimated Start Date</label>
          <Field
            type="text"
            className="form-control"
            name="estimatedStartDate"
            id="estimatedStartDate"
          />
        </div>
        <br />
        <div className="estimatedFinishDate-form-group">
          <label htmlFor="estimatedFinishDate">Estimated Finish Date</label>
          <Field
            type="text"
            className="form-control"
            name="estimatedFinishDate"
            id="estimatedFinishDate"
          />
        </div>
        <br />
        <div className="jobs-button-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onBack}
            disabled={isSubmitting || cantBack}
          >
            {backLabel}
          </button>
          <button
            type="submit"
            className="btn btn-primary ml-1"
            disabled={isSubmitting}
          >
            {nextLabel}
          </button>
        </div>
      </container>
    </Form>
  );
}

JobsFormPart3.propTypes = {
  job: PropTypes.shape({}),
  touched: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
  backLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  cantBack: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
  touched: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    contactName: props.job.contactName,
    contactPhone: props.job.contactPhone,
    contactEmail: props.job.contactEmail,
    estimatedStartDate: props.job.estimatedStartDate,
    estimatedFinishDate: props.job.estimatedFinishDate,
  }),

  validationSchema: Yup.object().shape({
    contactName: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(200)
      .required(),
    contactPhone: Yup.string().min(2, "Must be at least 2 characters").max(20),
    contactEmail: Yup.string().min(2, "Must be at least 2 characters").max(200),
    estimatedStartDate: Yup.date(),
    estimatedFinishDate: Yup.date(),
  }),

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
})(JobsFormPart3);

import React from "react";
import { withFormik, Field, Form } from "formik";
import PropTypes from "prop-types";
import jobsFormSchemaPart1 from "../../schemas/jobsFormSchemaPart1";
import "./job-style.css";
import * as Yup from "yup";

const _logger = logger.extend("Jobs1");

function JobsFormPart1(props) {
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
      onSubmit={handleSubmit}
      validationSchema={jobsFormSchemaPart1}
    >
      <container>
        <h1 className="text-primary">New Job Post</h1>
        <div className="title-form-group">
          <label htmlFor="title">Title</label>
          <Field
            type="text"
            className={`form-control ${
              errors.title && touched.title && "is-invalid"
            }`}
            name="title"
            id="title"
          />
          {errors.title && touched.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>
        <br />

        <div className="description-form-group">
          <label htmlFor="description">Description</label>
          <Field
            type="text"
            component="textarea"
            className={`form-control ${
              errors.description && touched.description && "is-invalid"
            }`}
            name="description"
            id="description"
          />
          {errors.description && touched.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>
        <br />

        <div className="requirements-form-group">
          <label htmlFor="requirements">Requirements</label>
          <Field
            type="text"
            component="textarea"
            className={`form-control ${
              errors.requirements && touched.requirements && "is-invalid"
            }`}
            name="requirements"
            id="requirements"
          />
          {errors.requirements && touched.requirements && (
            <div className="invalid-feedback">{errors.requirements}</div>
          )}
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

JobsFormPart1.propTypes = {
  job: PropTypes.shape({}),
  touched: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
  backLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  cantBack: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    title: props.job.title,
    description: props.job.description,
    requirements: props.job.requirements,
  }),

  validationSchema: Yup.object().shape({
    title: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(200)
      .required(),
    description: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(4000)
      .required(),
    requirements: Yup.string()
      .min(2, "Must be at least 2 characters")
      .max(3000)
      .required(),
  }),

  handleSubmit: (values, { props }) => {
    _logger("On next");
    props.onNext(values);
  },
})(JobsFormPart1);

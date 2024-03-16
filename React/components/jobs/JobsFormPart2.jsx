import { React, useEffect, useState } from "react";
import { withFormik, Form, Field } from "formik";
import PropTypes from "prop-types";
import jobsFormSchemaPart2 from "../../schemas/jobsFormSchemaPart2";
import * as Yup from "yup";
import * as lookUpService from "../../services/lookUpService";
import organizationService from "../../services/organizationService";
import locationServices from "../../services/locationService";

const _logger = logger.extend("Jobs2");

function JobsFormPart2(props) {
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

  const [selectOptions, setSelectedOptions] = useState({
    jobTypes: [],
    jobStatus: [],
    remoteStatus: [],
  });
  const [selectOrgOptions, setSelectOrgOptions] = useState({
    organizations: [],
  });

  const [selectLocationOptions, setSelectLocationOptions] = useState({
    locations: [],
  });

  const mapJobTypes = (jobType) => {
    return (
      <option value={jobType.id} key={`jobType_${jobType.id}`}>
        {jobType.name}
      </option>
    );
  };
  const mapJobStatus = (jobStatus) => {
    return (
      <option value={jobStatus.id} key={`jobStatus_${jobStatus.id}`}>
        {jobStatus.name}
      </option>
    );
  };
  const mapRemoteStatus = (remoteStatus) => {
    return (
      <option value={remoteStatus.id} key={`remoteStatus_${remoteStatus.id}`}>
        {remoteStatus.name}
      </option>
    );
  };
  const mapLocations = (locations) => {
    return (
      <option value={locations.id} key={`locations_${locations.id}`}>
        {locations.lineTwo} {locations.city}, {locations.state.name}{" "}
        {locations.zip}
      </option>
    );
  };
  useEffect(() => {
    lookUpService
      .getTypes(["JobTypes", "JobStatus", "RemoteStatus"])
      .then(onGetTypesSuccess)
      .catch(onGetTypesError);
  }, []);

  const onGetTypesSuccess = (response) => {
    _logger(response, "lookup success");

    setSelectedOptions((prevState) => {
      const newSt = { ...prevState };
      newSt.jobTypes = response.item.jobTypes.map(mapJobTypes);
      newSt.jobStatus = response.item.jobStatus.map(mapJobStatus);
      newSt.remoteStatus = response.item.remoteStatus.map(mapRemoteStatus);
      return newSt;
    });
  };
  const onGetTypesError = (err) => {
    _logger(err, "lookUp error");
  };

  useEffect(() => {
    organizationService.getOrgs().then(onGetOrgSuccess).catch(onGetOrgError);
  }, []);

  const onGetOrgSuccess = (response) => {
    _logger(response, "Org success");

    setSelectOrgOptions((prevState) => {
      const newSt = { ...prevState };
      newSt.organizations = response.items.map(mapJobTypes);
      return newSt;
    });
  };
  const onGetOrgError = (err) => {
    _logger(err, "Org error");
  };

  useEffect(() => {
    locationServices
      .getAllPaginated(0, 100)
      .then(onLocationGetAllSuccess)
      .catch(onLocationGetAllError);
  }, []);

  const onLocationGetAllError = (error) => {
    _logger("Location Error", error);
  };

  const onLocationGetAllSuccess = (response) => {
    setSelectLocationOptions((prevState) => {
      const newSt = { ...prevState };
      newSt.locations = response.data.item.pagedItems.map(mapLocations);
      return newSt;
    });
    _logger("Location Success", response);
  };

  return (
    <Form
      className="p-1"
      validationSchema={jobsFormSchemaPart2}
      onSubmit={handleSubmit}
    >
      <container>
        <div className="jobTypeId-form-group">
          <label htmlFor="jobTypeId">Job Type</label>
          <Field
            component="select"
            className={`form-select ${
              errors.jobTypeId && touched.jobTypeId && "is-invalid"
            }`}
            name="jobTypeId"
            id="jobTypeId"
          >
            <option>Please Select Job Type</option>
            {selectOptions.jobTypes}
          </Field>

          {errors.jobTypeId && touched.jobTypeId && (
            <div className="invalid-feedback">{errors.jobTypeId}</div>
          )}
        </div>
        <br />
        <div className="jobStatusId-form-group">
          <label htmlFor="jobStatusId">Job Status</label>
          <Field
            type="text"
            component="select"
            className={`form-select ${
              errors.jobStatusId && touched.jobStatusId && "is-invalid"
            }`}
            name="jobStatusId"
            id="jobStatusId"
          >
            <option>Please Select Job Status</option>
            {selectOptions.jobStatus}
          </Field>

          {errors.jobStatusId && touched.jobStatusId && (
            <div className="invalid-feedback">{errors.jobStatusId}</div>
          )}
        </div>
        <br />
        <div className="organizationId-form-group">
          <label htmlFor="organizationId">Organization</label>
          <Field
            as="select"
            className={`form-select ${
              errors.organizationId && touched.organizationId && "is-invalid"
            }`}
            name="organizationId"
            id="organizationId"
          >
            <option>Please Select Organization</option>
            {selectOrgOptions.organizations}
          </Field>

          {errors.organizationId && touched.organizationId && (
            <div className="invalid-feedback">{errors.organizationId}</div>
          )}
        </div>
        <br />
        <div className="locationId-form-group">
          <label htmlFor="locationId">Location</label>
          <Field
            as="select"
            className={`form-select ${
              errors.locationId && touched.locationId && "is-invalid"
            }`}
            name="locationId"
            id="locationId"
          >
            <option>Please Select Location</option>
            {selectLocationOptions.locations}
          </Field>
          {errors.locationId && touched.locationId && (
            <div className="invalid-feedback">{errors.locationId}</div>
          )}
        </div>
        <br />
        <div className="remoteStatusId-form-group">
          <label htmlFor="remoteStatusId">Work Location</label>
          <Field
            type="text"
            component="select"
            className={`form-select ${
              errors.remoteStatusId && touched.remoteStatusId && "is-invalid"
            }`}
            name="remoteStatusId"
            id="remoteStatusId"
          >
            <option>Please Work Location</option>
            {selectOptions.remoteStatus}
          </Field>
          {errors.remoteStatusId && touched.remoteStatusId && (
            <div className="invalid-feedback">{errors.remoteStatusId}</div>
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

JobsFormPart2.propTypes = {
  job: PropTypes.shape({}),
  touched: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
  backLabel: PropTypes.string,
  nextLabel: PropTypes.string,
  onBack: PropTypes.func,
  isSubmitting: PropTypes.bool,
  cantBack: PropTypes.string,
  handleSubmit: PropTypes.func,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    jobTypeId: props.job.jobTypeId,
    jobStatusId: props.job.jobStatusId,
    organizationId: props.job.organizationId,
    locationId: props.job.locationId,
    remoteStatusId: props.job.remoteStatusId,
  }),

  validationSchema: Yup.object().shape({
    jobTypeId: Yup.number().required("Is required"),
    jobStatusId: Yup.number().required("Is required"),
    organizationId: Yup.number().required("Is required"),
    locationId: Yup.number().required("Is required"),
    remoteStatusId: Yup.number().required("Is required"),
  }),

  handleSubmit: (values, { props }) => {
    props.onNext(values);
    values.jobTypeId = parseInt(values.jobTypeId);
    values.jobStatusId = parseInt(values.jobStatusId);
    values.remoteStatusId = parseInt(values.remoteStatusId);
  },
})(JobsFormPart2);

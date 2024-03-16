import { React, useEffect, useState } from "react";
import { Form, Field, withFormik } from "formik";
import PropTypes from "prop-types";
import jobsFormSchema from "../../schemas/jobsFormSchema";
import * as Yup from "yup";
import "./jobsForm4-style.css";
import * as lookUpService from "../../services/lookUpService";
import organizationService from "../../services/organizationService";
import locationServices from "../../services/locationService";

const _logger = logger.extend("Jobs4");

function JobsFormPart4(props) {
  _logger(props);
  const { isSubmitting, handleSubmit, backLabel, nextLabel, onBack, cantBack } =
    props;
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
        {locations.lineTwo}
        {locations.city}, {locations.state.name} {locations.zip}
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
      .getAllPaginated(0, 14)
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
      onSubmit={handleSubmit}
      validationSchema={jobsFormSchema}
    >
      <container>
        <h1 className="text-primary">Review New Job Post</h1>
        <div className="title-form-group">
          <label htmlFor="title">Title</label>
          <Field type="text" className="form-control" name="title" id="title" />
        </div>
        <br />
        <div className="description-form-group">
          <label htmlFor="description">Description</label>
          <Field
            type="text"
            component="textarea"
            className="form-control"
            name="description"
            id="description"
          />
        </div>
        <br />
        <div className="requirements-form-group">
          <label htmlFor="requirements">Requirements</label>
          <Field
            type="text"
            component="textarea"
            className="form-control"
            name="requirements"
            id="requirements"
          />
        </div>
        <br />
        <div className="jobTypeId-form-group">
          <label htmlFor="jobTypeId">Job Type</label>
          <Field
            type="text"
            component="select"
            className="form-control"
            name="jobTypeId"
            id="jobTypeId"
          >
            <option></option>
            {selectOptions.jobTypes}
          </Field>
        </div>
        <br />
        <div className="jobStatusId-form-group">
          <label htmlFor="jobStatusId">Job Status</label>
          <Field
            type="text"
            component="select"
            className="form-control"
            name="jobStatusId"
            id="jobStatusId"
          >
            <option></option>
            {selectOptions.jobStatus}
          </Field>
        </div>
        <br />
        <div className="organizationId-form-group">
          <label htmlFor="organizationId">Organization</label>
          <Field
            as="select"
            className="form-control"
            name="organizationId"
            id="organizationId"
          >
            <option></option>
            {selectOrgOptions.organizations}
          </Field>
        </div>
        <br />
        <div className="locationId-form-group">
          <label htmlFor="locationId">Location</label>
          <Field
            as="select"
            className="form-control"
            name="locationId"
            id="locationId"
          >
            <option></option>
            {selectLocationOptions.locations}
          </Field>
        </div>
        <br />
        <div className="remoteStatusId-form-group">
          <label htmlFor="remoteStatusId">Remote Status</label>
          <Field
            type="text"
            component="select"
            className="form-control"
            name="remoteStatusId"
            id="remoteStatusId"
          >
            <option></option>
            {selectOptions.remoteStatus}
          </Field>
        </div>
        <br />
        <div className="contactName-form-group">
          <label htmlFor="contactName">Contact Name</label>
          <Field
            type="text"
            className="form-control"
            name="contactName"
            id="contactName"
          />
        </div>
        <br />
        <div className="contactPhone-form-group">
          <label htmlFor="contactPhone">Contact Phone</label>
          <Field
            type="text"
            className="form-control"
            name="contactPhone"
            id="contactPhone"
          />
        </div>
        <br />
        <div className="contactEmail-form-group">
          <label htmlFor="contactEmail">Contact Email</label>
          <Field
            type="text"
            className="form-control"
            name="contactEmail"
            id="contactEmail"
          />
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

JobsFormPart4.propTypes = {
  job: PropTypes.shape({}),
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
    jobTypeId: props.job.jobTypeId,
    jobStatusId: props.job.jobStatusId,
    organizationId: props.job.organizationId,
    locationId: props.job.locationId,
    remoteStatusId: props.job.remoteStatusId,
    contactName: props.job.contactName,
    contactPhone: props.job.contactPhone,
    contactEmail: props.job.contactEmail,
    estimatedStartDate: props.job.estimatedStartDate,
    estimatedFinishDate: props.job.estimatedFinishDate,
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
    jobTypeId: Yup.number().required("Is required"),
    jobStatusId: Yup.number().required("Is required"),
    organizationId: Yup.number().required("Is required"),
    locationId: Yup.number().required("Is required"),
    remoteStatusId: Yup.number().required("Is required"),
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
    _logger("Finish");
    props.onNext(values);
    values.jobTypeId = parseInt(values.jobTypeId);
    values.jobStatusId = parseInt(values.jobStatusId);
    values.remoteStatusId = parseInt(values.remoteStatusId);
  },
})(JobsFormPart4);

import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import { useParams, useNavigate } from "react-router-dom";
import jobService from "../../services/jobService";
import { MapPin, Rss, Box, User, Briefcase, Calendar } from "react-feather";
import "./jobsearch.css";
import { Button } from "react-bootstrap";
import JobDetailMap from "./JobDetailMap";
import toastr from "toastr";

const _logger = debug.extend("JobDetails");

function JobDetails() {
  const [jobData, setJobData] = useState({});

  const [showMap, setShowMap] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  _logger(jobData, id);

  useEffect(() => {
    _logger("useEffect getJobById");
    jobService.getJobById(id).then(getJobSuccess).catch(getJobError);
  }, []);

  const getJobSuccess = (data) => {
    _logger(data);
    setJobData(() => {
      const pageData = data.item;

      return pageData;
    });
  };

  const getJobError = (err) => {
    _logger(err);
    toastr.error(
      "Sorry! We didn’t find any jobs matching your criteria or search area. Please modify your search and try again."
    );
  };

  const onClickBackToSearch = () => {
    navigate(`/jobs/search`);
  };

  const calcDaysAgo = (dateCreated) => {
    let oneDay = 1000 * 60 * 60 * 24;
    let today = new Date();
    let msDifference = today.getTime() - Date.parse(dateCreated);

    return Math.round(msDifference / oneDay);
  };

  const daysAgo = calcDaysAgo(jobData?.dateCreated);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString();
  };

  const onClickApply = () => {
    _logger("will lead you you to someone else's page");
  };

  const handleMapToggle = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="container">
      <Button
        className="btn btn-light rounded btn-lg mb-3 mt-3"
        onClick={onClickBackToSearch}
      >
        {`< Back to Search`}
      </Button>
      <div className="row">
        <div className="col-8">
          <div className="d-flex">
            <div className="d-sm-block">
              <img
                src={jobData?.organization?.logo}
                className="job-large-view-logo-size-md"
                alt="company-logo"
              />
            </div>
            <div className="vstack ms-2">
              <h1>{jobData.title}</h1>
              <ul className="list-inline">
                <Rss></Rss>
                <li className="list-inline-item ms-1">
                  {jobData?.remoteStatus?.name}
                </li>
                <MapPin></MapPin>
                <li className="list-inline-item ms-1">
                  {jobData?.location?.city}, {jobData.location?.state?.name}
                </li>
                <Box></Box>
                <li className="list-inline-item ms-1">
                  {jobData?.organization?.name}
                </li>
                <li>
                  {`Posted:
                  ${
                    daysAgo < 1
                      ? "Just posted"
                      : daysAgo === 1
                      ? `${daysAgo} day ago`
                      : daysAgo > 30
                      ? `${daysAgo}+ days ago`
                      : `${daysAgo} days ago`
                  }`}
                </li>
              </ul>
            </div>
          </div>
          <div name="description box" className="mt-3">
            <h3>Description</h3>
            <p>{jobData?.description}</p>
            <h3>Requirements</h3>
            <p>{jobData?.requirements}</p>
            <h3>About the Company</h3>
            <p>{jobData?.organization?.description}</p>
          </div>
        </div>
        <div className="col">
          <Button className="btn-lg mb-3" onClick={onClickApply}>
            Click to Apply
          </Button>
          <div name="job-details-card" className="card">
            <h5 className="card-header fw-light fs-3">Job Details</h5>
            <ul className="list-unstyled ms-3">
              <div className="hstack">
                <User></User>
                <div className="vstack m-2">
                  <li className="fw-bold fs-4">Contact</li>
                  <li>{jobData?.contactName}</li>
                </div>
              </div>
              <div className="hstack">
                <MapPin></MapPin>
                <div className="vstack m-2">
                  <li
                    className="fw-bold fs-4 text-decoration-underline job-detail-pointer"
                    onClick={handleMapToggle}
                  >
                    Location
                  </li>
                  <li>{jobData?.location?.lineOne}</li>
                  <li>
                    {jobData?.location?.city}, {jobData.location?.state?.name}{" "}
                    {jobData?.location?.zip}
                  </li>
                </div>
              </div>
              <div className="hstack">
                <Briefcase></Briefcase>
                <div className="vstack m-2">
                  <li className="fw-bold fs-4">Job Type</li>
                  <li>{jobData?.jobType?.name}</li>
                </div>
              </div>
              <div className="hstack">
                <Calendar></Calendar>
                <div className="vstack m-2">
                  <li className="fw-bold fs-4">Start and End Date</li>
                  <li>{`From: ${formatDate(
                    jobData?.estimatedStartDate
                  )} To: ${formatDate(jobData?.estimatedStartDate)}`}</li>
                </div>
              </div>
            </ul>
          </div>
          <div className="row justify-content-center">
            {showMap && (
              <JobDetailMap
                propLat={jobData?.location?.latitude}
                propLng={jobData?.location?.longitude}
                onClickDisableMap={handleMapToggle}
                key={`${jobData?.location?.latitude}-${jobData?.location?.longitude}`}
              ></JobDetailMap>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;

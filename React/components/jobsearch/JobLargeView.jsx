import React from "react";
import PropTypes from "prop-types";
import { ExternalLink } from "react-feather";

const _logger = debug.extend("JobLargeView");

function JobLargeView(props) {
  const calcDaysAgo = (dateCreated) => {
    let oneDay = 1000 * 60 * 60 * 24;
    let today = new Date();
    let msDifference = today.getTime() - Date.parse(dateCreated);

    return Math.round(msDifference / oneDay);
  };

  const daysAgo = calcDaysAgo(props.cardData?.job?.dateCreated);

  _logger(props);

  const applyClicked = () => {
    let jobId = props.cardData?.job?.id;
    _logger(jobId);
    props.onClickApply(jobId);
  };

  return (
    <div name="large-view" className="col">
      <div className="d-flex">
        <div className="d-sm-block flex-shrink-0">
          <img
            src={props.cardData?.job?.organization?.logo}
            className="job-large-view-logo-size-md"
            alt="company-logo"
          />
        </div>
        <div className="flex-grow-1 ms-3">
          <div className="d-flex justify-content-between">
            <a href={`/jobs/search/${props.cardData?.job?.id}/details`}>
              <h1 className="card-title ml-3 m-auto fs-1">
                {props.cardData?.job?.title}
              </h1>
            </a>
            <a
              href={`/jobs/search/${props.cardData?.job?.id}/details`}
              className="mt-2"
            >
              <ExternalLink></ExternalLink>
            </a>
          </div>
          <div name="card-company-name" className="fs-3">
            {props.cardData?.job?.organization?.name}
          </div>
          <div className="d-flex justify-content-between">
            <div name="Company Location" className="fs-4">
              {`${props.cardData?.job?.location?.city}, ${props.cardData?.job?.location?.state?.col3} (${props.cardData?.job?.remoteStatus?.name})`}
            </div>
            <button
              onClick={applyClicked}
              className="btn btn-primary btn-sm rounded mr-3 mb-2"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div name="posted-day" className="d-flex justify-content-between mb-0">
        <span className="fw-bold">Posted</span>
        <span>
          {daysAgo < 1
            ? "Just posted"
            : daysAgo === 1
            ? `${daysAgo} day ago`
            : daysAgo > 30
            ? `${daysAgo}+ days ago`
            : `${daysAgo} days ago`}
        </span>
      </div>
      <hr />
      <div
        name="company-location"
        className="d-flex justify-content-between mt-0"
      >
        <span className="fw-bold">Location</span>
        <span>
          {`${props.cardData?.job?.location?.lineOne}, ${props.cardData?.job?.location?.city}, ${props.cardData?.job?.location?.state?.col3} ${props.cardData?.job?.location?.zip}`}
        </span>
      </div>
      <hr />
      <div name="company-contact" className="d-flex justify-content-between">
        <span className="fw-bold">Contact</span>
        <span>{`Email: ${props.cardData?.job?.contactEmail} | Phone: ${props.cardData?.job?.contactPhone}`}</span>
      </div>
      <hr />
      <div name="description-box">
        <h3>Description</h3>
        <p>{props.cardData?.job?.description}</p>
        <h3>About the Company</h3>
        <p>{props.cardData?.job?.organization?.description}</p>
      </div>
    </div>
  );
}

JobLargeView.propTypes = {
  onClickApply: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  checkProps: PropTypes.func,
  cardData: PropTypes.shape({
    job: PropTypes.shape({
      contactEmail: PropTypes.string.isRequired,
      contactPhone: PropTypes.string.isRequired,
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      dateCreated: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location: PropTypes.shape({
        city: PropTypes.string.isRequired,
        lineOne: PropTypes.string.isRequired,
        zip: PropTypes.string.isRequired,
        state: PropTypes.shape({
          col3: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      organization: PropTypes.shape({
        description: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      remoteStatus: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default JobLargeView;

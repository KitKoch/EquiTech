import React from "react";
import PropTypes from "prop-types";
import "./jobsearch.css";

const _logger = debug.extend("JobCard");

function JobCard(props) {
  const { job, selectedCardId, setCardIdState, currentUser } = props;

  _logger(props, selectedCardId);

  const calcDaysAgo = (dateCreated) => {
    let oneDay = 1000 * 60 * 60 * 24;
    let today = new Date();
    let msDifference = today.getTime() - Date.parse(dateCreated);

    return Math.round(msDifference / oneDay);
  };

  const daysAgo = calcDaysAgo(props.job.dateCreated);

  const applyClicked = () => {
    let jobId = job.id;
    _logger(currentUser, "currentUser from JobCard");
    props.onClickApply(jobId);
  };

  const onSelectCard = () => {
    props.passCardInfo(props);
    setCardIdState(() => {
      let updateCardId = job.id;
      _logger(updateCardId);
      return updateCardId;
    });
  };

  return (
    <div className="card text-dark bg-light-subtle border card-shadow card-transform">
      <div
        className={`card-body ${selectedCardId === job.id && "selected"}`}
        onClick={onSelectCard}
      >
        <div className="row">
          <div className="col-9 col-sm-9 col-md-9 col-lg-9 left-panel">
            <div className="row">
              <div name="logo-title-company-name">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <img
                      src={props.job?.organization?.logo}
                      className="job-card-logo-size-sm"
                      alt="company-logo"
                    />
                  </div>
                  <div className="ms-3">
                    <h3 className="flex-grow-1 card-title ml-3 fw-bold m-auto">
                      {props.job?.title}
                    </h3>
                    <h5 className="card-company-name fw-bolder m-auto">
                      {props.job?.organization?.name}
                    </h5>
                    <h5 className="fw-normal">{`${props.job?.location?.city}, ${props.job?.location?.state?.col3}`}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div name="show-large-view" className="row">
          <p name="card-job-description" className="card-text fst-normal">
            {props.job?.description?.slice(0, 250)}
            {props.job?.description?.length > 250 && "..."}
          </p>
          <div
            name="applyButton datePosted"
            className="d-flex justify-content-between"
          >
            <div>
              {daysAgo < 1
                ? "Just posted"
                : daysAgo === 1
                ? `${daysAgo} day ago`
                : daysAgo > 30
                ? `30+ days ago`
                : `${daysAgo} days ago`}
            </div>
            <button
              onClick={applyClicked}
              className="btn btn-primary btn-sm rounded mr-3"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

JobCard.propTypes = {
  selectedCardId: PropTypes.number,
  setCardIdState: PropTypes.func.isRequired,
  onClickApply: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
  passCardInfo: PropTypes.func,
  job: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    organization: PropTypes.shape({
      logo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      state: PropTypes.shape({
        col3: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
};

export default JobCard;

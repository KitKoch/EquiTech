import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import jobService from "../../services/jobService";
import JobLargeView from "./JobLargeView";
import JobFilters from "./JobFilters";
import JobLocationSearch from "./JobLocationSearch";
import PropTypes from "prop-types";
import toastr from "toastr";
import { Col, Row, Button, Form, InputGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import fairlyLogoWords from "../../assets/img/icons/fairlyBlackOnWhiteCropped.png";
import RegLogModal from "../users/RegLogModal";

const _logger = debug.extend("JobSearch");

function JobSearch({ currentUser }) {
  const [jobsPageData, setJobsPageData] = useState({
    jobsOrgArr: [],
    jobsNewArr: [],
    totalCount: [],
    jobCardData: {},
    toggleLargeView: false,
    pageIndex: 0,
    pageSize: 5,
    query: "",
    filterByJobType: null,
    queryByLocation: "",
    radius: 0,
    lat: "",
    long: "",
  });

  const [isShowingModal, setShowModal] = useState(false);

  const [selectedCardId, setSelectedCardId] = useState(0);

  const ref = useRef(null);

  const navigate = useNavigate();

  const onPageChange = (page) => {
    setJobsPageData((prevData) => {
      const pageData = { ...prevData };
      pageData.pageIndex = page - 1;
      _logger(jobsPageData.pageIndex);
      return pageData;
    });
  };

  useEffect(() => {
    if (jobsPageData.radius && jobsPageData.lat && jobsPageData.long) {
      _logger("useEffect for location/radius query");
      jobService
        .getJobsByLocation(
          jobsPageData.pageIndex,
          jobsPageData.pageSize,
          jobsPageData.lat,
          jobsPageData.long,
          jobsPageData.radius
        )
        .then(getJobsSuccess)
        .catch(getJobsError);
    } else if (jobsPageData.filterByJobType) {
      _logger("useEffect filterByType running");
      jobService
        .getJobsSearch(
          jobsPageData.pageIndex,
          jobsPageData.pageSize,
          jobsPageData.filterByJobType.label
        )
        .then(getJobsSuccess)
        .catch(getJobsError);
    } else if (jobsPageData.query) {
      _logger("useEffect jobquery with keywords running");
      jobService
        .getJobsSearch(
          jobsPageData.pageIndex,
          jobsPageData.pageSize,
          jobsPageData.query
        )
        .then(getJobsSuccess)
        .catch(getJobsError);
    } else {
      _logger("useEffect selectAll running");
      jobService
        .getJobsPaginated(jobsPageData.pageIndex, jobsPageData.pageSize)
        .then(getJobsSuccess)
        .catch(getJobsError);
    }
  }, [
    jobsPageData.pageIndex,
    jobsPageData.filterByJobType,
    currentUser.isLoggedIn,
    selectedCardId,
  ]);

  const getJobsSuccess = (data) => {
    _logger(data);
    let arrOfJobs = data.item.pagedItems;

    setJobsPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.jobsOrgArr = arrOfJobs;
      pageData.jobsNewArr = arrOfJobs.map(mapJobCard);
      pageData.totalCount = data.item.totalCount;

      return pageData;
    });
  };

  const getJobsError = (err) => {
    _logger(err);
    toastr.error(
      "Sorry! We didn’t find any jobs matching your criteria or search area. Please modify your search and try again."
    );
  };

  const passCardInfo = (jobData) => {
    let clickedCardData = jobData;
    setJobsPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.jobCardData = clickedCardData;
      pageData.toggleLargeView = true;

      return pageData;
    });
  };

  const onApplyRequest = (jobId) => {
    _logger(jobId);

    if (currentUser.isLoggedIn === true) {
      Swal.fire({
        imageUrl: fairlyLogoWords,
        imageHeight: 100,
        imageAlt: "Fairly Logo",
        title: "Redirecting to job application. Continue?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        customClass: {
          confirmButton: "job-search-swal-confirm-button mx-2",
          denyButton: "mx-2",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/jobs/${jobId}`);
        }
      });
    } else if (currentUser.isLoggedIn === false) {
      setShowModal(true);
    }
  };

  const mapJobCard = (aJob) => {
    _logger("mapping job card", currentUser, selectedCardId);
    return (
      <JobCard
        onClickApply={onApplyRequest}
        passCardInfo={passCardInfo}
        job={aJob}
        key={`jcm${aJob.id}_${currentUser?.id || 0}`}
        currentUser={currentUser}
        selectedCardId={selectedCardId}
        setCardIdState={setSelectedCardId}
      ></JobCard>
    );
  };

  const onJobQuery = () => {
    const initialIndex = 0;
    _logger(
      "onJobQuery clicked",
      { stateLat: jobsPageData.lat },
      { stateLong: jobsPageData.long },
      { stateRadius: jobsPageData.radius },
      { pageIndex: jobsPageData.pageIndex }
    );
    if (jobsPageData.lat && jobsPageData.long && jobsPageData.radius > 0) {
      _logger("searching by location");
      jobService
        .getJobsByLocation(
          initialIndex,
          jobsPageData.pageSize,
          jobsPageData.lat,
          jobsPageData.long,
          jobsPageData.radius
        )
        .then((response) => getByLocationSuccess(response))
        .catch(getJobsError);
    } else {
      _logger("Search Query running");
      jobService
        .getJobsSearch(initialIndex, jobsPageData.pageSize, jobsPageData.query)
        .then((response) => onSearchSuccess(response))
        .catch(getJobsError);
    }
  };

  const onReset = () => {
    _logger("default search, page reset");
    jobService
      .getJobsPaginated(jobsPageData.pageIndex, jobsPageData.pageSize)
      .then(getJobsSuccess)
      .catch(getJobsError);

    const initialValue = 0;

    setJobsPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.pageIndex = initialValue;
      pageData.filterByJobType = null;
      pageData.query = "";
      pageData.queryByLocation = "";
      pageData.radius = initialValue;
      pageData.lat = "";
      pageData.long = "";
      ref.current.value = "";

      return pageData;
    });
  };

  const getByLocationSuccess = (data) => {
    _logger(data, jobsPageData);
    let jobQuery = data.item.pagedItems;
    const resetPageIndex = 0;
    setJobsPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.jobsNewArr = jobQuery.map(mapJobCard);
      pageData.totalCount = data.item.totalCount;
      pageData.pageIndex = resetPageIndex;
      pageData.filterByJobType = null;
      pageData.query = "";

      return pageData;
    });
  };

  const onSearchSuccess = (data) => {
    _logger(data);
    let jobQuery = data.item.pagedItems;
    const initialValue = 0;
    setJobsPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.jobsNewArr = jobQuery.map(mapJobCard);
      pageData.totalCount = data.item.totalCount;
      pageData.pageIndex = initialValue;
      pageData.filterByJobType = null;
      pageData.radius = initialValue;

      return pageData;
    });
  };

  const filterByJobType = (value) => {
    _logger(value);
    const initialValue = 0;
    setJobsPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.query = "";
      pageData.pageIndex = initialValue;
      pageData.queryByLocation = "";
      pageData.radius = initialValue;
      pageData.lat = "";
      pageData.long = "";
      pageData.filterByJobType = value;
      ref.current.value = "";

      return pageData;
    });
  };

  const RADIUS_OPTIONS = [
    { label: "Within 5 miles", value: 5 },
    { label: "Within 10 miles", value: 10 },
    { label: "Within 25 miles", value: 25 },
    { label: "Within 50 miles", value: 50 },
    { label: "Within 100 miles", value: 100 },
  ];

  const mapRadius = (radius) => {
    return (
      <option value={radius.value} key={`radius_${radius.value}`}>
        {radius.label}
      </option>
    );
  };

  const onRadiusChange = (event) => {
    const selectValue = event.target.value;
    _logger(selectValue);
    setJobsPageData((prevState) => {
      const selectRadiusValue = {
        ...prevState,
      };
      selectRadiusValue.radius = selectValue;

      return selectRadiusValue;
    });
  };

  const onSearchJobsChange = (event) => {
    const target = event.target;
    const inputValue = target.value;
    const nameOfField = target.name;
    setJobsPageData((prevState) => {
      const searchQueryData = {
        ...prevState,
      };

      searchQueryData[nameOfField] = inputValue;

      return searchQueryData;
    });
  };

  return (
    <div className="container">
      <RegLogModal
        isShowingModal={isShowingModal}
        setShowModal={setShowModal}
      />
      <div name="searchToolBarComponent">
        <h1 name="search-label">Search For Jobs</h1>
        <Row size="lg" className="mb-3">
          <Col lg="4">
            <InputGroup>
              <InputGroup.Text>By Keywords</InputGroup.Text>
              <Form.Control
                type="text"
                name="query"
                placeholder="Job Title or Keyword"
                className="form-control me-1 rounded"
                value={jobsPageData.query}
                size="lg"
                onChange={onSearchJobsChange}
              />
            </InputGroup>
          </Col>
          <Col lg="8">
            <InputGroup>
              <InputGroup.Text>By Location</InputGroup.Text>
              <Col lg="4">
                <JobLocationSearch
                  setJobsPageData={setJobsPageData}
                  inputValue={ref}
                ></JobLocationSearch>
              </Col>
              <Col lg="3">
                <Form.Select
                  component="select"
                  name="radius"
                  className="form-control rounded"
                  onChange={onRadiusChange}
                  size="lg"
                  value={jobsPageData.radius}
                >
                  <option value="">Any Distance</option>
                  {RADIUS_OPTIONS.map(mapRadius)}
                </Form.Select>
              </Col>
              <Button
                variant="primary"
                className="ms-1 rounded"
                type="submit"
                onClick={onJobQuery}
                size="lg"
              >
                Search
              </Button>
              <Button
                variant="warning"
                className="ms-1 rounded"
                type="submit"
                onClick={onReset}
                size="lg"
              >
                Reset
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <JobFilters
          filterByJobType={filterByJobType}
          filterSelection={jobsPageData.filterByJobType}
        ></JobFilters>
      </div>
      <div className="row">
        <div name="cards-results" className="col">
          <Pagination
            className="mb-2"
            onChange={onPageChange}
            pageSize={jobsPageData.pageSize}
            current={jobsPageData.pageIndex + 1}
            total={jobsPageData.totalCount}
          />
          {jobsPageData.jobsNewArr}
        </div>
        {jobsPageData.toggleLargeView === true ? (
          <JobLargeView
            cardData={jobsPageData.jobCardData}
            currentUser={currentUser}
            onClickApply={onApplyRequest}
          />
        ) : (
          <div name="large-view" className="col text-center">
            <div>
              <h1 className="font-weight-bold mt-6">
                We have found thousands of jobs that Fairly match you!
              </h1>
              <p className="font-weight-bold mt-5">
                Click your results on the left to display here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

JobSearch.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }).isRequired,
};

export default JobSearch;

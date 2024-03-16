import React, { useState, useEffect } from "react";
import jobLinksService from "../../services/jobLinks";
import { Card, Table } from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import JobLinksCard from "./JobLinksCard";
import PropTypes from "prop-types";

const _logger = debug.extend("JobLinks");

_logger("test log");

const JobLinks = ({ currentUser }) => {
  const [jobState, setJobState] = useState({
    jobLinks: {
      jobLinksList: [],
      mappedJobLinks: [],
    },
    currentPage: {
      pageIndex: 0,
      pageSize: 5,
      totalCount: 0,
    },
  });

  useEffect(() => {
    jobLinksService
      .getJobLinksByOrgId(
        jobState.currentPage.pageIndex,
        jobState.currentPage.pageSize,
        currentUser.organizationId
      )
      .then(onGetJobLinkSuccess)
      .catch(onGetJobLinkError);
  }, [
    jobState.currentPage.pageIndex,
    jobState.currentPage.pageSize,
    currentUser.organizationId,
  ]);

  const onGetJobLinkSuccess = (response) => {
    _logger("onGetJobLinkSuccess", response);
    let jobLinkArray = response.item.pagedItems;

    setJobState((prevState) => ({
      ...prevState,
      jobLinks: {
        ...prevState.jobLinks,
        jobLinksList: jobLinkArray,
        mappedJobLinks: jobLinkArray.map(mapJobLinks),
      },
      currentPage: {
        ...prevState.currentPage,
        totalCount: response.item.totalCount,
      },
    }));
  };

  const onGetJobLinkError = (error) => {
    _logger(error.message);
  };

  const mapJobLinks = (jobLink) => (
    <JobLinksCard jobLink={jobLink} key={jobLink.id} />
  );

  const onPageChange = (e) => {
    setJobState((prevState) => ({
      ...prevState,
      currentPage: {
        ...prevState.currentPage,
        pageIndex: e - 1,
      },
    }));
  };

  return (
    <div className="col-xl-12">
      <Card className="border">
        <Card.Header>
          <Card.Title>
            <h6>Job Links</h6>
          </Card.Title>
        </Card.Header>
        <Table bordered>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Touch Counter</th>
              <th>Complete Counter</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{jobState.jobLinks.mappedJobLinks}</tbody>
        </Table>
      </Card>
      <Pagination
        className="ant-pagination"
        onChange={onPageChange}
        current={jobState.currentPage.pageIndex + 1}
        total={jobState.currentPage.totalCount}
        locale={locale}
        pageSize={jobState.currentPage.pageSize}
      />
    </div>
  );
};

JobLinks.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    organizationId: PropTypes.number.isRequired,
  }),
};

export default JobLinks;

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import jobService from "../../../services/jobService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";
import { Search } from "react-feather";

import OrganizationDashBlogs from "./OrganizationDashBlogs";
import OrganizationCard from "./OrganizationCard";
import OrganizationStaffs from "./OrganizationStaffs";
import StatusChart from "./StatusChart";
import Appointments from "./Appointments";
import ApplicationTableRow from "./ApplicationTableRow";

const _logger = logger.extend("HomeDash");

const defaultData = {
  arrayOfApps: [],
  appComponents: [],
  pageIndex: 1,
  pageSize: 5,
  totalCount: 0,
  searchedView: false,
  query: "",
  statusCount: {
    offered: 0,
    accepted: 0,
    negotiation: 0,
    pending: 0,
    employed: 0,
    rejected: 0,
  },
  currentDate: new Date(),
};
function HomeDash({ currentUser }) {
  const [apps, setApps] = useState(defaultData);

  const state = useLocation();
  _logger(state, "user");
  _logger(currentUser, "currentUser");

  useEffect(() => {
    fetchApps();
  }, [apps.pageIndex]);

  const fetchApps = () => {
    jobService
      .getJobAppByOrgId(
        apps.pageIndex - 1,
        apps.pageSize,
        currentUser.organizationId
      )
      .then(onGetJobAppByOrgIdSuccess)
      .catch(onGetJobAppByOrgIdError);
  };

  const onGetJobAppByOrgIdSuccess = (response) => {
    _logger("Get Job Applications By OrgId Success", response.item);
    const result = response.item;
    const returnedArray = response.item.pagedItems;
    setApps((prevApps) => {
      const newApps = { ...prevApps };
      newApps.arrayOfApps = returnedArray;
      newApps.appComponents = returnedArray.map(mapApp);
      newApps.totalCount = result.totalCount;
      newApps.pageIndex = result.pageIndex + 1;
      newApps.statusCount.accepted = result.pagedItems[0].acceptedStatusCount;
      newApps.statusCount.pending = result.pagedItems[0].pendingStatusCount;
      newApps.statusCount.rejected = result.pagedItems[0].rejectedStatusCount;
      newApps.statusCount.offered = result.pagedItems[0].offeredStatusCount;
      newApps.statusCount.negotiation =
        result.pagedItems[0].negotiationStatusCount;
      newApps.statusCount.employed = result.pagedItems[0].employedStatusCount;
      return newApps;
    });
  };

  const onGetJobAppByOrgIdError = (error) => {
    _logger("Get Job Applications By OrgId Error", error);
    toastr.error("Unable to Get Job Applications");
  };

  const mapApp = (app) => {
    return <ApplicationTableRow app={app} key={app.id} />;
  };

  const onChange = (pageNumber) => {
    _logger("ApplicationTrack is running");
    setApps((prevData) => {
      const pd = { ...prevData };
      pd.pageIndex = pageNumber;
      return pd;
    });
  };

  const calculateDays = (targetDate) => {
    const timeDiff =
      apps.currentDate.getTime() - new Date(targetDate).getTime();
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    return days;
  };

  const calculateMonths = (targetDate) => {
    const months =
      (apps.currentDate.getFullYear() - new Date(targetDate).getFullYear()) *
        12 +
      (apps.currentDate.getMonth() - new Date(targetDate).getMonth());
    return months;
  };

  const checkDate = (targetDate) => {
    const dayResult = calculateDays(targetDate);
    const monthResult = calculateMonths(targetDate);
    if (dayResult > 1 && dayResult <= 30) {
      return `${dayResult} days ago`;
    } else if (dayResult <= 1) {
      return `Today`;
    } else if (dayResult > 30 && monthResult <= 1) {
      return `1 month ago`;
    } else if (dayResult > 30 && monthResult > 1 && monthResult <= 12) {
      return `${monthResult} months ago`;
    } else if (dayResult > 30 && monthResult > 12) {
      return new Date(targetDate);
    }
  };

  const searchOnChange = (event) => {
    const target = event.target;
    const inputValue = target.value;
    const nameOfField = target.name;
    setApps((prevState) => {
      const newState = {
        ...prevState,
      };
      newState[nameOfField] = inputValue;
      return newState;
    });
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    jobService
      .searchApplicationsByOrg(
        0,
        apps.pageSize,
        currentUser.organizationId,
        apps.query
      )
      .then(onSearchAppointmentsByOrgSuccess)
      .catch(onSearchAppointmentsByOrgError);
  };

  const onSearchAppointmentsByOrgSuccess = (response) => {
    _logger("Search Success", response);
    const searchedAppointmentsArray = response.item.pagedItems;
    setApps((prevState) => {
      const newState = { ...prevState };
      newState.arrayOfApps = searchedAppointmentsArray;
      newState.appComponents = searchedAppointmentsArray.map(mapApp);
      newState.totalCount = response.item.totalCount;
      newState.searchedView = true;
      return newState;
    });
  };

  const onSearchAppointmentsByOrgError = (error) => {
    _logger("Search Failed", error);
    toastr.error("Unable To Search");
  };

  const resetApplication = () => {
    setApps(defaultData);
    fetchApps();
  };

  return (
    <React.Fragment>
      <Helmet title="Home Dashboard" />
      <Container className="p-0">
        <h2>My Organization</h2>
        <Row>
          <Col sm={8}>
            <Row>
              <Col sm={12}>
                <Card className="flex-fill w-100">
                  <Card.Header>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <Card.Title className="mb-0">
                          Applicant Tracking{"  "}
                          {apps.searchedView && (
                            <Button type="submit" onClick={resetApplication}>
                              Reset
                            </Button>
                          )}
                        </Card.Title>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1 me-5">
                          <InputGroup className="my-3">
                            <Form.Control
                              type="text"
                              placeholder="Search..."
                              name="query"
                              value={apps.query}
                              onChange={searchOnChange}
                            />
                            <InputGroup.Text>
                              <Button
                                variant="none"
                                type="submit"
                                onClick={onSubmitSearch}
                              >
                                <Search size={18} />
                              </Button>
                            </InputGroup.Text>
                          </InputGroup>
                        </div>
                        <div className="card-actions float-end">
                          <Pagination
                            align="end"
                            className="text-center"
                            onChange={onChange}
                            pageSize={apps.pageSize}
                            current={apps.pageIndex}
                            locale={locale}
                            total={apps.totalCount}
                          />
                        </div>
                      </div>
                    </div>
                  </Card.Header>
                  <Table striped className="my-0">
                    <thead>
                      <tr>
                        <th className="text-center">Position</th>
                        <th className="d-none d-xl-table-cell text-center">
                          Start Date
                        </th>
                        <th className="d-none d-xl-table-cell text-center">
                          End Date
                        </th>
                        <th className="text-center">Status</th>
                        <th className="d-none d-md-table-cell text-center">
                          Applicant
                        </th>
                        <th className="d-none d-md-table-cell text-center">
                          Contact
                        </th>
                      </tr>
                    </thead>
                    <tbody>{apps.appComponents}</tbody>
                  </Table>
                </Card>
              </Col>
              <Col sm={12}>
                <StatusChart appStatus={apps.statusCount} />
              </Col>
              <Col sm={12}>
                <Appointments user={currentUser} checkDate={checkDate} />
              </Col>
            </Row>
          </Col>
          <Col sm={4}>
            <OrganizationCard user={currentUser} />
            <OrganizationStaffs user={currentUser} />
            <OrganizationDashBlogs checkDate={checkDate} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

HomeDash.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    organizationId: PropTypes.number.isRequired,
  }),
};

export default HomeDash;

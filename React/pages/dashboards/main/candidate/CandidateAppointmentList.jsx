import React, { useState, useEffect } from "react";
import appointmentsService from "../../../../services/appointmentService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";
import { Table, Card, Col, Container, Row } from "react-bootstrap";
import CandidateAppointment from "./CandidateAppointment";
import PropTypes from "prop-types";
import "./candidateappointmentlist.css";

const _logger = debug.extend("CandidateAppointmentList");

const CandidateAppointmentList = (props) => {
  const userRole = props.currentUser.roles;
  _logger("WHO IS THIS USER?", userRole);

  const [order, setOrder] = useState("ASC");
  const [pageData, setPageData] = useState({
    apptsArr: [],
    apptsComponent: [],
    currentPage: 1,
    pageIndex: 0,
    pageSize: 3,
    clientId: 6,
    totalAppointments: 0,
  });

  useEffect(() => {
    _logger("firing up appointments");

    appointmentsService
      .getAppointments(pageData.pageIndex, pageData.pageSize, pageData.clientId)
      .then(onGetAppointmentsSuccess)
      .catch(onGetAppointmentsError);
  }, [pageData.pageIndex]);

  const onGetAppointmentsSuccess = (response) => {
    _logger("onGetAppointmentsSuccess", response);

    setPageData((prevState) => {
      const updatedState = { ...prevState };

      let appointments = response.item.pagedItems;
      updatedState.apptsArr = appointments;
      updatedState.apptsComponent = updatedState.apptsArr.map(mapAppointment);

      return updatedState;
    });

    setPageData((prevState) => {
      const newSt = { ...prevState };

      newSt.totalAppointments = response.item.totalCount;
      return newSt;
    });
  };

  const onChangePage = (currentPage) => {
    _logger("onChangePage");
    setPageData((prevState) => {
      return { ...prevState, pageIndex: currentPage - 1 };
    });
  };

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = pageData.apptsArr.sort((dateTimeNew, dateTimeOld) =>
        dateTimeOld[col] > dateTimeNew[col] ? 1 : -1
      );
      setPageData((prevState) => {
        const updatedState = { ...prevState };

        updatedState.apptsComponent = sorted.map(mapAppointment);

        return updatedState;
      });
      setOrder("DESC");
    }
    if (order === "DESC") {
      const sorted = pageData.apptsArr.sort((dateTimeNew, dateTimeOld) =>
        dateTimeOld[col] < dateTimeNew[col] ? 1 : -1
      );
      setPageData((prevState) => {
        const updatedState = { ...prevState };

        updatedState.apptsComponent = sorted.map(mapAppointment);

        return updatedState;
      });
      setOrder("ASC");
    }
  };

  const onGetAppointmentsError = (error) => {
    _logger("onGetAppointmentsError", error);
    toastr.error("Unable to load appointments. Please try again later.");
  };

  const mapAppointment = (anAppointment) => {
    _logger(anAppointment);
    return (
      <CandidateAppointment
        key={"List-A" + anAppointment.id}
        appointment={anAppointment}
      />
    );
  };

  return (
    <div className="profile-outer-container">
      <div className="card-main candidateappoint">
        <div className="profile-user-info-parent-container">
          <div className="profile-card-header-user-info-container">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0">Appointments Info</Card.Title>
              </Card.Header>
              <Card.Body>
                <Container fluid>
                  <Row>
                    <Col md={12}>
                      <div className="user-settings-form">
                        <div className="name-info">
                          <div />
                          <div className="table-responsive">
                            <Table variant="light" className="table-fill">
                              <thead>
                                <tr>
                                  <th className="text-md-center">Name</th>
                                  <th className="text-md-center">Type</th>
                                  <th className="text-md-center">Status</th>
                                  <th className="text-md-center">Location</th>
                                  <th className="text-md-center">Date</th>
                                  <th
                                    onClick={() => sorting("appointmentStart")}
                                    className="text-md-center"
                                  >
                                    Start Time
                                  </th>
                                </tr>
                              </thead>
                              <tbody>{pageData.apptsComponent}</tbody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row></Row>
                </Container>
                <Col md={12}>
                  <Pagination
                    onChange={onChangePage}
                    current={pageData.pageIndex + 1}
                    pageSize={pageData.pageSize}
                    total={pageData.totalAppointments}
                    locale={locale}
                  />
                </Col>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

CandidateAppointmentList.propTypes = {
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string]))
      .isRequired,
  }).isRequired,
};

export default CandidateAppointmentList;

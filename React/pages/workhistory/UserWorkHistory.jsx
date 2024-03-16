import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import WorkHistoryByUserId from "../../components/workhistory/WorkHistoryByUserList.jsx";
import WorkPositionForm from "../../components/workhistory/WorkPositionForm.jsx";
import WorkHistoryForm from "../../components/workhistory/WorkHistoryForm.jsx";
import { Helmet } from "react-helmet-async";

const _logger = sabioDebug.extend("userWorkHistory");

const UserWorkHistory = () => {
  _logger("Display");
  const [pageData, setPageData] = useState({
    showId: 1,
    button1: "+ Create",
    component: [],
    workHistoryId: 0,
    companyName: "",
    companyContact: "",
    companyEmail: "",
    companyPhone: "",
    locationId: 0,
    industryId: 0,
    startDate: new Date(),
    endDate: new Date(),
    workPositionId: 0,
    name: "",
    description: "",
    wageTypeId: 0,
    jobTypeId: 0,
  });

  useEffect(() => {
    if (pageData.showId === 1) {
      setPageData((prevState) => {
        const newState = { ...prevState };
        newState.component = (
          <WorkHistoryByUserId setParentState={setPageData} />
        );
        newState.button1 = "+ Create";
        return newState;
      });
    } else if (pageData.showId === 2) {
      setPageData((prevState) => {
        const newState = { ...prevState };
        newState.component = (
          <WorkHistoryForm
            parentState={pageData}
            setParentState={setPageData}
          />
        );
        newState.button1 = "Display Work History";
        return newState;
      });
    } else if (pageData.showId === 3) {
      setPageData((prevState) => {
        const newState = { ...prevState };
        newState.component = (
          <WorkPositionForm
            parentState={pageData}
            setParentState={setPageData}
          />
        );
        newState.button1 = "Display Work History";
        return newState;
      });
    }
  }, [pageData.showId]);

  const createWH = () => {
    if (pageData.showId !== 1) {
      setPageData((prevState) => {
        const newState = { ...prevState };
        newState.showId = 1;
        newState.button1 = "+ Create";
        return newState;
      });
    } else if (pageData.showId !== 2) {
      setPageData((prevState) => {
        const newState = { ...prevState };
        newState.showId = 2;
        newState.button1 = "Display Work History";
        newState.workHistoryId = 0;
        newState.companyName = "";
        newState.companyContact = "";
        newState.companyEmail = "";
        newState.companyPhone = "";
        newState.locationId = 0;
        newState.industryId = 0;
        newState.startDate = new Date();
        newState.endDate = new Date();
        return newState;
      });
    }
  };

  return (
    <React.Fragment>
      <Helmet title="Work History" />
      <Container className="p-0 mt-6">
        <Row className="justify-content-md-center p-2">
          <Col md="auto">
            <h1>Work History</h1>
            <div className="text-muted fs-lg">
              Company-level work history describing position specific duties and
              resposibilities.
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center p-2">
          <Col md="auto">
            <Button onClick={createWH}>{pageData.button1}</Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">{pageData.component}</Row>
      </Container>
    </React.Fragment>
  );
};

export default UserWorkHistory;

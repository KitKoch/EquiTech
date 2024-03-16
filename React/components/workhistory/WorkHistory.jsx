import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Container, Col, Row, Button } from "react-bootstrap";
import WorkPosition from "./WorkPosition";
import { simpleDate } from "../../utils/dateFormater.js";

const _logger = sabioDebug.extend("workhistory");

export default function WorkHistory(props) {
  _logger("WorkHistory", props);
  const [pageData, setPageData] = useState({
    arrayData: [],
    components: [],
    element: props.wh,
  });

  useEffect(() => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.arrayData = props.wh?.workPositions;
      newState.components = props.wh.workPositions?.map(listMappingFunction);
      return newState;
    });
  }, [props]);

  const editWH = (e) => {
    e.preventDefault();
    props.setGrandParentState((prevState) => {
      const newState = { ...prevState };
      newState.workHistoryId = props.wh.id;
      newState.companyName = props.wh.companyName;
      newState.companyContact = props.wh.companyContact;
      newState.companyEmail = props.wh.companyEmail;
      newState.companyPhone = props.wh.companyPhone;
      newState.locationId = props.wh.locationId;
      newState.industryId = props.wh.industry.id;
      newState.startDate = new Date(simpleDate(props.wh.startDate));
      newState.endDate = new Date(simpleDate(props.wh.endDate));
      newState.showId = 2;
      newState.button1 = "Display Work History";
      return newState;
    });
  };

  const addWP = (e) => {
    e.preventDefault();
    props.setGrandParentState((prevState) => {
      const newState = { ...prevState };
      newState.workHistoryId = props.wh.id;
      newState.companyName = props.wh.companyName;
      newState.companyContact = props.wh.companyContact;
      newState.companyEmail = props.wh.companyEmail;
      newState.companyPhone = props.wh.companyPhone;
      newState.locationId = props.wh.locationId;
      newState.industryId = props.wh.industry.id;
      newState.startDate = new Date(simpleDate(props.wh.startDate));
      newState.endDate = new Date(simpleDate(props.wh.endDate));
      newState.workPositionId = 0;
      newState.name = "";
      newState.description = "";
      newState.wageTypeId = 0;
      newState.jobTypeId = 0;
      newState.showId = 3;
      newState.button1 = "Display Work History";
      return newState;
    });
  };

  const listMappingFunction = (element) => {
    return (
      <Row
        key={"work position id..." + element.id}
        className="justify-content-md-center"
      >
        <WorkPosition
          wp={element}
          setGrandGrandParentState={props.setGrandParentState}
        />
      </Row>
    );
  };

  const displayCards = () => {
    return (
      <Container fluid className="p-0">
        {pageData.components}
      </Container>
    );
  };

  return (
    <Card className="m-1 card h-300">
      <Card.Body>
        <Card.Title>{pageData.element?.companyName}</Card.Title>
        <Card.Subtitle>
          {pageData.element?.industry.name}
          <br />
          {simpleDate(pageData.element?.startDate)}
          {" - "}
          {simpleDate(pageData.element?.endDate)}
        </Card.Subtitle>
        <Card.Text>
          {pageData.element?.companyContact}
          <br />
          {pageData.element?.companyEmail}
          <br />
          {pageData.element?.companyPhone} {pageData.element?.location.city}
        </Card.Text>
        <Container>{displayCards()}</Container>
        <Container>
          <Row className="justify-content-md-center p-2">
            <Col md="auto">
              <Button onClick={editWH}>Edit</Button>
            </Col>{" "}
            <Col md="auto">
              <Button onClick={addWP}>Create Position</Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

WorkHistory.propTypes = {
  wh: PropTypes.shape({
    id: PropTypes.number.isRequired,
    companyName: PropTypes.string.isRequired,
    companyContact: PropTypes.string.isRequired,
    companyEmail: PropTypes.string.isRequired,
    companyPhone: PropTypes.string.isRequired,
    locationId: PropTypes.number.isRequired,
    location: PropTypes.shape({
      lineOne: PropTypes.string.isRequired,
      lineTwo: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }).isRequired,
    userId: PropTypes.number.isRequired,
    industry: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    workPositions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        workHistoryId: PropTypes.number.isRequired,
        wageType: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
        jobType: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }),
        dateCreated: PropTypes.string.isRequired,
        dateModified: PropTypes.string.isRequired,
      })
    ),
  }),
  setGrandParentState: PropTypes.func,
};

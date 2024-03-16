import React from "react";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import usersEducationService from "../../services/userEducationService";
import Toastr from "toastr";

const _cardLogger = debug.extend("EducationLevel");
function UsersEducationList() {
  const [educationData, setEducationData] = useState({
    arrayOfRecords: [],
    arrayOfComponents: [],
    pageIndex: 1,
    pageSize: 5,
    total: 0,
  });

  useEffect(() => {
    usersEducationService
      .getByCreatedBy(educationData.pageIndex - 1, educationData.pageSize)
      .then(onGetPagedSuccess)
      .catch(onGetPagedError);
  }, [educationData.pageIndex]);

  const onGetPagedSuccess = (response) => {
    const allRecords = response.item.pagedItems;
    _cardLogger("SUCCESS: onGetPagedSuccess", allRecords);

    setEducationData((prevState) => {
      const newState = { ...prevState };
      newState.total = response.item.totalCount;
      newState.arrayOfRecords = allRecords;
      newState.arrayOfComponents = allRecords.map(mapAccordionRecords);
      return newState;
    });
  };
  const onGetPagedError = (error) => {
    _cardLogger("ERROR: onGetPagedError", error);
    Toastr.warning(
      "There's been a problem. Please, try again in a few minutes :)"
    );
  };

  const mapAccordionRecords = (record) => {
    if (record.endDate === "") {
      record.endDate = "Ongoing";
      const newStartDate = record.startDate.split("T");
      record.startDate = newStartDate[0];
    } else {
      const newStartDate = record.startDate.split("T");
      record.startDate = newStartDate[0];
      const newEndDate = record.endDate.split("T");
      record.endDate = newEndDate[0];
    }

    return (
      <Accordion.Item key={record.id} eventKey={`${record.id}`}>
        <Accordion.Header>
          {record.degree.name
            ? `${record.educationLevel.name}: ${record.degree.name}`
            : `${record.educationLevel.name}`}
        </Accordion.Header>
        <Accordion.Body>
          <Card id={record.id}>
            <Card.Header>
              <Card.Title className="text-center mt-4">
                <ListGroup.Item>
                  {record.degree.name
                    ? `Degree: ${record.degree.name}`
                    : `Education Level: ${record.educationLevel.name}`}
                </ListGroup.Item>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                {record.degree.name && (
                  <ListGroup.Item>
                    Education Level: {record.educationLevel.name}
                  </ListGroup.Item>
                )}
                {record.school.name && (
                  <ListGroup.Item>School: {record.school.name}</ListGroup.Item>
                )}
                <ListGroup.Item>
                  Starting Date: {record.startDate}
                </ListGroup.Item>
                <ListGroup.Item>Ending Date: {record.endDate}</ListGroup.Item>
                {record.description && (
                  <ListGroup.Item>
                    Description: {record.description}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Accordion.Body>
      </Accordion.Item>
    );
  };
  const onPaginationChange = (page) => {
    _cardLogger("Page number: ", page);
    setEducationData((prevState) => {
      const newData = { ...prevState };
      newData.pageIndex = page;
      return newData;
    });
  };
  return (
    <React.Fragment>
      <Container className="mt-5">
        <Row className="mt-5">
          <Col>
            <Accordion flush>{educationData.arrayOfComponents}</Accordion>
            <Row className="text-center">
              <Pagination
                current={educationData.pageIndex}
                total={educationData.total}
                pageSize={educationData.pageSize}
                onChange={onPaginationChange}
                className="pagination-center"
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default UsersEducationList;

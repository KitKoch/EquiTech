import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import surveyAnswerService from "../../../services/surveyAnswersService";
import SurveyAnswersTableRow from "./SurveyAnswersTableRow";
import toastr from "toastr";

const _logger = debug.extend("SurveyAnswers");

function SurveyAnswers() {
  const [pageData, setPageData] = useState({
    data: [],
    componenets: [],
    currentPage: 1,
    pageIndex: 0,
    pageSize: 15,
    totalCount: 0,
  });

  const getData = () => {
    surveyAnswerService
      .getSurveyAnswers(pageData.pageIndex, pageData.pageSize)
      .then(getPaginatedSuccess)
      .catch(getPaginatedError);
  };
  useEffect(() => {
    getData();
  }, [pageData.currentPage]);

  const singleMappingFunction = (element) => {
    return (
      <SurveyAnswersTableRow
        survey={element}
        key={`Survey Answer Row` + element.surveyAnswerId}
      />
    );
  };

  const onPagination = (page) => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.currentPage = page;
      newState.pageIndex = page - 1;
      return newState;
    });
  };

  const getPaginatedSuccess = (data) => {
    _logger(data);
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.data = data.item.pagedItems;
      newState.componenets = data.item.pagedItems.map(singleMappingFunction);
      newState.totalCount = data.item.totalCount;
      return newState;
    });
  };

  const getPaginatedError = (error) => {
    toastr.error(
      "There was an error retrieving survey information, please refresh page and try again.",
      error
    );
  };

  function displayTable() {
    return (
      <Table striped className="text-center">
        <thead>
          <tr>
            <th>Survey Id</th>
            <th>Survey Instance Id</th>
            <th>Answered By</th>
            <th>Date Answered</th>
          </tr>
        </thead>
        <tbody>{pageData.componenets}</tbody>
      </Table>
    );
  }

  return (
    <React.Fragment>
      <Helmet title="Tables" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Survey Answers Dashboard</h1>
        <Row>
          <Col xl="6" lg="6" md="10" sm="10" xs="10" className="w-100">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Survey Answers Paginated</Card.Title>
                  <h6 className="card-subtitle text-muted">
                    Displayed table of survey answers
                  </h6>
                </div>
              </Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Pagination
                      className="d-flex justify-content-center"
                      onChange={onPagination}
                      current={pageData.currentPage}
                      total={pageData.totalCount}
                      locale={locale}
                      pageSize={pageData.pageSize}
                    />
                  </Row>
                  <Row>{displayTable()}</Row>
                  <Row>
                    <Pagination
                      className="d-flex justify-content-center"
                      onChange={onPagination}
                      current={pageData.currentPage}
                      total={pageData.totalCount}
                      locale={locale}
                      pageSize={pageData.pageSize}
                    />
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default SurveyAnswers;

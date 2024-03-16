import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import * as subServices from "../../../services/newslettersSubService.js";
import SubscriptionsTableRow from "./SubscriptionsTableRow.jsx";
import toastr from "toastr";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const _logger = debug.extend("Subscriptions");

function Subscriptions() {
  const [pageData, setPageData] = useState({
    ArrayData: [],
    Componenets: [],
    filterMode: 5,
    currentPage: 1,
    pageIndex: 0,
    pageSize: 25,
    totalCount: 0,
  });

  useEffect(() => {
    getData(pageData.filterMode, pageData.currentPage - 1);
  }, [pageData.filterMode, pageData.currentPage]);

  const getData = (filterMode, pageIndex) => {
    subServices
      .getPaginated(filterMode, pageIndex, pageData.pageSize)
      .then(getPaginatedSuccess)
      .catch(getPaginatedError);
  };

  const singleMappingFunction = (element) => {
    return (
      <SubscriptionsTableRow
        subscription={element}
        key={`row for ` + element.email}
        statusChange={statusChange}
      />
    );
  };

  const clickFilter = (e) => {
    _logger("filter value", e.target.value);
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.filterMode = parseInt(e.target.value);
      newState.currentPage = 1;
      newState.pageIndex = 0;
      return newState;
    });
  };

  const statusChange = (subscription) => {
    subServices
      .edit(subscription)
      .then(statusChangeSuccess)
      .catch(statusChangeError);
  };

  const onPagination = (page) => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.currentPage = page;
      newState.pageIndex = page - 1;
      return newState;
    });
  };

  const statusChangeSuccess = () => {
    getData(pageData.filterMode, pageData.pageIndex);
  };

  const statusChangeError = () => {
    toastr.error(
      "There was an error attempting to edit the newsletter subscription data.",
      error
    );
  };

  const getPaginatedSuccess = (data) => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.ArrayData = data.item.pagedItems;
      newState.Componenets = data.item.pagedItems.map(singleMappingFunction);
      newState.totalCount = data.item.totalCount;
      return newState;
    });
    displayTable();
  };

  const getPaginatedError = (error) => {
    toastr.error(
      "There was an error attempting to get paginated newsletter subscription data.",
      error
    );
  };

  const displayTable = () => {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Email</th>
            <th>Date of Subscription</th>
            <th>Subscription Status</th>
          </tr>
        </thead>
        <tbody>{pageData.Componenets}</tbody>
      </Table>
    );
  };

  return (
    <React.Fragment>
      <Helmet title="Tables" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Newsletter Subscriptions Dashboard</h1>
        <Row>
          <Col xl="6" lg="6" md="10" sm="10" xs="10" className="w-100">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>Newsletter Subscriptions Paginated</Card.Title>
                  <h6 className="card-subtitle text-muted">
                    Displayed table of emails in the newsletter subscriptions
                    database
                  </h6>
                </div>
                <ButtonGroup aria-label="Filtering Options">
                  <Button
                    value={5}
                    variant={pageData.filterMode % 5 ? "outline-dark" : "dark"}
                    onClick={clickFilter}
                  >
                    All
                  </Button>
                  <Button
                    value={2}
                    variant={pageData.filterMode % 2 ? "outline-dark" : "dark"}
                    onClick={clickFilter}
                  >
                    Subscribed
                  </Button>
                  <Button
                    value={3}
                    variant={pageData.filterMode % 3 ? "outline-dark" : "dark"}
                    onClick={clickFilter}
                  >
                    Unsubscribed
                  </Button>
                </ButtonGroup>
              </Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Pagination
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

export default Subscriptions;

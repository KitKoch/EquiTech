import React, { useState, useEffect } from "react";
import organizationServices from "../../services/organizationService";
import * as lookUpService from "../../services/lookUpService";
import OrganizationAdminCard from "./OrganizationsAdminCard";
import { useNavigate } from "react-router-dom";
import {
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Row,
  Col,
  Container,
  Form,
  Breadcrumb,
  Table,
  Card,
} from "react-bootstrap";
import toastr from "toastr";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import { Helmet } from "react-helmet-async";

const _loggerPage = debug.extend("ORG");

function OrganizationsList() {
  const [pageData, setPageData] = useState({
    arrayOfOrganizations: [],
    mappedOrganizationComponents: [],
    resultsFound: true,
    totalCount: 0,
    dropDownTitle: "Organization Type",
    arrayOfOrgTypes: [],
    mappedOrgTypeComponents: [],
    pageIndex: 1,
    pageSize: 15,
    nameQuery: "",
    selectedOrgTypeId: 0,
  });

  useEffect(() => {
    lookUpService
      .getTypes(["OrganizationTypes"])
      .then(onGetOrgTypeSuccess)
      .catch(onGetOrgTypeErr);
  }, []);

  function PaginationElement() {
    const onChange = (page) => {
      setPageData((prevState) => {
        let newPageData = { ...prevState };

        newPageData.pageIndex = page;

        return newPageData;
      });
    };

    return (
      <Pagination
        onChange={onChange}
        current={pageData.pageIndex}
        total={pageData.totalCount}
        locale={locale}
      ></Pagination>
    );
  }

  function onOrgTypeSelection(e) {
    setPageData((prevState) => {
      let newPageData = { ...prevState };
      newPageData.selectedOrgTypeId = e;
      if (e === "0") {
        newPageData.dropDownTitle = "Organization Type";
      } else {
        newPageData.dropDownTitle = pageData.arrayOfOrgTypes[e - 1].name;
      }

      return newPageData;
    });
  }

  function onGetOrgTypeSuccess(response) {
    setPageData((prevState) => {
      let newPageData = { ...prevState };
      let orgTypeArray = response.item.organizationTypes;
      newPageData.arrayOfOrgTypes = orgTypeArray;
      newPageData.mappedOrgTypeComponents = orgTypeArray.map(dropDownMapper);
      return newPageData;
    });
  }

  function dropDownMapper(orgTypeObj) {
    return (
      <Dropdown.Item key={"key-" + orgTypeObj.id} eventKey={orgTypeObj.id}>
        {orgTypeObj.name}
      </Dropdown.Item>
    );
  }

  function onGetOrgTypeErr(err) {
    toastr.error("Error loading dropdown organization types", err);
  }

  function DropDownElement() {
    return (
      <DropdownButton
        as={ButtonGroup}
        key={"Primary"}
        id={"dropdown-variants-primary"}
        variant={"primary"}
        title={pageData.dropDownTitle}
        onSelect={onOrgTypeSelection}
      >
        <Dropdown.Item eventKey="0">All</Dropdown.Item>
        {pageData.mappedOrgTypeComponents}
      </DropdownButton>
    );
  }

  const navigate = useNavigate();

  function BreadCrumbElement() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Organizations Admin Dashboard</Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  useEffect(() => {
    organizationServices
      .getOrganizations(
        pageData.pageIndex - 1,
        pageData.pageSize,
        pageData.nameQuery,
        pageData.selectedOrgTypeId
      )
      .then(onGetOrgSuccess)
      .catch(onGetOrgErr);
  }, [pageData.pageIndex, pageData.selectedOrgTypeId]);

  const onGetOrgSuccess = (response) => {
    let orgArray = response.item.pagedItems;
    setPageData((prevState) => {
      let newPageData = { ...prevState };
      newPageData.resultsFound = true;
      newPageData.totalCount = response.item.totalCount;
      newPageData.arrayOfOrganizations = orgArray;
      newPageData.mappedOrganizationComponents = orgArray.map(mapOrganizations);
      return newPageData;
    });
  };

  const onGetOrgErr = (err) => {
    setPageData((prevState) => {
      let newPageData = { ...prevState };
      newPageData.resultsFound = false;
      return newPageData;
    });
    if (err.response.status === 404) {
      toastr.info("No results");
    } else {
      toastr.error("Get Organizations Failed", err.response.status);
    }
  };

  const mapOrganizations = function (organizationObj) {
    return (
      <OrganizationAdminCard
        organization={organizationObj}
        key={"id-" + organizationObj.organizationId}
      />
    );
  };

  function checkForEnter(e) {
    if (e.key === "Enter") {
      _loggerPage("enter hit", pageData.nameQuery);
      organizationServices
        .getOrganizations(
          pageData.pageIndex - 1,
          pageData.pageSize,
          pageData.nameQuery,
          pageData.selectedOrgTypeId
        )
        .then(onGetOrgSuccess)
        .catch(onGetOrgErr);
    }
  }

  const onNameQueryChange = (e) => {
    setPageData((prevState) => {
      let newPageData = { ...prevState };
      newPageData.nameQuery = e.target.value;
      return newPageData;
    });
  };

  return (
    <React.Fragment>
      <Helmet title="Organizations" />
      <Row>
        <BreadCrumbElement />
      </Row>
      <Container fluid className="p-0">
        <Row>
          <Col sm={8} className="mx-auto">
            <Card>
              <Card.Body>
                <Col sm={4}>
                  <Form.Control
                    onChange={onNameQueryChange}
                    onKeyPress={checkForEnter}
                    name="pageData.nameQuery"
                    value={pageData.nameQuery}
                    type="text"
                    className="my-3"
                    placeholder="Search..."
                  />
                </Col>
                <DropDownElement />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm={8} className="mx-auto">
            {pageData.resultsFound && (
              <Card>
                <Card.Body>
                  <Table>
                    <tbody>{pageData.mappedOrganizationComponents}</tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="mx-auto" sm={8}>
            <Card>
              <Card.Body>
                <Row className="text-center mt-3 mb-3">
                  <PaginationElement />
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default OrganizationsList;

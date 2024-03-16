import { React, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import SchoolCard from "./SchoolCard";
import schoolService from "../../services/schoolService";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

const PagedSchools = (props) => {
  const navigate = useNavigate();
  const _logger = debug.extend("SchoolsPaged");
  const [pageData, setPageData] = useState({
    schools: [],
    schoolComponents: [],
    pageIndex: 0,
    currentPage: 1,
    pageSize: 6,
    totalCount: 0,
    totalPages: 0,
    query: "",
  });

  useEffect(() => {
    if (pageData.query) {
      schoolService
        .searchPaged(
          pageData.currentPage - 1,
          pageData.pageSize,
          pageData.query
        )
        .then(onGetSuccess)
        .catch(onGetError);
    } else {
      schoolService
        .getPaged(pageData.currentPage - 1, pageData.pageSize)
        .then(onGetSuccess)
        .catch(onGetError);
    }
  }, [pageData.currentPage, pageData.query]);

  const onGetSuccess = (response) => {
    let paginationData = response.item;
    let schoolArray = response.item.pagedItems;
    setPageData((prev) => {
      const n = { ...prev };
      n.schools = schoolArray;
      n.schoolComponents = schoolArray.map(mapSchools);
      n.currentPage = paginationData.pageIndex + 1;
      n.pageSize = paginationData.pageSize;
      n.totalCount = paginationData.totalCount;
      n.totalPages = paginationData.totalPages;
      return n;
    });
  };
  const mapSchools = (school) => {
    return (
      <SchoolCard school={school} key={school.id} user={props.currentUser} />
    );
  };

  const onChange = (page) => {
    setPageData((prevState) => {
      const n = { ...prevState };
      n.currentPage = page;
      return n;
    });
  };

  const onGetError = (response) => {
    _logger(response);
  };

  const goToAdd = () => {
    navigate("/schools/create");
  };

  const onFieldChange = (e) => {
    const newValue = e.target.value;
    setPageData((prev) => {
      const n = { ...prev };
      n.query = newValue;
      return n;
    });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-between">
          <Col lg={4}>
            <Pagination
              onChange={onChange}
              current={pageData.currentPage}
              total={pageData.totalCount}
              pageSize={pageData.pageSize}
              locale={locale}
              className="mb-3"
            />
          </Col>
          <Col lg={4} className="text-end">
            <Form className="d-flex">
              <Form.Control
                type="search"
                name="query"
                placeholder="Search..."
                onChange={onFieldChange}
                className="flex-end"
              />
            </Form>
          </Col>
        </Row>
        <Row>{pageData.schoolComponents}</Row>
        <Row>
          <Col md={2} lg={2}>
            <Button onClick={goToAdd}>
              <FaPlus />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
PagedSchools.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
export default PagedSchools;

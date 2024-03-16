import React, { useState, useEffect, useCallback } from "react";
import goalsService from "../../services/goalService";
import GoalCard from "./GoalCard";
import { Card, Table, Button, Col, Form } from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toastr from "toastr";
import "../goals/goals.css";

const _logger = debug.extend("Goals");

const defaultMaxPay = 500000;
const defaultMinPay = 0;

const payOptions = [
  {
    value: "0",
    label: "Desired Pay Range",
    min: defaultMinPay,
    max: defaultMaxPay,
  },
  { value: "1", label: "less than 40,000", min: defaultMinPay, max: 40000 },
  { value: "2", label: "40,001 to 60,000", min: 40001, max: 60000 },
  { value: "3", label: "60,001 to 80,000", min: 60001, max: 80000 },
  { value: "4", label: "80,001 to 100,000", min: 80001, max: 100000 },
  { value: "5", label: "100,001 or more", min: 100001, max: defaultMaxPay },
];

function Goals(props) {
  const [pageData, setPageData] = useState({
    arrayOfGoals: [],
    goalsComponents: [],
    mappedPayRanges: [],
    currentPage: 1,
    pageIndex: 0,
    pageSize: 3,
    totalCount: 0,
    pageCount: 0,
    query: "",
    selectedOption: "0",
    isCompleted: false,
  });

  useEffect(() => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.mappedPayRanges = payOptions.map(mapAPayOption);
      return pd;
    });
  }, []);

  useEffect(() => {
    _logger(
      props.currentUser,
      pageData.isCompleted,
      pageData.selectedOption,
      "firing up getGoals"
    );
    if (props.currentUser.roles.includes("Candidate")) {
      goalsService
        .getGoalsByCreatedBy(pageData.pageIndex, pageData.pageSize)
        .then(onGetGoalsByCreatedBySucccess)
        .catch(onGetGoalsByCreatedByError);
    } else if (
      props.currentUser.roles.includes("SysAdmin") ||
      props.currentUser.roles.includes("HiringAdmin") ||
      props.currentUser.roles.includes("OrgAdmin")
    ) {
      const currentSelect = pageData.selectedOption;
      const found = payOptions.find((item) => currentSelect === item.value);
      goalsService
        .filterByDesiredPay(
          pageData.query,
          pageData.isCompleted,
          found.min,
          found.max,
          pageData.pageIndex,
          pageData.pageSize
        )
        .then(onFilterByDesiredPaySuccess)
        .catch(onFilterByDesiredPayError);
    }
  }, [
    pageData.pageIndex,
    pageData.query,
    pageData.isCompleted,
    pageData.selectedOption,
  ]);

  const onGetGoalsByCreatedBySucccess = (response) => {
    _logger(response, "onGetGoalsByCreatedBySuccess");
    let goalsArray = response.item.pagedItems;
    _logger(goalsArray);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfGoals = goalsArray;
      pd.totalCount = response.item.totalCount;
      pd.pageIndex = response.item.pageIndex;
      pd.pageSize = response.item.pageSize;
      pd.pageCount = response.item.totalPages;
      pd.goalsComponents = goalsArray.map(mapAGoal);
      return pd;
    });
  };
  const onGetGoalsByCreatedByError = (err) => {
    _logger(err, "onGetGoalsByCreatedByError");
  };
  const onFilterByDesiredPaySuccess = (response) => {
    _logger(response, "onFilterByDesiredPaySuccess");
    let goalsArray = response.item.pagedItems;
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfGoals = goalsArray;
      pd.totalCount = response.item.totalCount;
      pd.pageIndex = response.item.pageIndex;
      pd.pageSize = response.item.pageSize;
      pd.pageCount = response.item.totalPages;
      pd.goalsComponents = goalsArray.map(mapAGoal);
      return pd;
    });
  };
  const onFilterByDesiredPayError = (err) => {
    _logger(err, "onFilterByDesiredPayError");
    if (String(err).includes("404")) {
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.goalsComponents = [].map(mapAGoal);
        return pd;
      });
    }
  };

  const mapAGoal = (goal) => {
    return (
      <GoalCard
        currentUser={props.currentUser}
        goal={goal}
        key={goal.id}
        onGoalClicked={onDeleteRequested}
      />
    );
  };

  const onDeleteRequested = useCallback((myGoal) => {
    _logger(myGoal.id, { myGoal });
    Swal.fire({
      title: "Are you sure?",
      text: "This Goal will be permanantly deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      customClass: {
        confirmButton: "me-4",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        goalsService
          .deleteGoal(myGoal.id)
          .then(onDeleteGoalSuccess)
          .catch(onDeleteGoalError);
      }
    });
  }, []);
  const onDeleteGoalSuccess = (response) => {
    _logger(response, "onDeleteGoalSuccess");
    const idToBeDeleted = response;
    onDeleteHandler(idToBeDeleted);
    toastr.success(`The Goal was successfully deleted!`);
  };
  const onDeleteGoalError = (err) => _logger(err, "onDeleteError");

  const onDeleteHandler = (idToBeDeleted) => {
    _logger("onDeleteHandler", idToBeDeleted);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfGoals = [...prevState.arrayOfGoals];
      const idxOf = pd.arrayOfGoals.findIndex((goal) => {
        let result = false;
        if (goal.id === idToBeDeleted) {
          result = true;
        }
        return result;
      });
      if (idxOf >= 0) {
        pd.arrayOfGoals.splice(idxOf, 1);
        pd.goalsComponents = pd.arrayOfGoals.map(mapAGoal);
      }
      return pd;
    });
  };

  const onPageChange = (page) => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.pageIndex = page - 1;
      return pd;
    });
  };

  const navigate = useNavigate();
  const goToPage = (e) => {
    _logger(e.currentTarget.dataset.page);
    navigate(e.currentTarget.dataset.page);
  };

  const onSearchFieldChange = (e) => {
    const newValue = e.target.value;
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.query = newValue;
      pd.pageIndex = 0;
      return pd;
    });
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    _logger("filter changed", value);
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.selectedOption = value;
      pd.pageIndex = 0;
      return pd;
    });
  };

  const handleCompletedBtn = () => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      _logger(!pageData.isCompleted);
      pd.isCompleted = !pd.isCompleted;
      pd.pageIndex = 0;
      return pd;
    });
  };

  const mapAPayOption = (option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  );

  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Card.Title className="mt-2 mb-auto fs-2">
            Candidate Goals
            {props.currentUser.roles.includes("Candidate") && (
              <Button
                type="button"
                className="btn btn-lg float-end"
                data-page="/goals/form"
                onClick={goToPage}
              >
                + Add Goal
              </Button>
            )}
            {!props.currentUser.roles.includes("Candidate") && (
              <>
                <Col lg={3} className="float-end">
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      name="query"
                      placeholder="Search..."
                      value={pageData.query}
                      onChange={onSearchFieldChange}
                    />
                  </Form>
                </Col>
                <Col lg={3} className="float-end mx-2">
                  <Form className="d-flex">
                    <Button
                      className="ms-2 mx-2 btn-secondary"
                      onClick={handleCompletedBtn}
                    >
                      {pageData.isCompleted ? "Incomplete" : "Completed"}
                    </Button>
                    <Form.Select
                      value={pageData.selectedOption}
                      onChange={handleOptionChange}
                    >
                      {pageData.mappedPayRanges}
                    </Form.Select>
                  </Form>
                </Col>
              </>
            )}
          </Card.Title>
        </Card.Header>
        <Table>
          <thead className="bg-body">
            <tr>
              <th width="13%">Candidate</th>
              <th width="10%">Name</th>
              <th width="15%">Statement</th>
              <th width="10%">Desired Pay</th>
              <th width="4%">Priority</th>
              <th width="11%">Goal Target</th>
              <th width="25%">Goal Values</th>
              <th width="5%">Completed</th>
              {props.currentUser.roles.includes("Candidate") && (
                <th width="4%">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>{pageData.goalsComponents}</tbody>
        </Table>
        <Pagination
          className="pagination justify-content-center m-5"
          onChange={onPageChange}
          pageSize={pageData.pageSize}
          current={pageData.pageIndex + 1}
          total={pageData.totalCount}
          pageCount={pageData.pageCount}
          locale={locale}
        />
      </Card>
    </React.Fragment>
  );
}
Goals.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
export default Goals;

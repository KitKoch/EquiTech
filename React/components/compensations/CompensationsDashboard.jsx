import React, { useEffect, useState } from "react";
import { Table, Card, Button, Col, ButtonGroup } from "react-bootstrap";
import { Edit, Trash } from "react-feather";
import "rc-pagination/assets/index.css";
import compensationPackageService from "../../services/compensationPackageService";
import organizationServices from "../../services/organizationService";
import compensationElementService from "../../services/compensationElementService";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import debug from "sabio-debug";
import toastr from "toastr";
import "./compensationpackages.css";
import { useLocation, useNavigate } from "react-router-dom";

const _logger = debug.extend("CompensationsDashboard");

function CompensationsDashboard(props) {
  const [dashboardItems, setDashboardItems] = useState({
    tableData: [],
    pageIndex: 0,
    pageSize: 100,
    userId: props.currentUser.id,
    orgId: 0,
    orgName: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    _logger("location.state", location.state);

    organizationServices
      .getUsersOrgMembership(dashboardItems.userId)
      .then(onGetUsersOrgMembershipSuccess)
      .catch(onGetUsersOrgMembershipError);
  }, []);

  const onGetUsersOrgMembershipSuccess = (response) => {
    _logger("onGetUsersOrgMembershipSuccess", response);

    let newOrgId = response?.item.id;
    let newOrgName = response?.item.name;
    setDashboardItems((prevItems) => {
      let newItems = { ...prevItems };
      newItems.orgId = newOrgId;
      newItems.orgName = newOrgName;

      return newItems;
    });

    renderCompensations(newOrgId);
  };

  const onGetUsersOrgMembershipError = (error) => {
    _logger("onGetUsersOrgMembershipError", error);

    toastr.error(
      "Something went wrong in getting your Organization Data. Please reload the page.",
      error
    );
  };

  const renderCompensations = (newOrgId) => {
    _logger("renderCompensations");
    compensationPackageService
      .getPackagesByOrgIdPaged(
        dashboardItems.pageIndex,
        dashboardItems.pageSize,
        newOrgId
      )
      .then(onGetCompensationsSuccess)
      .catch(onGetCompensationsError);
  };

  const onGetCompensationsSuccess = (response) => {
    _logger("onGetCompensationsSuccess", response);

    let serverData = response.item.pagedItems;
    setDashboardItems((prevItems) => {
      let newItems = { ...prevItems };
      newItems.tableData = serverData;
      return newItems;
    });
  };

  const onGetCompensationsError = (error) => {
    _logger("onGetCompensationsError", error);

    toastr.error(
      "Something went wrong onGetCompensationsError. Please try again."
    );
  };

  const showConfirmationPrompt = () => {
    return Swal.fire({
      title: "Are you sure?",
      text: "Deleting this package cannot be reverted!",
      icon: "warning",
      showCancelButton: true,
      showComfirmButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      customClass: {
        actions: "comp_dash_prompt_delete",
        cancelButton: "comp_dash_cancel_btn",
      },
    });
  };

  const onDeleteClicked = (compensation) => {
    _logger("onDeleteClicked", compensation);

    showConfirmationPrompt()
      .then((result) => handleConfirmation(result, compensation))
      .catch((error) => handleDeletionError(error));
  };

  const handleConfirmation = (result, compensation) => {
    if (result.isConfirmed) {
      deleteCompensation(compensation);
      toastr.success("You have deleted a compensation package!");
    }
  };

  const handleDeletionError = (error) => {
    _logger("handleDeletionError", error);
    Swal.fire("error", "Compensation was not deleted.");
  };

  const deleteCompensation = (compensation) => {
    _logger("deleteCompensation", compensation);

    const delPackagesSuccessHandler = onDeleteElementByPckIdSuccess(
      compensation.id
    );
    compensationElementService
      .deleteCompensationElementByTypeId(compensation.id)
      .then(delPackagesSuccessHandler)
      .catch(onDeleteElementByPckIdError);
  };

  const onDeleteElementByPckIdSuccess = (id) => {
    _logger("onDeleteElementByPckIdSuccess", id);
    const delSuccessHandler = onDeleteSuccess(id);
    compensationPackageService
      .deletePackage(id)
      .then(delSuccessHandler)
      .catch(onDeleteError);
  };

  const onDeleteElementByPckIdError = (error) => {
    _logger("onDeleteElementByPckIdError", error);
    toastr.error(
      "Something went wrong when submitting the Package. Please try again."
    );
  };

  const onDeleteSuccess = (compId) => {
    _logger("onDeleteSuccess, compId:", compId);
    deleteRow(compId);
  };

  const onDeleteError = (error) => {
    _logger("onDeleteError", error);
    Swal.fire("Error", "Failed to delete the compensation.", "error");
  };

  const deleteRow = (compId) => {
    setDashboardItems((prevItems) => {
      let newItems = { ...prevItems };
      let indexToDel = newItems.tableData.findIndex(findCompItem);

      function findCompItem(compItem) {
        return compItem.compPackage.id === compId;
      }

      if (indexToDel > -1) {
        newItems.tableData.splice(indexToDel, 1);
      }

      return newItems;
    });
  };

  const onAddPackage = (orgId, orgName) => {
    _logger("onAddPackage", orgId);
    navigate("/jobs/compensations/packages/add", {
      state: { organationId: orgId, organationName: orgName },
    });
  };

  const onEditPackage = (compPackage) => {
    _logger("onEditPackage", compPackage);
    navigate("/jobs/compensations/packages/edit", { state: compPackage });
  };

  return (
    <React.Fragment>
      <div className="compensation_dashboard_wrapper">
        <h1>{dashboardItems.orgName} Compensation Packages</h1>
        <ButtonGroup className="mx-4 py-2">
          <Button
            onClick={() =>
              onAddPackage(dashboardItems.orgId, dashboardItems.orgName)
            }
            variant="success"
          >
            Add a Package
          </Button>
        </ButtonGroup>
        <Card>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Organization</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardItems.tableData.map((compensation) => (
                <tr key={compensation.compPackage.id}>
                  <td>{compensation.compPackage.name}</td>
                  <td>{compensation.organization.name}</td>
                  <td>{compensation.description}</td>
                  <td className="table-action">
                    <Col className="px-8">
                      <Edit
                        spacing={10}
                        className="actionBtn text-right"
                        color="blue"
                        size={18}
                        onClick={() => onEditPackage(compensation)}
                      ></Edit>
                      <Trash
                        spacing={10}
                        className="actionBtn text-right"
                        color="red"
                        size={18}
                        onClick={() =>
                          onDeleteClicked(compensation.compPackage)
                        }
                      />
                    </Col>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </div>
    </React.Fragment>
  );
}

CompensationsDashboard.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default CompensationsDashboard;

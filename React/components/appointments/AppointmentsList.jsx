import React, { useState, useEffect } from "react";
import appointmentsService from "../../services/appointmentService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Swal from "sweetalert2";
import toastr from "toastr";
import { Table, Card } from "react-bootstrap";
import Appointment from "./Appointment";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AppointmentsList = (props) => {
  const _logger = debug.extend("Appointments");
  const navigate = useNavigate();
  const userRole = props.currentUser.roles;
  _logger("WHO IS THIS USER?", userRole);

  const [order, setOrder] = useState("ASC");
  const [pageData, setPageData] = useState({
    apptsArr: [],
    apptsComponent: [],
    currentPage: 1,
    pageIndex: 0,
    pageSize: 8,
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

  const mapAppointment = (anAppointment) => {
    _logger(anAppointment);
    return (
      <Appointment
        key={"List-A" + anAppointment.id}
        appointment={anAppointment}
        onDeleteClicked={onDeleteRequested}
        userRole={userRole}
        onHandleConfirmation={onHandleConfirmation}
      />
    );
  };

  const onChangePage = (currentPage) => {
    _logger("onChangePage");
    setPageData((prevState) => {
      return { ...prevState, pageIndex: currentPage - 1 };
    });
  };

  const onClickAdd = () => {
    navigate("/appointments/new");
  };

  const onHandleConfirmation = (appt) => {
    _logger("Appointment to confirm", appt);
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will confirm the appointment!",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    })
      .then((result) => {
        if (result.isConfirmed) {
          appointmentsService
            .confirmAppointment(appt.id)
            .then(onUpdateSuccess)
            .catch(onUpdateError);
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire("Error.", "Appointment could not be confirmed.", "error");
        }
      });
  };

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = pageData.apptsArr.sort((dateTimeNew, dateTimeOld) =>
        dateTimeNew[col] > dateTimeOld[col] ? 1 : -1
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
        dateTimeNew[col] < dateTimeOld[col] ? 1 : -1
      );
      setPageData((prevState) => {
        const updatedState = { ...prevState };

        updatedState.apptsComponent = sorted.map(mapAppointment);

        return updatedState;
      });
      setOrder("ASC");
    }
  };

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

  const onGetAppointmentsError = (err) => {
    _logger("onGetAppointmentsError", err);

    toastr.error("Appointments not found.");
  };

  const onDeleteRequested = (appt) => {
    _logger("Deleting Appt");
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this appointment can not be reverted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    })
      .then((result) => {
        if (result.isConfirmed) {
          const onDeleteHandler = onDeleteSuccess(appt.id);
          appointmentsService
            .deleteAppointment(appt.id)
            .then(onDeleteHandler)
            .catch(onDeleteError);
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire("Error.", "Appointment could not be deleted...", "error");
        }
      });
  };

  const onDeleteSuccess = (response) => {
    _logger("onDeleteSuccess", response);

    Swal.fire("Deleted!", "Appointment has been deleted.", "success");

    const filteredAppts = (appointment) => {
      let result = false;
      if (appointment.id === response) {
        result = true;
      }
      return result;
    };

    setPageData((prevState) => {
      let update = { ...prevState };
      const index = prevState.apptsArr.findIndex(filteredAppts);
      update.apptsArr.splice(index, 1);
      update.apptsComponent = update.apptsArr.map(mapAppointment);
      return update;
    });
  };

  const onDeleteError = (err) => {
    _logger("onDeleteError", err);

    toastr.error("Appointment was not deleted.");
  };

  const onUpdateSuccess = (response) => {
    _logger("onUpdateSuccess", response);

    Swal.fire({
      icon: "success",
      title: "Appointment confirmed!",
      confirmButtonText: "Ok.",
    });
  };

  const onUpdateError = (err) => {
    _logger("onUpdateError", err);
  };

  return (
    <React.Fragment>
      <div>
        <h1>
          <div className="text-sm-start">
            Appointments
            {(userRole.includes("HiringAdmin") ||
              userRole.includes("SysAdmin")) && (
              <button
                type="button"
                className="btn btn-primary btn-lg float-end my-xxl-n2"
                onClick={onClickAdd}
              >
                Create Appointment
              </button>
            )}
          </div>
        </h1>
      </div>
      <Card className="row mt-xxl-4 text-lg">
        <Card.Body>
          <Table className="mb-0 table-hover table-striped table-bordered">
            <thead>
              <tr>
                <th className="text-md-center">Name</th>
                <th className="text-md-center">Email</th>
                <th className="text-md-center">Type</th>
                <th className="text-md-center">Status</th>
                <th className="text-md-center">Location</th>
                <th className="text-md-center">Team Member</th>
                <th className="text-md-center">Date</th>
                <th
                  onClick={() => sorting("appointmentStart")}
                  className="text-md-center"
                >
                  Start Time
                </th>
                <th className="text-md-center">End Time</th>
                {userRole.includes("HiringAdmin") ||
                userRole.includes("SysAdmin") ? (
                  <th className="text-md-center">Action</th>
                ) : (
                  <th className="text-md-center">Confirm?</th>
                )}
              </tr>
            </thead>
            <tbody>{pageData.apptsComponent}</tbody>
          </Table>
        </Card.Body>
      </Card>
      <Pagination
        onChange={onChangePage}
        current={pageData.pageIndex + 1}
        total={pageData.totalAppointments}
        pageSize={pageData.pageSize}
        locale={locale}
        className="m-lg-4 text-center"
      />
    </React.Fragment>
  );
};

AppointmentsList.propTypes = {
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string]))
      .isRequired,
  }).isRequired,
};

export default AppointmentsList;

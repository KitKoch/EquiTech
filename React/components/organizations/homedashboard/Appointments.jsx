import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import appointmentsService from "../../../services/appointmentService";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";
import AppointmentCard from "./AppointmentCard";

const _logger = logger.extend("Appointments");

function Appointments({ user, checkDate }) {
  const [appointments, setAppointments] = useState({
    arrayOfAppointments: [],
    appointmentComponents: [],
    pageIndex: 1,
    pageSize: 4,
    totalCount: 0,
  });

  useEffect(() => {
    appointmentsService
      .getAppointmentsByOrg(
        appointments.pageIndex - 1,
        appointments.pageSize,
        user.organizationId
      )
      .then(onGetAppointmentsByOrgSuccess)
      .catch(onGetAppointmentsByOrgError);
  }, []);

  const onGetAppointmentsByOrgSuccess = (response) => {
    _logger("Get Appointments Success", response.item);
    const result = response.item;
    const returnedArray = response.item.pagedItems;
    setAppointments((prevState) => {
      const newState = { ...prevState };
      newState.pageIndex = result.pageIndex + 1;
      newState.totalCount = result.totalCount;
      newState.arrayOfAppointments = returnedArray;
      newState.appointmentComponents = returnedArray.map(mapAppointment);
      return newState;
    });
  };

  const onGetAppointmentsByOrgError = (error) => {
    _logger("Get Appointments Error", error);
    toastr.error("Unable To Get Appointments");
  };

  const mapAppointment = (anAppointment) => {
    return (
      <AppointmentCard
        anAppointment={anAppointment}
        checkDate={checkDate}
        key={anAppointment.id}
      />
    );
  };

  const onChange = (page) => {
    setAppointments((prevData) => {
      const pd = { ...prevData };
      pd.pageIndex = page;
      return pd;
    });
  };

  return (
    <Card className="flex-fill w-100">
      <Card.Header>
        <div className="d-flex align-items-center justify-content-between">
          <Card.Title className="mb-0">Appointments</Card.Title>
          <div className="card-actions float-end">
            <Pagination
              onChange={onChange}
              pageSize={appointments.pageSize}
              current={appointments.pageIndex}
              locale={locale}
              total={appointments.totalCount}
            />
          </div>
        </div>
      </Card.Header>
      <Card.Body className="">
        <ul className="timeline">{appointments.appointmentComponents}</ul>
      </Card.Body>
    </Card>
  );
}

Appointments.propTypes = {
  checkDate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    organizationId: PropTypes.number.isRequired,
  }),
};

export default Appointments;

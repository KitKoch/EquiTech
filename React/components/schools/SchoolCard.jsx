import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import schoolService from "../../services/schoolService";
import Swal from "sweetalert2";
import defaultLogo from "../../assets/img/logo.svg";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import "./schools.css";

const SchoolCard = (props) => {
  const navigate = useNavigate();
  const _logger = debug.extend("SchoolsCard");
  const [vCheck, setVCheck] = useState(false);
  const [dCheck, setDCheck] = useState(false);

  const toggleIsVerified = (e) => {
    const id = e.target.id;
    setVCheck((vCheck) => !vCheck);
    schoolService
      .updateVerification(id)
      .then(toggleVerifiedSuccess)
      .catch(toggleVerifiedError);
  };
  const toggleIsDeleted = (e) => {
    const id = e.target.id;
    setDCheck((dCheck) => !dCheck);
    schoolService
      .updateDeleted(id)
      .then(toggleDeletedSuccess)
      .catch(toggleDeletedError);
  };

  const toggleVerifiedSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "School verification status updated",
      confirmButtonText: "Ok",
    });
  };
  const toggleDeletedSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "School deleted status updated",
      confirmButtonText: "Ok",
    });
  };
  const toggleVerifiedError = (response) => {
    Swal.fire({
      icon: "error",
      title: "Verification status not changed",
      confirmButtonText: "Try Again",
    });
    _logger(response);
  };
  const toggleDeletedError = (response) => {
    Swal.fire({
      icon: "error",
      title: "Deleted status not changed",
      confirmButtonText: "Try Again",
    });
    _logger(response);
  };

  const editSchool = () => {
    navigateToSchool(props.school);
  };

  const navigateToSchool = (school) => {
    const state = { type: "school-edit-view", payload: school };
    navigate(`/schools/${school.id}`, { state: state });
  };

  return (
    <>
      <Col md={4} lg={4}>
        <Card>
          <Card.Header className="school-card-header">
            <Card.Title className="mb-0 text-primary d-flex school-header">
              <Col lg={10} className="flex-end pt-4">
                {props.school.name}
              </Col>
              <Col className="text-end">
                {props.school.logoUrl !== null ? (
                  <img
                    src={props.school.logoUrl}
                    alt="school logo"
                    className="w-100 h-100"
                  />
                ) : (
                  <img src={defaultLogo} alt="defaultLogo" className="w-75" />
                )}
              </Col>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <h5 className="d-none">School Id: {props.school.id}</h5>
            {props.school.location.lineTwo !== null ? (
              <div>
                <h5>{props.school.location.lineOne}</h5>
                <h6>{props.school.location.lineTwo}</h6>
              </div>
            ) : (
              <div>
                <h5>{props.school.location.lineOne}</h5>
              </div>
            )}
            <div>
              <p>
                {props.school.location.city}, {props.school.location.state}
                {props.school.location.zip}
              </p>
            </div>
          </Card.Body>
          {props.user.roles.includes("SysAdmin") ? (
            <Card.Footer className="border">
              <Row className="justify-content-between">
                <Col md={5} xs={4} lg={5} className="p-0">
                  <Form className="p-1">
                    {props.school.isDeleted === false ? (
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={props.school.id}
                          checked={!dCheck}
                          onChange={toggleIsDeleted}
                        />
                        <label className="form-check-label" htmlFor="deleted">
                          {!dCheck ? "Viewable" : "Not Viewable"}
                        </label>
                      </div>
                    ) : (
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={dCheck}
                          id={props.school.id}
                          onChange={toggleIsDeleted}
                        />
                        <label className="form-check-label" htmlFor="deleted">
                          {dCheck ? "Viewable" : "Not Viewable"}
                        </label>
                      </div>
                    )}
                  </Form>
                </Col>
                <Col>
                  <Form className="p-1">
                    {props.school.isVerified === true ? (
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={!vCheck}
                          id={props.school.id}
                          onChange={toggleIsVerified}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="verificationCheck"
                        >
                          {!vCheck ? "Verified" : "Unverified"}
                        </label>
                      </div>
                    ) : (
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          checked={vCheck}
                          id={props.school.id}
                          onChange={toggleIsVerified}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="verificationCheck"
                        >
                          {vCheck ? "Verified" : "Unverified"}
                        </label>
                      </div>
                    )}
                  </Form>
                </Col>
                <Col className="text-end">
                  <Button onClick={editSchool}>
                    <FaEdit />
                  </Button>
                </Col>
              </Row>
            </Card.Footer>
          ) : (
            <Card.Footer />
          )}
        </Card>
      </Col>
    </>
  );
};

SchoolCard.propTypes = {
  school: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lineOne: PropTypes.string.isRequired,
      lineTwo: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }).isRequired,
    logoUrl: PropTypes.string,
    isDeleted: PropTypes.bool.isRequired,
    isVerified: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default SchoolCard;

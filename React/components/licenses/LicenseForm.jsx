import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import toastr from "toastr";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Table,
  Badge,
  Image,
  Form as BootstrapForm,
} from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import licenseSchema from "../../schemas/licenseSchema";
import * as lookUpService from "../../services/lookUpService";
import * as licenseService from "../../services/licenseService";
import "../skills/skills.css";
import LicenseUploadWidget from "./LicenseUploadWidget";

const _logger = debug.extend("LicensesForm");

function LicenseForm() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  //#region STATE && SET-STATE
  const [formData, updateFormData] = useState({
    stateArray: [],
    stateArrayComponent: [],
    dateValue: "",
  });

  const [initialValues, updateInitialValues] = useState({
    licenseStateId: 0,
    licenseNumber: "",
    licenseName: "",
    expirationDate: "",
    isActive: false,
    fileId: "",
  });

  useEffect(() => {
    const tableReference = ["States"];
    lookUpService
      .get3Col(tableReference)
      .then(lookUpSuccess)
      .catch(lookUpError);

    if (id) {
      updateInitialValues((prevState) => {
        let obj = { ...prevState };
        obj.licenseName = location.state.licenseName;
        obj.licenseStateId = location.state.licenseStateId;
        obj.licenseNumber = location.state.licenseNumber;
        obj.isActive = location.state.isActive;
        obj.expirationDate = location.state?.expirationDate?.slice(0, 10);
        obj.id = id;
        return obj;
      });
    }
  }, []);

  //#endregion

  function stateDropdownMap(state) {
    return (
      <option key={"dropDown_" + state.id} value={state.id}>
        {state.col3}
      </option>
    );
  }
  function backToList() {
    navigate("/licenses");
  }

  //#region Handlers
  function lookUpSuccess(response) {
    updateFormData((prevState) => {
      let obj = { ...prevState };
      obj.stateArray = response.items;
      obj.stateArrayComponent = response.items.map(stateDropdownMap);
      return obj;
    });
  }

  function lookUpError(error) {
    _logger(error);
    toastr.error("Something went wrong. Please try again.");
  }

  const handleSubmit = (values) => {
    _logger("location: ", location.state);
    if (!id) {
      licenseService
        .addLicense(values)
        .then(addLicenseSuccess)
        .catch(addLicenseErr);
    } else {
      licenseService
        .updateLicense(values)
        .then(updateLicenseSuccess)
        .catch(updateLicenseErr);
    }
  };

  function addLicenseSuccess() {
    Swal.fire({
      title: "License was added successfully!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(backToList);
  }

  function addLicenseErr(err) {
    _logger("Add License error:", err);
    Swal.fire({
      title: "License was not added!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  function updateLicenseSuccess(response) {
    _logger(response);
    Swal.fire({
      title: "Update was success!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(backToList);
  }

  function updateLicenseErr(err) {
    _logger("Update License error:", err);
    Swal.fire({
      title: "License was not updated!",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  function deleteSuccess() {
    _logger("Delete successful");
    Swal.fire({
      title: "License has been deleted",
      icon: "success",
      confirmButtonText: "OK",
    }).then(backToList);
  }

  function deleteError(err) {
    toastr.error("Something went wrong. Please try again.");
    _logger("Delete Error response: ", err);
  }

  function tryDeleteLicense() {
    Swal.fire({
      title: "Warning: Please confirm you want to delete this license.",
      icon: "warning",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      iconColor: "red",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        licenseService.deleteLicense(id).then(deleteSuccess).catch(deleteError);
      }
    });
  }

  function handleFileChange(files, setFieldValue) {
    const fileId = files[0].id;
    setFieldValue("fileId", fileId);
  }

  //#endregion

  return (
    <>
      <Container>
        {id ? (
          <Card>
            <Card.Header>
              <Card.Title className="text-center">License Details</Card.Title>
            </Card.Header>
            <Row className="mx-auto text-center">
              <Image
                src={location.state.createdBy.avatarUrl}
                height={150}
                roundedCircle
              />
            </Row>
            <Row className="text-center p-1">
              <i>
                License Owner: {location.state.createdBy.firstName}{" "}
                {location.state.createdBy.lastName}
              </i>
            </Row>
            <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th className="w-8">License Name</th>
                    <th className="w-8">License Number</th>
                    <th className="w-8">Issuing State</th>
                    <th className="w-10">Date Created</th>
                    <th className="w-10">Expiration Date</th>
                    <th className="w-5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="w-8">{location.state.licenseName}</td>
                    <td className="w-8">{location.state.licenseNumber}</td>
                    <td className="w-8">{location.state.stateName}</td>
                    <td className="w-10">
                      {location.state.dateCreated.slice(0, 10)}
                    </td>
                    <td className="w-10">
                      {location.state.expirationDate.slice(0, 10)}
                    </td>
                    <td className="w-5">
                      {location.state.isActive ? (
                        <Badge bg="primary">Verified</Badge>
                      ) : (
                        <Badge bg="danger">Not Verified</Badge>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        ) : null}
        <Card>
          <Card.Header className="text-center">
            {id ? (
              <Card.Title>Update License</Card.Title>
            ) : (
              <Card.Title>Add License</Card.Title>
            )}
          </Card.Header>
          <Card.Body>
            <Formik
              enableReinitialize={true}
              validationSchema={licenseSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {(formikProps) => (
                <Form>
                  <BootstrapForm.Group className="mb-3">
                    <Row>
                      <Col>
                        {id ? "Update License Name" : "License Name"}
                        <Field
                          name="licenseName"
                          component="input"
                          className="form-control w-80"
                        ></Field>
                        <ErrorMessage
                          name="licenseName"
                          component="div"
                          className="has-error"
                        />
                      </Col>
                      <Col>
                        {id ? "Update License Number" : "License Number"}
                        <Field
                          name="licenseNumber"
                          component="input"
                          className="form-control w-80"
                        ></Field>
                        <ErrorMessage
                          name="licenseNumber"
                          component="div"
                          className="has-error"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        Select New State
                        <Field
                          name="licenseStateId"
                          component="select"
                          className="form-control w-80"
                        >
                          <option value={0}>Select State</option>
                          {formData.stateArrayComponent}
                        </Field>
                        <ErrorMessage
                          name="licenseStateId"
                          component="div"
                          className="has-error"
                        />
                      </Col>
                      <Col>
                        Select Expiration Date
                        <Field
                          type="date"
                          name="expirationDate"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="expirationDate"
                          component="div"
                          className="has-error"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        License File Upload
                        <div>
                          <LicenseUploadWidget
                            isThumbnail={true}
                            isFileList={true}
                            handleFileChange={(files) =>
                              handleFileChange(files, formikProps.setFieldValue)
                            }
                            isAlertPopUp={true}
                          />
                        </div>
                      </Col>
                    </Row>
                  </BootstrapForm.Group>
                  <Row>
                    <Col className="w-1">
                      {id && (
                        <Button
                          onClick={tryDeleteLicense}
                          className="btn-danger m-1 mb-2"
                        >
                          Delete
                        </Button>
                      )}
                      <Button
                        onClick={backToList}
                        type="button"
                        className="btn-secondary m-1 mb-2"
                      >
                        Cancel
                      </Button>
                    </Col>
                    <Col className="text-end">
                      <Button type="submit" className="btn-primary mb-2 m-1">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default LicenseForm;

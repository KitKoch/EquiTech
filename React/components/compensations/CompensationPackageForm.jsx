import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { Button, Card, Col, Form as BootstrapForm, Row } from "react-bootstrap";
import compensationPackageFormSchema from "../../schemas/compensationPackageSchema";
import compensationPackageService from "../../services/compensationPackageService";
import "../compensations/compensationpackages.css";
import PropTypes from "prop-types";
import { getAllTypeLabelsWithoutNull } from "../../services/compensationConfigurationService";
import toastr from "toastr";
import { useLocation, useNavigate } from "react-router-dom";
import CompensationElementForm from "./CompensationElementForm";

import debug from "sabio-debug";
const _logger = debug.extend("CompensationPackageForm");

function CompensationPackageForm(props) {
  const [formData, setFormData] = useState({
    typesOptions: [],
    organizationId: 1,
    organization: "TEST",
    packageId: 0,
    name: "",
    description: "",

    isEdit: false,
    headerTitle: "",
    headerText: "",
    resetOrUndoText: "",

    showElements: false,
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    _logger("CompensationPackageForm Props:", props);
    _logger("CompensationPackageForm useLocation:", location.state);

    getAllTypeLabelsWithoutNull()
      .then(onGetAllTypeLabelsSuccess)
      .catch(onGetAllTypeLabelsError);

    if (location.state.organization && location.state.compPackage) {
      _logger("I'm EDITING");

      setFormData((prevForm) => {
        let newForm = { ...prevForm };
        newForm.organizationId = location.state.organization.id;
        newForm.organization = location.state.organization.name;
        newForm.packageId = location.state.compPackage.id;
        newForm.name = location.state.compPackage.name;
        newForm.description = location.state.description;

        newForm.isEdit = true;
        newForm.headerTitle = "Edit This Compensation Package";
        newForm.headerText = "Use this form to edit this compensation package.";
        newForm.resetOrUndoText = "Undo";

        return newForm;
      });
    } else {
      _logger("I'm ADDING");

      setFormData((prevForm) => {
        let newForm = { ...prevForm };
        newForm.organizationId = location.state.organationId;
        newForm.organization = location.state.organationName;

        newForm.headerTitle = "Create a Compensation Package";
        newForm.headerText =
          "Use this form to add a new compensation package for a future employee.";
        newForm.resetOrUndoText = "Reset";

        return newForm;
      });
    }
  }, []);

  const onGetAllTypeLabelsSuccess = (response) => {
    _logger("getTypeSuccess", response);
    const typesLabels = response?.items;

    if (typesLabels) {
      setFormData((prevData) => {
        const newData = { ...prevData };
        newData.typesOptions = typesLabels.map(mapTypeOptions);

        function mapTypeOptions(aTypeLabel) {
          let newOption = {
            value: Number(aTypeLabel.compensationType.id),
            label: aTypeLabel.compensationType.name,
            labelOptions: aTypeLabel.compensationLabels?.map(mapLabelOptions),
            labelDescriptions:
              aTypeLabel.compensationLabels?.map(mapLabelDescriptions),
          };
          if (newOption.labelOptions) {
            newOption?.labelOptions.unshift(
              <option key={0} value={0}>
                Select a Label
              </option>
            );
            newOption?.labelDescriptions.unshift("");
          } else {
            newOption.labelOptions = [""];

            newOption.labelDescriptions = [""];
          }
          return newOption;
        }

        function mapLabelOptions(aLabel) {
          let newOption = (
            <option key={Number(aLabel.id)} value={Number(aLabel.id)}>
              {aLabel.name}
            </option>
          );

          return newOption;
        }

        function mapLabelDescriptions(aLabel) {
          return aLabel.col3;
        }

        return newData;
      });

      setFormData((prevData) => {
        _logger("Show Element");
        let newData = { ...prevData };
        newData.showElements = prevData.isEdit;

        return newData;
      });
    }
  };

  const onGetAllTypeLabelsError = (error) => {
    _logger("Failed to get Compensation Types", error);
    toastr.error("Failed to get Compensation Types", error);
  };

  const handleSubmit = (values) => {
    _logger("form data submitted", values);

    const payload = {
      orgId: Number.parseInt(values.organizationId),
      name: values.name,
      description: values.description,
    };

    if (values.isEdit) {
      let pckID = values.packageId;

      _logger("handleSubmit UPDATE", pckID, payload);

      const successUpdateHandler = onUpdateCompensationPackageSuccess(
        pckID,
        payload
      );
      compensationPackageService
        .updatePackage(pckID, payload)
        .then(successUpdateHandler)
        .catch(onUpdateCompensationPackageFail);
    } else {
      _logger("handleSubmit ADD", payload);

      const relayPayloadOnSuccess = (response) => {
        onAddCompensationPackageSuccess(response, payload);
      };

      compensationPackageService
        .addCompensationPackage(payload)
        .then(relayPayloadOnSuccess)
        .catch(onAddCompensationPackageFail);
    }
  };

  const onUpdateCompensationPackageSuccess = (pckID, payload) => {
    _logger(
      "onUpdateCompensationPackageSuccess: Successfully updated a compensation package",
      pckID,
      payload
    );

    toastr.success("You have edited a compensation package!");
  };

  const onUpdateCompensationPackageFail = (error) => {
    _logger("Unable to add a compensation package", error);
    toastr.error("Something went wrong. Please try again.");
  };

  const onAddCompensationPackageSuccess = (response, payload) => {
    _logger(
      "onAddCompensationPackageSuccess: Successfully added a compensation package",
      response
    );

    toastr.success(
      "You have succesfully created a new compensation package! You may now edit its elements, now."
    );

    setFormData((prevData) => {
      let newForm = { ...prevData };

      newForm.packageId = response?.item;
      newForm.name = payload.name;
      newForm.description = payload.description;

      newForm.headerTitle = "Edit This Compensation Package";
      newForm.headerText = "Use this form to edit this compensation package.";
      newForm.resetOrUndoText = "Undo";

      newForm.showElements = true;
      newForm.isEdit = true;

      return newForm;
    });
  };

  const onAddCompensationPackageFail = (error) => {
    _logger("Unable to add a compensation package", error);
    toastr.error("Something went wrong. Please try again.");
  };

  const onCancel = () => {
    navigate("/jobs/compensations/packages");
  };

  return (
    <Row>
      <Col>
        <Card className="col-12" variant="outlined">
          <Card.Header className="compCardHeader text-center">
            <Card.Title className="bold">{formData.headerTitle}</Card.Title>
            <h6 className="card-subtitle text-muted">{formData.headerText}</h6>
          </Card.Header>
          <Card.Body className="compCardBody">
            <Formik
              enableReinitialize={true}
              initialValues={formData}
              onSubmit={handleSubmit}
              validationSchema={compensationPackageFormSchema}
            >
              <Form className="compForm">
                <BootstrapForm.Group as={Row} className="mb-3">
                  <BootstrapForm.Label column className="text-left text-nowrap">
                    Organization:
                  </BootstrapForm.Label>
                  <Col sm={12}>
                    <h3>{formData.organization}</h3>
                  </Col>
                </BootstrapForm.Group>
                <BootstrapForm.Group as={Row} className="mb-3">
                  <BootstrapForm.Label column className="text-left text-nowrap">
                    Name:
                  </BootstrapForm.Label>
                  <Col sm={12}>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder=""
                    />
                    <ErrorMessage
                      component="div"
                      name="name"
                      className="compensations-has-error"
                    />
                  </Col>
                </BootstrapForm.Group>

                <BootstrapForm.Group as={Row} className="mb-3">
                  <BootstrapForm.Label column className="text-left text-nowrap">
                    Description:
                  </BootstrapForm.Label>
                  <Col sm={12}>
                    <Field
                      component="textarea"
                      name="description"
                      id="description"
                      className="form-control"
                      placeholder=""
                    />
                    <ErrorMessage
                      component="div"
                      name="description"
                      className="compensations-has-error"
                    />
                  </Col>
                </BootstrapForm.Group>
                <Row>
                  <Col>
                    {formData.isEdit ? (
                      <Button type="submit" variant="success" className="mx-2">
                        Update
                      </Button>
                    ) : (
                      <Button type="submit" variant="primary" className="mx-2">
                        Submit
                      </Button>
                    )}
                  </Col>
                  <Col>
                    <Button type="reset" variant="warning" className="mx-2">
                      {formData.resetOrUndoText}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={onCancel}
                      variant="danger"
                      className="mx-2"
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Formik>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        {formData.showElements && (
          <CompensationElementForm
            typeOptions={formData.typesOptions}
            packageID={formData.packageId}
          ></CompensationElementForm>
        )}
      </Col>
    </Row>
  );
}

CompensationPackageForm.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default CompensationPackageForm;

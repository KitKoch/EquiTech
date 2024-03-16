import React, { useEffect, useState } from "react";
import "./compensationpackages.css";
 
import PropTypes from "prop-types";
import { Formik, FieldArray, Field, Form, ErrorMessage } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Select from "react-select";
import { Trash } from "react-feather";
import compensationElementFormSchema from "../../schemas/compensationElementFormSchema";
import compensationElementService from "../../services/compensationElementService";
import toastr from "toastr";

import debug from "sabio-debug";
const _logger = debug.extend("CompensationElementForm");

function CompensationElementForm(props) {
  const [formData, setFormData] = useState({
    packageElements: [],
    typesOptions: props?.typeOptions,
  });

  useEffect(() => {
    _logger("props", props);

    compensationElementService
      .getElementByPackageId(props.packageID)
      .then(onGetElementByCompIdSuccess)
      .catch(onGetElementByCompIdError);
  }, []);

  const onGetElementByCompIdSuccess = (response) => {
    _logger("onGetElementByCompIdSuccess", response);
    _logger("prevData formData", formData);

    let elements = response?.items;
    if (elements) {
      setFormData((prevData) => {
        let newData = { ...prevData };
        newData.packageElements = elements.map(mapElements);

        function mapElements(aElement) {
          let typeOption = prevData.typesOptions.findIndex(findType);

          let element = null;
          function findType(aType) {
            return (aType.value = aElement.compensationType.id);
          }

          if (typeOption >= 0) {
            element = {
              typeId: aElement.compensationType.id,
              typeName: aElement.compensationType.name,
              value: aElement.numericValue,
              label: aElement.compensationLabel.id,
              labelOptions: prevData.typesOptions[typeOption].labelOptions,
              labelDescriptions:
                prevData.typesOptions[typeOption].labelDescriptions,
            };
          }

          return element;
        }
        _logger("newData", newData);

        return newData;
      });
    }
  };

  const onGetElementByCompIdError = (error) => {
    _logger("onGetElementByCompIdError", error);
  };

  const handleSumbit = (values) => {
    _logger("handleSumbit", values, props.packageID);

    const deleteHandler = onDeleteElementByPckIdSuccess(
      props.packageID,
      values
    );

    compensationElementService
      .deleteCompensationElementByTypeId(props.packageID)
      .then(deleteHandler)
      .catch(onDeleteElementByPckIdError);
  };

  const onDeleteElementByPckIdSuccess = (packageID, values) => {
    _logger("onDeleteElementByPckIdSuccess", packageID, values);

    let batchElements = [];

    values.packageElements.forEach((pckElement) => {
      let batchEle = {
        CompensationPackageId: Number(packageID),
        CompensationTypeId: Number(pckElement.typeId),
        CompensationLabelId: Number(pckElement.label),
        NumericValue: Number(pckElement.value),
      };
      batchElements.push(batchEle);
    });

    _logger("batchElements", batchElements);

    compensationElementService
      .addBatchCompensationElement(batchElements)
      .then(onAddBatchElementSuccess)
      .catch(onAddBatchElementError);
  };

  const onDeleteElementByPckIdError = (error) => {
    _logger("onDeleteElementByPckIdError", error);
    toastr.error(
      "Something went wrong when submitting the Package. Please try again."
    );
  };

  const onAddBatchElementSuccess = (response) => {
    _logger("onAddBatchElementSuccess", response);
    toastr.success("Successfully added elements to the Package");
  };

  const onAddBatchElementError = (error) => {
    _logger("onAddBatchElementError", error);
    toastr.error("Failed add elements to the Package", error);
  };

  const scrollContainerStyle = { width: "100%", maxHeight: "250px" };

  return (
    <React.Fragment>
      <div className="comp_element_form">
        <Card>
          <Card.Header className="compCardHeader text-center">
            <Card.Title className="bold">Elements</Card.Title>
            <h6 className="card-subtitle text-muted">
              Add and Edit the elements of this Compensation Package
            </h6>
          </Card.Header>

          <Formik
            enableReinitialize={true}
            initialValues={formData}
            onSubmit={handleSumbit}
            validationSchema={compensationElementFormSchema}
            validateOnChange={true}
          >
            {({ values }) => (
              <Form className="compCardBody">
                <div className="form-group">
                  <FieldArray name="packageElements">
                    {({ push, remove }) => (
                      <div>
                        <Row className="row-md-2 my-2 d-flex justify-content-center">
                          <Col sm={9}>
                            {formData.typesOptions && (
                              <Select
                                options={formData.typesOptions}
                                isMulti={false}
                                value={0}
                                placeholder="Select or Search for a Type"
                                onChange={(currentType) =>
                                  push({
                                    typeId: currentType.value,
                                    typeName: currentType.label,
                                    value: "",
                                    label: "",
                                    labelOptions: currentType.labelOptions,
                                    labelDescriptions:
                                      currentType.labelDescriptions,
                                  })
                                }
                              ></Select>
                            )}
                          </Col>
                        </Row>

                        <Row className="row-cols-12 mt-1 element_card_remove_row_gutter">
                          <div
                            className="scrollbar scrollbar-primary"
                            style={scrollContainerStyle}
                          >
                            {values.packageElements &&
                              values.packageElements.map(
                                (packageElement, index) => (
                                  <Col key={index}>
                                    <Card className="comp_element_form_card">
                                      <Card.Body className="compCardBody">
                                        <h4>{packageElement.typeName}</h4>
                                        <Row>
                                          <Field
                                            type="text"
                                            name={`packageElements.${index}.value`}
                                            placeholder="$"
                                          />
                                          <ErrorMessage
                                            component="div"
                                            name={`packageElements.${index}.value`}
                                            className="compensations-has-error"
                                          />
                                        </Row>
                                        <Row>
                                          <Field
                                            as="select"
                                            name={`packageElements.${index}.label`}
                                            placeholder="Select a Label"
                                          >
                                            {packageElement.labelOptions}
                                          </Field>
                                          <ErrorMessage
                                            component="div"
                                            name={`packageElements.${index}.label`}
                                            className="compensations-has-error"
                                          />
                                        </Row>
                                        <Trash
                                          spacing={10}
                                          className="actionBtn text-right"
                                          color="red"
                                          size={18}
                                          onClick={() => remove(index)}
                                        />
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                )
                              )}
                          </div>
                        </Row>

                        <Row className="row-col-2 my-2 ">
                          <Col className="d-flex justify-content-center">
                            <Button
                              type="submit"
                              variant="primary"
                              className="my-1"
                            >
                              Submit Package
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </React.Fragment>
  );
}

CompensationElementForm.propTypes = {
  typeOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      labelDescriptions: PropTypes.arrayOf(PropTypes.string),
      labelOptions: PropTypes.arrayOf(PropTypes.element),
      value: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,

  packageID: PropTypes.number.isRequired,
};

export default CompensationElementForm;

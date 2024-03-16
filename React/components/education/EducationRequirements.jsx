import React, { useEffect, useState } from "react";
import * as lookUpService from "../../services/lookUpService";
import { Field, Formik, Form, ErrorMessage } from "formik";
import {
  Button,
  Card,
  Container,
  Col,
  Row,
  FormLabel as Label,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import educationRequirementsSchema from "../../schemas/educationRequirementsSchema";
import educationRequirementsService from "../../services/educationRequirementsService";
import Swal from "sweetalert2";

const _logger = debug.extend("EducationRequirements");

function EducationRequirements() {
  const formData = {
    name: "",
    description: "",
    educationLevelId: "",
    degreeId: "",
    isExperienceAllowed: false,
    minYears: "",
    terms: false,
  };

  const [degDropDown, setDegDropDown] = useState({
    degreeComponents: [],
    eduLevelComponents: [],
    dropDownDegrees: [],
  });

  const mapSelectOption = (item) => {
    return (
      <option value={item.id} key={"ListA-" + item.id}>
        {item.name}
      </option>
    );
  };

  useEffect(() => {
    lookUpService
      .getTypes(["degrees", "educationlevels"])
      .then(onGetTypeSuccess)
      .catch(onGetTypeError);
  }, []);

  const onGetTypeSuccess = (response) => {
    _logger("Your form was successfully created", response);
    Swal.fire({
      icon: "success",
      title: "Success!",
      confirmButtonText: "Ok",
    });
    const degreeList = response?.item.degrees;
    const eduLevelsList = response?.item.educationlevels;

    setDegDropDown((pState) => {
      const newState = { ...pState };
      newState.degreeComponents = degreeList.map(mapSelectOption);
      newState.eduLevelComponents = eduLevelsList.map(mapSelectOption);
      return newState;
    });
    educationRequirementsService
      .createJobEduReq(values)
      .then(onGetTypeSuccess)
      .catch(onGetTypeError);
  };

  const onGetTypeError = (err) => {
    _logger("onGetTypeError", err);
  };

  const navigate = useNavigate();
  const handleSubmit = (values) => {
    Swal.fire({
      title: "Create new form",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Add form",
      denyButtonText: "Don't save",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/jobs/search");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    _logger("submitted", values);
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Card>
            <Card.Header className="text-center">
              <Card.Title>
                <h1 className="text-center">Education Requirements Form</h1>
              </Card.Title>
            </Card.Header>
            <Tabs defaultActiveKey="first">
              <Tab eventKey="first" title="Form">
                <Card.Body>
                  <Formik
                    enableReinitialize={true}
                    validationSchema={educationRequirementsSchema}
                    initialValues={formData}
                    onSubmit={handleSubmit}
                  >
                    {() => (
                      <Form>
                        <Row className="mb-3">
                          <Col className="form-group" md="6" id="nameInput">
                            <Label>Full Name</Label>
                            <Field
                              className="form-control"
                              type="text"
                              name="name"
                              placeHolder="Insert Name"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-danger"
                            />
                          </Col>

                          <Col className="form-group" md="6" id="degreeInput">
                            <Label>Degree</Label>
                            <Field
                              className="form-control"
                              component="select"
                              name="degreeId"
                            >
                              <option value="">Select</option>
                              {degDropDown.degreeComponents}
                            </Field>
                            <ErrorMessage
                              name="degreeId"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col
                            className="form-group"
                            md="6"
                            id="educationLevelInput"
                          >
                            <Label>Education Level</Label>
                            <Field
                              className="form-control"
                              component="select"
                              placeHolder="Select"
                              name="educationLevelId"
                            >
                              <option value="">Select</option>
                              {degDropDown.eduLevelComponents}
                            </Field>
                            <ErrorMessage
                              name="educationLevelId"
                              component="div"
                              className="text-danger"
                            />
                          </Col>

                          <Col
                            className="form-group"
                            md="6"
                            id="minimumYearsInput"
                          >
                            <Label>Minimum Years</Label>
                            <Field
                              className="form-control"
                              type="number"
                              placeHolder="Years"
                              name="minYears"
                            />
                            <ErrorMessage
                              name="minYears"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col
                            className="form-group"
                            md="12"
                            id="descriptionInput"
                          >
                            <Label>Description</Label>
                            <Field
                              className="form-control"
                              component="textarea"
                              name="description"
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col
                            className="text-center mx-auto"
                            md="6"
                            id="isExperienceAllowedInput"
                          >
                            <Label>Are You Experienced?</Label>
                            <Field
                              type="checkbox"
                              name="isExperienceAllowed"
                              className="form-check-Form.Label"
                            ></Field>
                            <ErrorMessage
                              name="isExperienceAllowed"
                              component="div"
                              className="text-danger"
                            />
                          </Col>
                        </Row>

                        <Row>
                          <div className="text-center">
                            <Button type="submit" className="mx-auto">
                              Submit form
                            </Button>
                          </div>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Card.Body>
              </Tab>
              <Tab eventKey="second" title="Jobs">
                This tab will have specific job info to the form user
              </Tab>
            </Tabs>
          </Card>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default EducationRequirements;

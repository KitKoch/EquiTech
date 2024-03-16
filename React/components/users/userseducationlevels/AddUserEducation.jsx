import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Container,
  Row,
  Card,
  Col,
  FormLabel as Label,
  Button,
} from "react-bootstrap";
import { getTypes } from "../../../services/lookUpService";
import schoolService from "../../../services/schoolService";
import userEducationService from "../../../services/userEducationService";
import userEducationFormSchema from "../../../schemas/userEducationFormSchema";
import "./user-education.css";
import toastr from "toastr";
import CreatableSelect from "react-select/creatable";

const _logger = debug.extend("EducationLevel");

function AddUserEducation(props) {
  const initialValues = {
    schoolId: 0,
    educationLevelId: "",
    degrees: [],
    description: "",
    startDate: "",
    endDate: "",
    terms: false,
  };
  const [storedDegrees, setStoredDegrees] = useState([]);
  const [educationLevels, setEducationLvls] = useState([]);
  const [schools, setSchools] = useState([]);
  const [newDegrees, setNewDegrees] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getTypes(["degrees", "educationLevels"])
      .then(onGetAllLookUpTablesSuccess)
      .catch(onGetAllLookUpTablesError);

    schoolService
      .getAll()
      .then(onGetAllSchoolsSuccess)
      .catch(onGetAllSchoolsError);
  }, [props]);

  const onGetAllLookUpTablesSuccess = (response) => {
    const allDegrees = response.item.degrees;
    const allEducationLvls = response.item.educationLevels;
    if (storedDegrees.length !== allDegrees.length) {
      _logger("These are all the Degrees:", allDegrees);
      setStoredDegrees((prevState) => {
        let updatedDegrees = [...prevState];
        updatedDegrees = allDegrees;
        return updatedDegrees;
      });
    }
    if (educationLevels.length !== allEducationLvls.length) {
      _logger("These are all the EducationLevels:", allEducationLvls);
      setEducationLvls((prevState) => {
        let updatedEducationLvls = [...prevState];
        updatedEducationLvls = allEducationLvls;
        return updatedEducationLvls;
      });
    }
  };

  const onGetAllSchoolsSuccess = (response) => {
    const allSchools = response.items;
    if (schools.length !== allSchools.length) {
      _logger("These are all the Schools:", allSchools);
      setSchools((prevState) => {
        let updatedSchools = [...prevState];
        updatedSchools = allSchools;
        return updatedSchools;
      });
    }
  };
  const onAddWithDegreesSuccess = () => {
    toastr.success("Your Education Level Record has been created successfully");
    navigate("/dashboard/user/education/showlist");
  };

  const onGetAllLookUpTablesError = (error) => {
    _logger("onGetAllLookUpTablesError:", error);
    toastr.error("ERROR: (404)=> LookUp Tables");
  };
  const onGetAllSchoolsError = (error) => {
    _logger("onGetAllSchoolsError:", error);
    toastr.error("ERROR: (404)=> Schools");
  };
  const onAddWithDegreesError = () => {
    toastr.error("ERROR: Unable to create new record");
  };

  const selectMapper = (item) => {
    return (
      <option value={item.id} key={`${item.name}_${item.id}`}>
        {item.name}
      </option>
    );
  };
  const creatableSelectMapper = (degree) => {
    return { value: degree.name, label: degree.name };
  };

  const handleChange = (selectedOption) => {
    setNewDegrees(() => selectedOption);
  };

  const onSubmitRequest = (values) => {
    if (values.schoolId === 0) {
      values.schoolId = null;
    }
    if (values.endDate === "") {
      values.endDate = null;
    }
    if (newDegrees.length > 0) {
      const degreesToSubmit = newDegrees.map((degree) => {
        return degree.label;
      });
      values.degrees = degreesToSubmit;

      _logger("From Formik Submit => MULTIPLE DEGREES INSERT:", values);

      userEducationService
        .addWithDegrees(values)
        .then(onAddWithDegreesSuccess)
        .catch(onAddWithDegreesError);
    } else {
      _logger("From Formik Submit => STANDAR INSERT:", values);

      userEducationService
        .addRecord(values)
        .then(onAddWithDegreesSuccess)
        .catch(onAddWithDegreesError);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Card>
            <Card.Header className="text-center">
              <Card.Title>
                <h1 className="text-primary">Add your Studies!</h1>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmitRequest}
                validationSchema={userEducationFormSchema}
              >
                <Form>
                  <Row className="mb-3">
                    <Col className="form-group" md="6" id="educationLevelInput">
                      <Label>Whats your Education Level?</Label>
                      <Field
                        component="select"
                        name="educationLevelId"
                        className="form-control"
                        placeholder="Select Degree"
                      >
                        <option value="">Select your Education Level</option>
                        {educationLevels.map(selectMapper)}
                      </Field>
                      <ErrorMessage
                        name="educationLevelId"
                        component="div"
                        className="user-education-formik-error-message"
                      />
                    </Col>

                    <Col className="form-group" md="6" id="schoolInput">
                      <Label>Tell us where you Study!</Label>
                      <Field
                        component="select"
                        name="schoolId"
                        className="form-control"
                        placeholder="Select your School"
                      >
                        <option value="">Select your School</option>
                        {schools.map(selectMapper)}
                      </Field>
                      <ErrorMessage
                        name="schoolId"
                        component="div"
                        className="user-education-formik-error-message"
                      />
                    </Col>
                  </Row>

                  <Row className="form-group mb-3" id="degreesInput">
                    <Label>
                      If your degree is not here, Type it! Remember each degree
                      has to match the school and the dates!
                    </Label>
                    <CreatableSelect
                      name="multipleDegrees"
                      options={storedDegrees.map(creatableSelectMapper)}
                      isClearable={true}
                      isSearchable={true}
                      isMulti
                      onChange={handleChange}
                    />
                  </Row>

                  <Row className="form-group mb-3" id="descriptionInput">
                    <Label>Tell us more about your studies!</Label>
                    <Field
                      type="text"
                      name="description"
                      placeholder="A Basic description it's nice to have! But it's completely optional."
                      className="form-control user-education-textarea"
                      as="textarea"
                      rows={7}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="user-education-formik-error-message"
                    />
                  </Row>

                  <Row>
                    <Col className="form-group" id="startDateInput">
                      <Label>When did you start your studies?</Label>
                      <Field
                        type="date"
                        name="startDate"
                        className="form-control"
                        placeholder="MM-DD-YYYY"
                      />
                      <ErrorMessage
                        name="startDate"
                        component="div"
                        className="user-education-formik-error-message"
                      />
                    </Col>

                    <Col className="form-group" id="endDateInput">
                      <Label>When did you finish them?</Label>
                      <Field
                        type="date"
                        name="endDate"
                        className="form-control"
                        placeholder="MM-DD-YYYY"
                      />
                      <ErrorMessage
                        name="endDate"
                        component="div"
                        className="user-education-formik-error-message"
                      />
                    </Col>
                  </Row>
                  <Row className="justify-content-center mt-3">
                    <Button type="submit">Submit!</Button>
                  </Row>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AddUserEducation;

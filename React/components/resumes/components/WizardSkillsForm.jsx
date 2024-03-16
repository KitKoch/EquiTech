import React, { useState, useEffect } from "react";
import { withFormik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as lookupService from "../../../services/lookUpService";
import * as skillService from "../../../services/skillService";
import PropTypes from "prop-types";
import Select from "react-select";
import { Container, InputGroup, Row, Col, Card, Button } from "react-bootstrap";
import wizardSkillsSchema from "../../../schemas/wizardSkillsSchema";

const WizardSkillsForm = (props) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    onBack,
    nextLabel,
    backLabel,
  } = props;

  const _logger = debug.extend("skills");

  const [pageData, setPageData] = useState({
    skills: [],
    skillsComponent: [],
    experienceLevels: "",
    experienceLevelsComponent: [],
    skillId: 0,
    experienceLevelId: 0,
    years: 0,
    months: 0,
  });

  useEffect(() => {
    getData(props.types);
    _logger(props.types);
  }, []);
  props.types;
  const getData = (data) => {
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.experienceLevelsComponent = [data.experienceLevels.map(mapExp)];
      newState.experienceLevelId = data.experienceLevels[0];
      _logger("this is data", data);
      _logger("this is newstate", newState);
      return newState;
    });
    skillService.selectAll().then(getSuccess).catch(getError);
    lookupService.get3Col("ExperienceLevels").then(getSuccess).catch(getError);
  };

  const getSuccess = (data) => {
    _logger(data);
    setPageData((prevState) => {
      const newState = { ...prevState };
      if (data.items[0].col3) {
        newState.experienceLevels = data.items;
        newState.experienceLevelsComponent = data.items.map(mapExp);
      } else {
        newState.skills = data.items;
        newState.skillsComponent = data.items.map(mapSkills);
      }
      return newState;
    });
  };

  const getError = (error) => {
    _logger(error);
  };

  const mapSkills = (skill) => {
    return { value: skill.id, label: skill.name };
  };

  const mapExp = (exp) => {
    return (
      <option key={"ListA-" + exp.id} value={exp.id}>
        {exp.name}
      </option>
    );
  };

  const onUpdateSkills = (addSkill) => {
    _logger(addSkill, "updated skills");
    setFieldValue("skills", addSkill);
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.skills = addSkill;
      _logger("log new skills (State)", newState);
      return newState;
    });
  };

  return (
    <Container>
      <Row className="justify-content-center g-0 min-vh-100">
        <Col lg={8} md={8} className="py-8 py-xl-0">
          <Card>
            <Card.Header>
              <h1 className="ms-3 text-primary">Skills & Experience</h1>
            </Card.Header>
            <Card.Body>
              <FormikForm initialvalues={pageData} onSubmit={handleSubmit}>
                <Select
                  placeholder="Select Skills..."
                  name="skills"
                  id="skills"
                  isMulti
                  options={pageData.skillsComponent}
                  onChange={onUpdateSkills}
                />
                <div className="form-group">
                  <label htmlFor="experienceLevels">
                    Choose your Experience Level:
                  </label>
                  <InputGroup className="mb-3">
                    <Field
                      as="select"
                      className={`form-control mb-2 ${
                        errors.experienceLevels &&
                        touched.experienceLevels &&
                        "is-invalid"
                      }`}
                      name="experienceLevels"
                      id="experienceLevels"
                      value={values?.experienceLevels}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value={0}>Select Experience Level</option>
                      {pageData.experienceLevelsComponent}
                      {""}
                    </Field>
                  </InputGroup>
                  <ErrorMessage
                    name="experienceLevels"
                    component="div"
                    className="text-danger"
                  ></ErrorMessage>
                </div>
                <label className="mb-1 justify-content-center">
                  How much experience do you have?
                </label>
                <div className="form-group d-flex">
                  <label htmlFor="years" className="mt-1">
                    Years:
                  </label>
                  <InputGroup className="mb-3">
                    <Field
                      type="number"
                      name="years"
                      className={`form-control flex-end mb-2 ms-1 ${
                        errors.years && touched.years && "is-invalid"
                      }`}
                      value={values?.years}
                    ></Field>
                  </InputGroup>
                  <ErrorMessage
                    name="years"
                    component="div"
                    className="text-danger form-control flex-end mb-2 ms-1"
                  ></ErrorMessage>

                  <label htmlFor="months" className="mt-1">
                    Months:
                  </label>
                  <InputGroup className="mb-3">
                    <Field
                      type="number"
                      name="months"
                      value={values?.months}
                      className={`form-control flex-end mb-2 ms-1 ${
                        errors.months && touched.months && "is-invalid"
                      }`}
                    ></Field>
                  </InputGroup>
                  <ErrorMessage
                    name="months"
                    component="div"
                    className="text-danger"
                  ></ErrorMessage>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button
                    type="btn"
                    className="mt-1"
                    onClick={onBack}
                    disabled={isSubmitting}
                  >
                    {backLabel}
                  </Button>
                  <Button
                    type="submit"
                    className="mt-1"
                    disabled={isSubmitting}
                  >
                    {nextLabel}
                  </Button>
                </div>
              </FormikForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

WizardSkillsForm.propTypes = {
  types: PropTypes.shape({
    experienceLevels: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
  resume: PropTypes.shape({
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
      })
    ),
    experienceLevels: PropTypes.string,
    years: PropTypes.number,
    months: PropTypes.number,
  }).isRequired,
  values: PropTypes.shape({
    skillId: PropTypes.number,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
      })
    ),
    experienceLevels: PropTypes.string,
    years: PropTypes.number,
    months: PropTypes.number,
  }).isRequired,
  errors: PropTypes.shape({
    skills: PropTypes.string,
    experienceLevels: PropTypes.string,
    years: PropTypes.string,
    months: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.bool,
        label: PropTypes.bool,
      })
    ),
    experienceLevels: PropTypes.bool,
    years: PropTypes.bool,
    months: PropTypes.bool,
  }).isRequired,
  onNext: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  backLabel: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    skills: props.resume.skills,
    experienceLevels: props.resume.experienceLevels,
    years: props.resume.years,
    months: props.resume.months,
  }),

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },

  validationSchema: wizardSkillsSchema,
})(WizardSkillsForm);

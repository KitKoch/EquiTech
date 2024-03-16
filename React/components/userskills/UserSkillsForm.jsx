import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik, ErrorMessage, Field } from "formik";
import * as lookupService from "../../services/lookUpService";
import * as skillService from "../../services/skillService";
import userSkillSchema from "../../schemas/userSkillSchema";
import userSkillService from "../../services/userSkillServices";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import "./userskills.css";

const UserSkillsForm = () => {
  const _logger = debug.extend("userskills");
  const navigate = useNavigate();

  const [pageData, setPageData] = useState({
    skills: [],
    mappedSkills: [],
    experienceLevels: [],
    mappedExpLevels: [],
    skillId: 0,
    experienceLevelId: 0,
    years: 0,
    months: 0,
  });
  const location = useLocation();
  _logger("Location", location);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (location.state) {
      setPageData((prev) => {
        const n = { ...prev };
        n.skillId = location.state.skill.id;
        n.experienceLevelId = location.state.experience.id;
        n.years = location.state.years;
        n.months = location.state.months;
        return n;
      });
    }
  }, []);

  const getData = () => {
    skillService.selectAll().then(getSuccess).catch(getError);
    lookupService.get3Col("ExperienceLevels").then(getSuccess).catch(getError);
  };

  const [isFormDirty, setIsFormDirty] = useState(false);

  const resetForm = () => {
    setIsFormDirty(false);
  };

  const getSuccess = (response) => {
    _logger(response);
    setPageData((prev) => {
      const n = { ...prev };
      if (response.items[0].col3) {
        const exp = response.items;
        n.experienceLevels = exp;
        n.mappedExpLevels = exp.map(mapAnOption);
      } else {
        const skillArray = response.items;
        n.skills = skillArray;
        n.mappedSkills = skillArray.map(mapAnOption);
      }
      return n;
    });
  };

  const mapAnOption = (item) => {
    return (
      <option key={item.id} value={item.id}>
        {`${item.name}${!!item.col3 ? ` - ${item.col3}` : ""}`}
      </option>
    );
  };

  const getError = (error) => {
    _logger(error);
  };

  const handleFormSubmit = (values) => {
    _logger("Location", values);
    setIsFormDirty(true);
    if (pageData.skillId) {
      userSkillService
        .updateSkill(values, values.skillId)
        .then(onUpdateUserSkillSuccess)
        .catch(onUpdateUserSkillError);
    } else {
      userSkillService
        .add(values)
        .then(addUserSkillSuccess)
        .catch(addUserSkillError);
    }
  };

  const addUserSkillSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "User skill added",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/user/skills/list");
    });
  };

  const addUserSkillError = (error) => {
    _logger("Add error", error);
    if (error.response && error.response.status === 500) {
      Swal.fire({
        icon: "error",
        title: "Skill has already been added. Try updating skill from list.",
        confirmButtonText: "Try Again",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Could not add user's skill",
        confirmButtonText: "Try Again",
      });
    }
  };

  const onUpdateUserSkillSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "User skill Updated",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/user/skills/list");
    });
  };

  const onUpdateUserSkillError = (error) => {
    _logger("Update error", error);
    Swal.fire({
      icon: "error",
      title: "Could not Update user's skill",
      confirmButtonText: "Try Again",
    });
  };

  const handleSkillsListClick = () => {
    navigate("/user/skills/list");
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={6}>
            <Card className="p-2 users-skills-custom-border">
              <Card.Title className="my-0">
                {pageData.skillId ? (
                  <h1 className="ms-3 text-primary">Update Skill</h1>
                ) : (
                  <h1 className="ms-3 text-primary">Add Skill</h1>
                )}
              </Card.Title>
              <Card.Body>
                <Formik
                  initialValues={pageData}
                  onSubmit={handleFormSubmit}
                  validationSchema={userSkillSchema.addSchema}
                  enableReinitialize={true}
                  dirty={isFormDirty}
                  onReset={resetForm}
                >
                  {({ resetForm }) => (
                    <Form>
                      <div className="form-group">
                        <label htmlFor="skillId">
                          Choose a skill from the list:
                        </label>
                        <Field
                          as="select"
                          name="skillId"
                          className="form-control mb-2"
                        >
                          <option>Select skill</option>
                          {pageData.mappedSkills}
                        </Field>
                        <ErrorMessage
                          name="skillId"
                          component="div"
                          className="text-danger"
                        ></ErrorMessage>
                      </div>
                      <div className="form-group">
                        <label htmlFor="experienceLevelId">
                          Choose your experience level:
                        </label>
                        <Field
                          as="select"
                          name="experienceLevelId"
                          className="form-control mb-2"
                        >
                          <option>Select level</option>
                          {pageData.mappedExpLevels}
                        </Field>
                        <ErrorMessage
                          name="experienceLevelId"
                          component="div"
                          className="text-danger"
                        ></ErrorMessage>
                      </div>
                      <label className="mb-1">
                        Enter the number of years and months of experience with
                        this skill:
                      </label>
                      <div className="form-group d-flex">
                        <label htmlFor="years" className="mt-1">
                          Years:
                        </label>
                        <Field
                          type="number"
                          name="years"
                          className="form-control mb-2 flex-end mx-1"
                        ></Field>
                        <ErrorMessage
                          name="years"
                          component="div"
                          className="text-danger"
                        ></ErrorMessage>
                        <label htmlFor="years" className="mt-1">
                          Months:
                        </label>
                        <Field
                          type="number"
                          name="months"
                          className="form-control mb-2 ms-1"
                        ></Field>
                        <ErrorMessage
                          name="months"
                          component="div"
                          className="text-danger"
                        ></ErrorMessage>
                      </div>
                      <div className="d-flex justify-content-between">
                        <Button type="submit" className="mt-1">
                          {pageData.skillId ? "Update Skill" : "Submit"}
                        </Button>
                        <Button
                          type="button"
                          className="mt-1 btn btn-secondary"
                          onClick={handleSkillsListClick}
                        >
                          Skills List
                        </Button>
                        <Button
                          type="reset"
                          className="mt-1 btn btn-danger"
                          onClick={resetForm}
                        >
                          Reset
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserSkillsForm;

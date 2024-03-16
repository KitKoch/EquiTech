import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import toastr from "toastr";
import Swal from "sweetalert2";
import SkillFormSchema from "../../schemas/skillFormSchema";
import * as skillsService from "../../services/skillService";
import * as lookUpService from "../../services/lookUpService";
import "../skills/skills.css";

export default function SkillForm() {
  const _logger = debug.extend("SkillForm");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    industryId: 0,
    isDeleted: false,
  });

  const [industries, setIndustries] = useState({
    industries: [],
    industryNames: [],
  });

  const location = useLocation();

  useEffect(() => {
    lookUpService
      .getTypes(["Industries"])
      .then(onGetIndustriesSuccess)
      .catch(onGetIndustriesError);
  }, []);

  const onGetIndustriesSuccess = (response) => {
    _logger(response, "On get industries success");
    let industryArray = response.item.industries;

    setIndustries((prevState) => {
      let newIndustry = { ...prevState };

      newIndustry.industries = industryArray;
      newIndustry.industryNames = industryArray.map(mapIndustry);

      return newIndustry;
    });
  };

  const mapIndustry = (industry) => {
    return (
      <option value={industry.id} key={`industry_${industry.id}`}>
        {industry.name}
      </option>
    );
  };

  const onGetIndustriesError = (error) => {
    _logger(error, "On get industriesError");
  };

  useEffect(() => {
    if (location.state) {
      const skillData = location.state.payload.skill;

      setFormData((prevState) => {
        let newFormData = { ...prevState };
        newFormData.name = skillData.name;
        newFormData.description = skillData.description;
        newFormData.industryId = skillData.industry.id;
        newFormData.isDeleted = skillData.isDeleted;
        newFormData.id = skillData.id;
        return newFormData;
      });
    }
  }, []);

  const handleSubmit = (values) => {
    let newFormData = { ...values };
    _logger("Submit new skill data", newFormData);

    if (formData.id === null) {
      skillsService
        .addSkill(newFormData)
        .then(onAddSkillSuccess)
        .catch(onAddSkillError);
    } else {
      Swal.fire({
        title: "Are you sure you want to update?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
        dangerMode: true,
      }).then((result) => {
        if (result.isConfirmed) {
          skillsService
            .updateSkill(newFormData, newFormData.id)
            .then(onUpdateSuccess)
            .catch(onUpdateError);
        } else if (result.dismiss) {
          Swal.fire({
            title: "Update cancelled!",
            icon: "info",
          });
        }
      });
    }
  };

  const onAddSkillSuccess = (response) => {
    _logger("Successfully added skill", response);
    toastr.success("Skill is successfully added!");
    setTimeout(() => {
      _logger("This will run after 2 seconds.");
      navigate("/skills/list");
    }, 2000);
  };

  const onAddSkillError = (error) => {
    _logger("On add skill error", error);
    toastr.error("Something went wrong. Please try again.");
  };

  const onUpdateSuccess = (response) => {
    _logger(response, "onUpdateSuccess");
    Swal.fire({
      title: "Skill is successfully updated!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      navigate("/skills/list");
    });
  };

  const onUpdateError = (error) => {
    _logger(error, "onUpdateError");
    Swal.fire({
      title: "Skill is not updated. Please try again.",
      icon: "info",
    });
  };

  return (
    <React.Fragment>
      <Container className="mt-5">
        <Row className="justify-content-center align-items-center">
          <Col lg={5} md={8} xs={6} className="mt-4">
            <Card>
              <Card.Title>
                <h2 className="text-primary text-center mt-4 mb-auto">
                  {formData.id ? "Update Skill" : "Add New Skill"}
                </h2>
              </Card.Title>
              <Card.Body>
                <Formik
                  enableReinitialize={true}
                  initialValues={formData}
                  onSubmit={handleSubmit}
                  validationSchema={SkillFormSchema}
                >
                  <Form>
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="text-dark">
                        Skill Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        autoFocus={true}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="has-error"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="description" className="text-dark">
                        Description
                      </label>
                      <Field
                        type="text"
                        name="description"
                        id="description"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="industryId" className="text-dark">
                        Industry Name
                      </label>
                      <Field
                        as="select"
                        name="industryId"
                        id="industryId"
                        className="form-select"
                      >
                        <option value="">Please choose an industry</option>
                        {industries.industryNames}
                      </Field>
                      <ErrorMessage
                        name="industryId"
                        component="div"
                        className="has-error"
                      />
                    </div>
                    {formData.isDeleted && (
                      <div className="form-group mb-3">
                        <Field
                          type="checkbox"
                          name="isDeleted"
                          id="isDeleted"
                          className="form-check-input"
                        />
                        <label htmlFor="isDeleted" className="form-check-label">
                          Deleted
                        </label>
                      </div>
                    )}
                    <Button type="submit" className="btn btn-primary mb-2">
                      {formData.id ? "Update" : "Submit"}
                    </Button>
                  </Form>
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

import React from "react";
import Loki from "react-loki";
import { DollarSign, List, Briefcase, CheckCircle } from "react-feather";
import "./loki-resume-style.css";
import ResumeWizardPayForm from "./components/WizardPreferencesForm";
import ResumeWizardSkillsForm from "./components/WizardSkillsForm";
import ResumeWizardWorkHistoryForm from "./components/WizardWorkHistoryForm";
import FinalPage from "./components/FinalPage";
import wizardPaySchema from "../../schemas/wizardPaySchema";
import { useState, useEffect } from "react";
import * as lookUpService from "../../services/lookUpService";
import locationServices from "../../services/locationService";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const _logger = logger.extend("Resume");

const ResumesWizard = ({ currentUser }) => {
  _logger(currentUser, Briefcase);

  const [resume, setResume] = useState({
    minimumPay: 0,
    desiredPay: 0,
    isHourly: false,
    skills: [],
    experienceLevels: "",
    years: 0,
    months: 0,
    companyName: "",
    contactReference: "",
    companyEmail: "",
    companyPhone: "",
    locations: "",
    locationName: "",
    industries: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const [types, setTypes] = useState({
    industries: [],
    states: [],
    experienceLevels: [],
    locations: [],
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    lookUpService.get3Col("ExperienceLevels").then(getSuccess).catch(getError);
    lookUpService
      .getTypes(["Industries", "States"])
      .then(lookUpSuccess)
      .catch(lookUpError);
    locationServices
      .getAllPaginated(0, 200)
      .then(locationSuccess)
      .catch(locationError);
  };

  const getSuccess = (data) => {
    setTypes((prev) => {
      _logger("this is experience", data);
      const newState = { ...prev };
      newState.experienceLevels = data.items;
      _logger("Santi", newState);
      return newState;
    });
  };

  const getError = (error) => {
    _logger(error);
  };

  const lookUpSuccess = (data) => {
    _logger("this is data", data);
    setTypes((prevState) => {
      const newState = { ...prevState };
      newState.industries = data.item.industries;
      newState.states = data.item.states;
      return newState;
    });
    _logger("these are types", types);
  };

  const lookUpError = (error) => {
    _logger("lookup error...", error);
  };

  const locationSuccess = (data) => {
    setTypes((prevState) => {
      const newState = { ...prevState };
      newState.locations = data.data.item.pagedItems.map(mapLoc);
      _logger("locations", newState.locations);
      return newState;
    });
  };

  const locationError = (error) => {
    _logger("location error...", error);
  };

  const buttonClicked = (values) => {
    setResume({
      ...resume,
      ...values,
    });
  };

  const filterNames = (value) => {
    let industry = {};
    let industryName = "";
    if (parseInt(value) !== 0) {
      industry = types.industries[value - 1];
      industryName = industry.name;
    }
    return industryName;
  };

  const filterNamesExp = (value) => {
    let experience = {};
    let experienceName = "";
    if (parseInt(value) !== 0) {
      experience = types.experienceLevels[value - 1];
      experienceName = experience.name;
    }
    return experienceName;
  };

  function filterById(aLocation) {
    let result = false;
    if (parseInt(aLocation.id) === parseInt(resume.locations)) {
      result = true;
    }
    return result;
  }

  const filterNamesLoc = (value) => {
    _logger("locationValue", value);
    let location = [];
    let locationFiltered = {};
    let locationName = "";
    if (parseInt(value) !== 0) {
      location = types.locations;
      locationFiltered = location.filter(filterById);
      locationName =
        locationFiltered[0].name + ", " + locationFiltered[0].lineOne;
    }
    return locationName;
  };

  const mapSkillName = (skill) => {
    const skillName = skill.label;
    return `${skillName}`;
  };

  const mapLoc = (location) => {
    return {
      name: location.state.name,
      lineOne: location.lineOne,
      zip: location.zip,
      id: location.id,
    };
  };

  const finishWizard = () => {
    Swal.fire({
      title: `Are you sure you want to submit?`,
      icon: `question`,
      html: `
      <p><strong>Minimum Pay:</strong> <text><strong>$</strong></text>${
        resume?.minimumPay
      }</p>
      <p><strong>Desired Pay:</strong> <text><strong>$</strong></text>${
        resume?.desiredPay
      }</p>
      <p><strong>Pay Type:</strong> ${
        resume?.isHourly ? "Hourly" : "Salary"
      }</p>
      <p><strong>Skills:</strong> ${resume.skills.map(mapSkillName)} </p>
      <p><strong>Experience:</strong> ${filterNamesExp(
        resume.experienceLevels
      )}</p>
      <p><strong>Years:</strong> ${resume.years} <strong>Months:</strong> ${
        resume.months
      }</p>
      <p><strong>Industry:</strong> ${filterNames(resume.industries)}</p>
      <p><strong>Company Name:</strong> ${resume.companyName}</p>
      <p><strong>Reference Contact:</strong> ${resume.contactReference}</p>
      <p><strong>Reference Email:</strong> ${resume.companyEmail}</p>
      <p><strong>Reference Phone Number:</strong>${resume.companyPhone}</p>
      <p><strong>Location:</strong> ${filterNamesLoc(resume.locations)}</p>
      <p><strong>Start Date:</strong> ${resume.startDate.toDateString()}</p>
      <p><strong>End Date:</strong> ${resume.endDate.toDateString()}</p>`,
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#293042",
      showCancelButton: true,
      cancelButtonColor: "4c4f55",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Submitted!`,
          icon: "success",
        });
      }
    });
    _logger(resume, "sweetalert");
  };

  const complexSteps = [
    {
      label: "Salary Preferences",
      icon: <DollarSign className="mt-3" />,
      component: (
        <ResumeWizardPayForm
          resume={resume}
          validationschema={wizardPaySchema}
        />
      ),
    },
    {
      label: "Skills",
      icon: <List className="mt-3" />,
      component: <ResumeWizardSkillsForm resume={resume} types={types} />,
    },
    {
      label: "Work History",
      icon: <Briefcase className="mt-3" />,
      component: <ResumeWizardWorkHistoryForm resume={resume} types={types} />,
    },
    {
      label: "Review",
      icon: <CheckCircle className="mt-3" />,
      component: (
        <FinalPage resume={resume} onFinish={finishWizard} types={types} />
      ),
    },
  ];

  return (
    <>
      <Loki
        steps={complexSteps}
        onNext={buttonClicked}
        onBack={buttonClicked}
        onFinish={finishWizard}
        noActions
      />
    </>
  );
};

ResumesWizard.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default ResumesWizard;

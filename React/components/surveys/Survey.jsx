import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import surveyService from "../../services/surveyService";
import SurveyCard from "./SurveyCard";
import Swal from "sweetalert2";
import { Notyf } from "notyf";

const _logger = debug.extend("Survey");
function Surveys() {
  const notyf = new Notyf();
  const [survey, setSurvey] = useState({ mySurveys: [], mySurveysComp: [] });

  useEffect(() => {
    surveyService
      .getSurveys(0, 10)
      .then(onGetSurveysSuccess)
      .catch(onGetSurveysError);
  }, []);

  const onDeleteSurvey = (element) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        surveyService
          .deleteSurvey(element.id)
          .then(onDeleteSurveySuccess)
          .catch(onDeleteSurveyError);
      }
    });
  };

  const onDeleteSurveySuccess = (response) => {
    _logger(response);
    Swal.fire("Deleted!", "Your file has been deleted.", "success");

    surveyService
      .getSurveys(0, 10)
      .then(onGetSurveysSuccess)
      .catch(onGetSurveysError);
  };

  const onDeleteSurveyError = (err) => {
    _logger(err);
    notyf.error(err);
  };

  const onUpdateStatus = (element) => {
    Swal.fire({
      title: "Select a status",
      input: "select",
      inputOptions: {
        Status: {
          1: "Active",
          2: "Inactive",
          3: "Pending",
          4: "Canceled",
        },
      },
      inputPlaceholder: "Select Status",
      showCancelButton: true,
      inputValidator: (value) => {
        const payload = {
          name: element.name,
          description: element.description,
          statusId: value,
        };
        surveyService.updateSurvey(element.id, payload).then(onUpdateSuccess);
      },
    });
  };
  const onUpdateTitle = (element) => {
    Swal.fire({
      title: "Enter title",
      input: "text",
      inputPlaceholder: "Enter Survey Title",
      showCancelButton: true,
      inputValidator: (value) => {
        const payload = {
          name: value,
          description: element.description,
          statusId: element.surveyStatus.id,
        };
        surveyService.updateSurvey(element.id, payload).then(onUpdateSuccess);
      },
    });
  };

  const onUpdateSuccess = (response) => {
    _logger(response);
    surveyService
      .getSurveys(0, 10)
      .then(onGetSurveysSuccess)
      .catch(onGetSurveysError);
  };

  const onGetSurveysSuccess = (response) => {
    _logger(response);
    let mySurvey = response.item.pagedItems;
    setSurvey((prevState) => {
      const newSt = { ...prevState };
      newSt.mySurveys = mySurvey;
      newSt.mySurveysComp = mySurvey.map(mapSurveys);
      return newSt;
    });
  };
  const onGetSurveysError = (err) => {
    _logger(err);
  };

  const mapSurveys = (survey) => {
    return (
      <SurveyCard
        key={`${"Surveys "}${survey.id}`}
        info={survey}
        option={onUpdateStatus}
        option2={onUpdateTitle}
        onDelete={onDeleteSurvey}
      />
    );
  };

  return (
    <React.Fragment>
      <Helmet title="Surveys" />
      <Row>{survey.mySurveysComp}</Row>
    </React.Fragment>
  );
}

export default Surveys;

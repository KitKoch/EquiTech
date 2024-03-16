import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/surveys`;
const surveyInstanceEndpoint = `${helper.API_HOST_PREFIX}/api/surveysinstances`;

const getSurveys = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}${"/paginate?pageIndex="}${pageIndex}${"&pageSize="}${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateSurvey = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSurveyById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const deleteById = (id) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}/questions/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "applcation/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSurveyQuestionsById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/questions/survey/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const createSurveyInstance = (payload) => {
  const config = {
    method: "POST",
    url: `${surveyInstanceEndpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSurveyQuestions = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/questions/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "applcation/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSurveyInstancesById = (surveyId, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${surveyInstanceEndpoint}/paginatesurvey/${surveyId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "applcation/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSurveyInstancesDetail = (instanceId) => {
  const config = {
    method: "GET",
    url: `${surveyInstanceEndpoint}/${instanceId}/details`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "applcation/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSurveyInstanceById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}instances/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const insertAnswer = (payload) => {
  const config = {
    method: "POST",
    url: surveyInstanceEndpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const surveyService = {
  getSurveys,
  updateSurvey,
  deleteById,
  getSurveyById,
  getSurveyQuestionsById,
  createSurveyInstance,
  getSurveyInstanceById,
  getSurveyQuestions,
  insertAnswer,
  getSurveyById,
  getSurveyInstancesById,
  getSurveyInstancesDetail,
};

export default surveyService;

import axios from "axios";
import * as helper from "../services/serviceHelpers";

const surveyQuestionEndpoint = `${helper.API_HOST_PREFIX}/api/surveys/questions/`;

const addSurveyQuestion = (payload) => {
    const config = {
        method: "POST",
        url: surveyQuestionEndpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
        .then(helper.onGlobalSuccess)
        .catch(helper.onGlobalError);
}

const updateSurveyQuestion = (payload, id) => {
    const config = {
        method: "PUT", 
        url: `${surveyQuestionEndpoint}${id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
        .then(helper.onGlobalSuccess)
        .catch(helper.onGlobalError);
}

const deleteById = (id) => {
    const config = {
        method: "DELETE",
        url: `${surveyQuestionEndpoint}${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
        .then(helper.onGlobalSuccess)
        .catch(helper.onGlobalError);
}

const getSurveyQuestionById = (id) => {
    const config = {
        method: "GET",
        url: `${surveyQuestionEndpoint}${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-type": "application/json" }
    }
    return axios(config)
        .then(helper.onGlobalSuccess)
        .catch(helper.onGlobalError);
}

const getSurveyQuestionsPaged = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `${surveyQuestionEndpoint}paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-type": "application/json" }
    }
    return axios(config)
        .then(helper.onGlobalSuccess)
        .catch(helper.onGlobalError);
}

const getByCreatedBy = (pageIndex, pageSize, userId) => {
    const config = {
        method: "GET",
        url: `${surveyQuestionEndpoint}creator?pageIndex=${pageIndex}&pageSize=${pageSize}&userId=${userId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
        .then(helper.onGlobalSuccess)
        .catch(helper.onGlobalError);
}

const getSurveyQuestionsBySurveyId = (surveyId) => {
    const config = {
        method: "GET",
        url: `${surveyQuestionEndpoint}survey/${surveyId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-type": "application/json" }
    }
    return axios(config)
        .then(helper.onGlobalSuccess)
        .catch(helper.onGlobalError);
} 
export {
    addSurveyQuestion,
    updateSurveyQuestion,
    deleteById,
    getSurveyQuestionById,
    getSurveyQuestionsPaged,
    getByCreatedBy,
    getSurveyQuestionsBySurveyId
};
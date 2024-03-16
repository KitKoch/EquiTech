import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/surveyanswers`;

const addSurveyAnswer = (payload) => {
    const config = {
        method: "POST",
        url: `${endpoint}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
      };
      return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
    };

const getSurveyAnswerByUserId = (id, pageIndex, pageSize) => {
    const config = {
        method:"GET",
        url:`${endpoint}/paginatesurvey/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain:true,
        headers:{"Content-Type":"application/json"}
       };
       return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const surveyAnswersService = { getSurveyAnswerByUserId, addSurveyAnswer };

export default surveyAnswersService;

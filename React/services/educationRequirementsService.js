import axios from "axios";
import * as helper from "../services/serviceHelpers";

const educationRequirementEndPoint = `${helper.API_HOST_PREFIX}/api/requirements/education`;

const createJobEduReq = (payload) => {
  const config = {
    method: "POST",
    url: `${educationRequirementEndPoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteJobEduReq = (id) => {
  const config = {
    method: "DELETE",
    url: `${educationRequirementEndPoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateJobEduReq = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${educationRequirementEndPoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getByJobId = (id) => {
  const config = {
    method: "GET",
    url: `${educationRequirementEndPoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getByEduReqId = (id) => {
  const config = {
    method: "GET",
    url: `${educationRequirementEndPoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getByOrgId = (id) => {
  const config = {
    method: "GET",
    url: `${educationRequirementEndPoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const update = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${educationRequirementEndPoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateIsDeleted = (currentUserId) => {
  const config = {
    method: "DELETE",
    url: `${educationRequirementEndPoint}/${currentUserId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}; 

const educationRequirementsService = { 
  createJobEduReq,
  deleteJobEduReq,
  updateJobEduReq,
  getByJobId,
  getByEduReqId,
  getByOrgId,
  update,
  updateIsDeleted,
}; 
export default educationRequirementsService;

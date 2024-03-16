import axios from "axios";
import * as helper from "../services/serviceHelpers";

const compensationElementEndpoint = `${helper.API_HOST_PREFIX}/api/compensations/elements`;

const getElementById = (id) => {
  const config = {
    method: "GET",
    url: `${compensationElementEndpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getElementByPackageId = (id) => {
  const config = {
    method: "GET",
    url: `${compensationElementEndpoint}/packages/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addCompensationElement = (payload) => {
  const config = {
    method: "POST",
    url: compensationElementEndpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addBatchCompensationElement = (payload) => {
  const config = {
    method: "POST",
    url: `${compensationElementEndpoint}/multiple`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteCompensationElement = (id) => {
  const config = {
    method: "DELETE",
    url: `${compensationElementEndpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteCompensationElementByTypeId = (id) => {
  const config = {
    method: "DELETE",
    url: `${compensationElementEndpoint}/package/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateCompensationElement = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${compensationElementEndpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export default {
  getElementById,
  getElementByPackageId,
  addCompensationElement,
  addBatchCompensationElement,
  deleteCompensationElement,
  deleteCompensationElementByTypeId,
  updateCompensationElement,
};

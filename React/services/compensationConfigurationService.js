import axios from "axios";
import * as helper from "./serviceHelpers";

const compensationTypeLabelEndpoint = `${helper.API_HOST_PREFIX}/api/compensations/configuration`;

const getByIdTypeLabels = (id) => {
  const config = {
    method: "GET",
    url: `${compensationTypeLabelEndpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAllTypeLabelsWithNulls = () => {
  const config = {
    method: "GET",
    url: `${compensationTypeLabelEndpoint}/unfiltered`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAllTypeLabelsWithoutNull = () => {
  const config = {
    method: "GET",
    url: `${compensationTypeLabelEndpoint}/filtered`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addTypeLabels = (payload) => {
  const config = {
    method: "POST",
    url: compensationTypeLabelEndpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateTypeLabelsByTypeId = (payload) => {
  const config = {
    method: "PUT",
    url: compensationTypeLabelEndpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteTypeLabels = (payload) => {
  const config = {
    method: "DELETE",
    url: compensationTypeLabelEndpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const clearAllLabelsByType = (typeId) => {
  const config = {
    method: "DELETE",
    url: `${compensationTypeLabelEndpoint}/${typeId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export {
  getByIdTypeLabels,
  getAllTypeLabelsWithNulls,
  getAllTypeLabelsWithoutNull,
  addTypeLabels,
  updateTypeLabelsByTypeId,
  deleteTypeLabels,
  clearAllLabelsByType,
};

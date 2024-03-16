import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/personalvalues`;
const rankingsEndpoint = `${endpoint}/rankings`;
const relatedEndpoint = `${endpoint}/related`;

//#region Rankings

const getByUserId = () => {
  const config = {
    method: "GET",
    url: `${rankingsEndpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const create = (newPersonalValueRank) => {
  const payload = {
    personalValueId: newPersonalValueRank.personalValue,
    rank: newPersonalValueRank.rank,
    sort: newPersonalValueRank.sort,
  };
  const config = {
    method: "POST",
    url: `${rankingsEndpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteById = (personalValueId) => {
  const config = {
    method: "DELETE",
    url: `${rankingsEndpoint}/${personalValueId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateSort = (payload) => {
  const config = {
    method: "PUT",
    url: `${rankingsEndpoint}/sort`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

//#endregion

//#region Related
const getById = (id) => {
  const config = {
    method: "GET",
    url: `${relatedEndpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const selectAll = () => {
  const config = {
    method: "GET",
    url: `${relatedEndpoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const createRelated = (payload) => {
  const config = {
    method: "POST",
    url: `${relatedEndpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(helper.onGlobalSuccess, payload)
    .catch(helper.onGlobalError);
};

const deleteRelated = (valueAId, valueBId) => {
  const config = {
    method: "DELETE",
    url: `${relatedEndpoint}/${valueAId}/${valueBId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

//#endregion

const personalValuesService = {
  getByUserId,
  create,
  deleteById,
  updateSort,
  createRelated,
  getById,
  selectAll,
  deleteRelated,
};
export default personalValuesService;

import axios from "axios";
import * as helper from "../services/serviceHelpers";

const schoolEndPoint = `${helper.API_HOST_PREFIX}/api/schools`;

const addSchool = (payload) => {
  const config = {
    method: "POST",
    url: `${schoolEndPoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${schoolEndPoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};

const getAll = () => {
  const config = {
    method: "GET",
    url: schoolEndPoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};
const getPaged = (index, size) => {
  const config = {
    method: "GET",
    url: `${schoolEndPoint}/paged?pageIndex=${index}&pageSize=${size}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};
const searchPaged = (index, size, query) => {
  const config = {
    method: "GET",
    url: `${schoolEndPoint}/search?pageIndex=${index}&pageSize=${size}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess);
};

const updateSchool = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${schoolEndPoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const updateVerification = (id) => {
  const config = {
    method: "PUT",
    url: `${schoolEndPoint}/verification/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "form-data" },
  };
  return axios(config);
};

const updateDeleted = (id) => {
  const config = {
    method: "PUT",
    url: `${schoolEndPoint}/delete/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const schoolService = {
  addSchool,
  getAll,
  getPaged,
  searchPaged,
  getById,
  updateSchool,
  updateVerification,
  updateDeleted,
};

export default schoolService;

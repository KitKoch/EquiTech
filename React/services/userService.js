import axios from "axios";
import * as helper from "../services/serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/users`;

const registerUser = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const signIn = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}/login`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const signOut = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/logout`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getCurrent = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/current`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getCurrentUser = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/current/user`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAllUsers = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/?pageIndex=0&pageSize=30`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getCurrentById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getPaginated = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getRelated = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/related`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getByStatus = (statusId, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/status/${statusId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const searchPaginated = (query, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search?query=${query}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const searchAndFilterPaginated = (query, statusId, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/status/search?query=${query}&statusId=${statusId}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateStatus = (userId, statusId) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/status?userId=${userId}&statusId=${statusId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const forgotPassword = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}/forgot`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
    data: payload,
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const changeUserPassword = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/changepassword`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateAvatar = (userId, avatarUrl) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/avatar?userId=${userId}&avatarUrl=${avatarUrl}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateById = (userId, payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${userId}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const changePassword = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/password/edit`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const userService = {
  registerUser,
  signIn,
  signOut,
  getCurrent,
  getCurrentUser,
  getCurrentById,
  getAllUsers,
  getPaginated,
  getByStatus,
  searchPaginated,
  searchAndFilterPaginated,
  updateStatus,
  updateAvatar,
  updateById,
  getRelated,
  changePassword,
  forgotPassword,
  changeUserPassword,
};
export default userService;

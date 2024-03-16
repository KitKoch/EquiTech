import axios from "axios";
import * as helper from "../services/serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/files`;
const { onGlobalSuccess, onGlobalError } = helper;

const uploadFiles = (files) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: files,
    crossdomain: true,
    headers: { "Content-Type": "multipart/form-data" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getConfig = (method, url, body) => {
  const config = {
    method: method,
    url: `${endpoint}/${url}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  if (body) config.data = body;
  return config;
};

const getAllFileList = (pageIndex, pageSize) => {
  const url = `?pageIndex=${pageIndex}&pageSize=${pageSize}`;
  return axios(getConfig("GET", url))
    .then(onGlobalSuccess)
    .catch(onGlobalError);
};
const download = (fileId) => {
  return axios(getConfig("POST", fileId))
    .then(onGlobalSuccess)
    .catch(onGlobalError);
};

const deleteFile = (fileId) => {
  return axios(getConfig("DELETE", fileId))
    .then(onGlobalSuccess)
    .catch(onGlobalError);
};

const recoverFile = (fileId) => {
  return axios(getConfig("POST", `recover/${fileId}`))
    .then(onGlobalSuccess)
    .catch(onGlobalError);
};
const searchFile = (
  pageIndex,
  pageSize,
  query = "",
  isSorting = false,
  sortingType = false,
  isAscending = false,
  isUser = false,
  fileType = 0,
  extension = "",
  isDeleted
) => {
  const url = `search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}&isSorting=${isSorting}&sortingType=${sortingType}&isAscending=${isAscending}&isUser=${isUser}&fileType=${fileType}&extension=${extension}&isDeleted=${isDeleted}`;

  return axios(getConfig("GET", url))
    .then(onGlobalSuccess)
    .catch(onGlobalError);
};

export {
  uploadFiles,
  getAllFileList,
  download,
  searchFile,
  deleteFile,
  recoverFile,
};

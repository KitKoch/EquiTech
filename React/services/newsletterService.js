import axios from "axios";
import { API_HOST_PREFIX } from "../services/serviceHelpers";
import * as helper from "../services/serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/newsletters`;

const getPaginated = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getCategory = (categoryId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/category/${categoryId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getNewslettersByCatagoryTypes = (pageIndex, pageSize, newsletterType) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginate/category/${newsletterType}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const add = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAll = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const newsletterService = {
  getPaginated,
  getCategory,
  getAll,
  add,
  getNewslettersByCatagoryTypes,
};

export default newsletterService;

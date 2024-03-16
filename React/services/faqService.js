import axios from "axios";
import * as helper from "../services/serviceHelpers";

const faqEndPoint = `${helper.API_HOST_PREFIX}/api/faqs`;

const addFaq = (payload) => {
  const config = {
    method: "POST",
    url: `${faqEndPoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAll = () => {
  const config = {
    method: "GET",
    url: `${faqEndPoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateFaq = (payload) => {
  const config = {
    method: "PUT",
    url: `${faqEndPoint}/${payload.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteById = (id) => {
  const config = {
    method: "DELETE",
    url: `${faqEndPoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getByCategory = (id) => {
  const config = {
    method: "GET",
    url: `${faqEndPoint}/category/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const faqService = {
  addFaq,
  getAll,
  updateFaq,
  deleteById,
  getByCategory,
};

export default faqService;

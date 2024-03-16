import axios from "axios";
import * as helper from "../services/serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/podcasts`;

const GetAll = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/all`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const Delete = (id) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const Add = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    crossdomain: true,
    data: payload,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const Update = (payload) => {
  let id = payload.id;
  const config = {
    method: "PUT",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    data: payload,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const Search = (query) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search?pageIndex=0&pageSize=50&query=${query}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const podcastService = { GetAll, Delete, Add, Update, Search };
export default podcastService;

import axios from "axios";
import * as helper from "../services/serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/charitablefund`;

const createCharitableFund = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateCharitableFund = (payload) => {
  const config = {
    method: "PUT",
    url: `${endpoint}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getCharitableFund = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteCharitableFund = (payload) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const charitableFundService = {
  createCharitableFund,
  updateCharitableFund,
  getCharitableFund,
  deleteCharitableFund,
};
export default charitableFundService;

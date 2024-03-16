import axios from "axios";
import * as helper from "../services/serviceHelpers";

const API_HOST_PREFIX = process.env.REACT_APP_API_HOST_PREFIX;

const endpoint = `${API_HOST_PREFIX}/api/messages`;

const sendMessage = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getMessageThread = (id) => {
  const config = {
    method: "GET",
    url: endpoint + "/thread/" + id,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export { sendMessage, getMessageThread };

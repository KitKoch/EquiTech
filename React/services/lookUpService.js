import axios from "axios";
import * as helper from "../services/serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/lookups`;

const getTypes = (types) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: types,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const get3Col = (table) => {
  const config = {
    method: "GET",
    url: `${endpoint}?tableName=${table}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export { getTypes, get3Col };

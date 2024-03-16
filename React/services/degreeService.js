import axios from "axios";
import * as helper from "../services/serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/lookups`;

const addDegree = (newDegrees) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: newDegrees,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

export { addDegree };
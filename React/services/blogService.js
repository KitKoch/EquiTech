import axios from "axios";
import * as helper from "../services/serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/blogs`;

const addBlog = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getBlogsByLatestDate = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/bydate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const blogService = { addBlog, getBlogsByLatestDate };
export default blogService;

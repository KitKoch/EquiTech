import axios from "axios";
import * as helper from "../services/serviceHelpers";

const blogsEndpoint = `${helper.API_HOST_PREFIX}/api/blogs/`;

const getBlogs = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${blogsEndpoint}paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getBlogsByTypes = (pageIndex, pageSize, blogType) => {
  const config = {
    method: "GET",
    url: `${blogsEndpoint}paginate/blogType/${blogType}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const searchBlogs = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${blogsEndpoint}search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}&blogTypeId=0`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const blogsService = { getBlogs, getBlogsByTypes, searchBlogs };
export default blogsService;

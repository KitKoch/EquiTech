import axios from "axios";
import * as helper from "../services/serviceHelpers";
const forumsEndpoint = `${helper.API_HOST_PREFIX}/api/forums/`;

const SelectAllCategories = () => {
  const config = {
    method: "GET",
    url: `${forumsEndpoint}categories`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getForumsByCat = (id, pI, pS) => {
  const config = {
    method: "GET",
    url: `${forumsEndpoint}paginated?categoryId=${id}&pageIndex=${pI}&pageSize=${pS}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getThreadByForumId = (id) => {
  const config = {
    method: "GET",
    url: `${forumsEndpoint}threads/${id} `,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getByParentId = (id, pI, pS) => {
  const config = {
    method: "GET",
    url: `${forumsEndpoint}threads/parent?parentId=${id}&pageIndex=${pI}&pageSize=${pS}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const postThread = (payload) => {
  const config = {
    method: "POST",
    url: `${forumsEndpoint}threads`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const forumsServices = {
  SelectAllCategories,
  getForumsByCat,
  getThreadByForumId,
  getByParentId,
  postThread,
};
export default forumsServices;

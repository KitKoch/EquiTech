import axios from "axios";
import * as helper from "../services/serviceHelpers";

const jobsEndpoint = `${helper.API_HOST_PREFIX}/api/jobs`;

const addJob = (payload) => {
  const config = {
    method: "POST",
    url: `${jobsEndpoint}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getJobsPaginated = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${jobsEndpoint}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getJobsSearch = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${jobsEndpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getJobsByLocation = (
  pageIndex,
  pageSize,
  latitude,
  longitude,
  radius
) => {
  const config = {
    method: "GET",
    url: `${jobsEndpoint}/geolocation?pageIndex=${pageIndex}&pageSize=${pageSize}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getJobById = (jobId) => {
  const config = {
    method: "GET",
    url: `${jobsEndpoint}/${jobId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json"}
  }
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const getJobAppByOrgId = (pageIndex, pageSize, orgId) => {
  const config = {
    method: "GET",
    url: `${jobsEndpoint}/applications/organizationid/?pageIndex=${pageIndex}&pageSize=${pageSize}&organizationId=${orgId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json"}
  }
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const searchApplicationsByOrg = (pageIndex, pageSize, orgId, query) => {
  const config = {
      method: "GET",
      url: `${jobsEndpoint}/applications/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&organizationId=${orgId}&query=${query}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const jobService = {
  addJob,
  getJobsPaginated,
  getJobsSearch,
  getJobsByLocation,
  getJobById,
  getJobAppByOrgId,
  searchApplicationsByOrg
};
export default jobService;

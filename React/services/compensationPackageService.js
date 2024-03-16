import axios from "axios";
import * as helper from "../services/serviceHelpers";

const compensationPackageEndpoint = `${helper.API_HOST_PREFIX}/api/compensations/packages`;

const addCompensationPackage = (payload) => {
  const config = {
    method: "POST",
    url: compensationPackageEndpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getPackagesByOrgIdPaged = (pageIndex, pageSize, orgId) => {
  const config = {
    method: "GET",
    url: `${compensationPackageEndpoint}/paginated?orgId=${orgId}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deletePackage = (id) => {
  const config = {
    method: "DELETE",
    url: `${compensationPackageEndpoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updatePackage = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${compensationPackageEndpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export default {
  addCompensationPackage,
  getPackagesByOrgIdPaged,
  deletePackage,
  updatePackage,
};

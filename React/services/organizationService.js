import axios from "axios";
import * as helper from "../services/serviceHelpers";

const organizationUrl = {
  endpoint: `${helper.API_HOST_PREFIX}/api/organizations`,
};

const getOrganizations = (pageIndex, pageSize, nameQuery, orgTypeId) => {
  const config = {
    method: "GET",
    url:
      organizationUrl.endpoint +
      `/locations/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}&nameQuery=${nameQuery}&orgTypeId=${orgTypeId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getOrgs = () => {
  const config = {
    method: "GET",
    url: organizationUrl.endpoint,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getUsersOrgMembership = (userId) => {
  const config = {
    method: "GET",
    url: `${organizationUrl.endpoint}/user/${userId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const organizationServices = {
  getOrganizations,
  getOrgs,
  getUsersOrgMembership,
};
export default organizationServices;

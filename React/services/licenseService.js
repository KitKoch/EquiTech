import axios from "axios";
import * as helper from "./serviceHelpers";
import debug from "sabio-debug";
const _logger = debug.extend("LicensesForm");

const service = {
  endpoint: `${helper.API_HOST_PREFIX}/api/licenses`,
};

const selectAllLicenses = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${service.endpoint}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addLicense = (payload) => {
  _logger("addLicense payload", payload);
  const config = {
    method: "POST",
    url: `${service.endpoint}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateLicense = (payload) => {
  const config = {
    method: "PUT",
    url: `${service.endpoint}/${payload.id}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteLicense = (payload) => {
  const config = {
    method: "DELETE",
    url: `${service.endpoint}/${payload}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export { selectAllLicenses, addLicense, updateLicense, deleteLicense };

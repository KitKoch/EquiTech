import axios from "axios";
import * as helper from "./serviceHelpers";
import debug from "sabio-debug";

const _logger = debug.extend("Newsletters");

const newslettersTemplatesEndPoint = `${helper.API_HOST_PREFIX}/api/newsletters/templates`;

const getAll = (pageIndex, pageSize) => {
  _logger(helper);
  const config = {
    method: "GET",
    url: `${newslettersTemplatesEndPoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const newsletterTemplateService = {
  getAll,
};

export default newsletterTemplateService;

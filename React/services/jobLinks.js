import axios from "axios";
import * as helper from "../services/serviceHelpers";

const jobLinksEndpoint = `${helper.API_HOST_PREFIX}/api/joblinks/`;

const getJobLinksByOrgId = (pageIndex, pageSize, orgId) => {
  const config = {
    method: "GET",
    url: `${jobLinksEndpoint}organization/${orgId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const jobLinksService = {
  getJobLinksByOrgId,
};

export default jobLinksService;

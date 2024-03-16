import axios from "axios";
import * as helper from "../services/serviceHelpers";

const storiesEndpoint = `${helper.API_HOST_PREFIX}/api/shareStory`;

const getStoriesPaged = (pageIndex, pageSize, isApproved) => {
  const config = {
    method: "GET",
    url: `${storiesEndpoint}/paginate?pageSize=${pageSize}&pageIndex=${pageIndex}&isApproved=${isApproved}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}
const addStory =(payload) => {
  const config = {
    method: "POST",
    url: storiesEndpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  }

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export { getStoriesPaged, addStory }

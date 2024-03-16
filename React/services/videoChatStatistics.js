import axios from "axios";
import * as helper from './serviceHelpers';

const endpoint = `${helper.API_HOST_PREFIX}/api/videochatstatistics`;

const insertMeetingDetails = (payload) => {
  const config = {
    method: "POST",
    data: payload,
    url: endpoint,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export default { insertMeetingDetails };
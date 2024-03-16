import axios from "axios";
import debug from "sabio-debug";
import * as helper from '../services/serviceHelpers';

const _logger = debug.extend("videochatServices");
const endpoint = `${helper.API_HOST_PREFIX}/api/videochat`;

const getNewVideoChat = (payload) => {
  _logger("videoChatService payload", payload);
  const config = {
    method: "POST",
    data: payload,
    url: endpoint,
    headers: { "Content-Type": "application/json" }, 
  };
  
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export default { getNewVideoChat };
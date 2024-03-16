import axios from "axios";
import * as helper from '../services/serviceHelpers';
import debug from "sabio-debug";

const endpoint = `${helper.API_HOST_PREFIX}/api/ratings`;
const _logger = debug.extend("service");

const addReview = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAverage = (entityTypeId, entityId) =>{
  _logger("getAverage", entityTypeId, entityId );

      const config = {
        method: "GET",
        url: `${endpoint}/average?entityTypeId=${entityTypeId}&entityId=${entityId}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
      };



      return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const getByEntityId = (pageIndex, pageSize, entityTypeId, entityId ) => {
  _logger("get By Entity Id", pageIndex, pageSize, entityTypeId, entityId );

    const config = {
      method: "GET",
      url: `${endpoint}/entityId?pageIndex=${pageIndex}&pageSize=${pageSize}&entityTypeId=${entityTypeId}&entityId=${entityId}`,
            
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };



    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const ratingService = { addReview, getAverage, getByEntityId };
export default ratingService;

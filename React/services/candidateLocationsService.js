import axios from "axios";
import * as helper from '../services/serviceHelpers';

const cLEndpoint = `${helper.API_HOST_PREFIX}/api/candidate/locations`;

const addCandidateLocationForm = (payload) => {
        const config = {
        method: "POST",
        url: `${cLEndpoint}/form`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateCandidateLocationForm = (payload) => {
    const config = {
      method: "PUT",
      url: `${cLEndpoint}/form/${payload.id}`,
      data: payload,
      crossdomain: true,
      headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
  };

const GetLocationsByUserId = (userId) =>{
    const config = {
        method: "GET",
        url: `${cLEndpoint}/${userId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}



const candidateLocationServices={ addCandidateLocationForm, GetLocationsByUserId, updateCandidateLocationForm}

export default candidateLocationServices
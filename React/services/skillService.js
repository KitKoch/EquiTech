import axios from "axios";
import * as helper from "../services/serviceHelpers";

const skillEndpoint = `${helper.API_HOST_PREFIX}/api/skills/`;

const addSkill = (payload) => {
  const config = {
    method: "POST",
    url: skillEndpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateSkill = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${skillEndpoint}${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteById = (id) => {
  const config = {
    method: "DELETE",
    url: `${skillEndpoint}${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateSkillIsApproved = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${skillEndpoint}approved/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSkillById = (id) => {
  const config = {
    method: "GET",
    url: `${skillEndpoint}${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSkillsPaged = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `${skillEndpoint}paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-type": "application/json" }
    }
    return axios(config)
        .then(helper.onGlobalSuccess)
        .catch(helper.onGlobalError);
}

const selectAll = () => {
    const config = {
        method: "GET",
        url: skillEndpoint,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const getByIndustryId = (industryId) => {
    const config = {
        method: "GET",
        url: `${skillEndpoint}industry/${industryId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
        .then(helper.onGlobalSuccess)
        .catch(helper.onGlobalError);
}

export {
    addSkill,
    updateSkill,
    deleteById,
    updateSkillIsApproved,
    getSkillById,
    getSkillsPaged,
    selectAll,
    getByIndustryId
};
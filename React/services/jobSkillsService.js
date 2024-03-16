import axios from 'axios';
import './serviceHelpers';
import logger from 'sabio-debug';
import * as helper from './serviceHelpers'
const _logger = logger.extend('JobSkillsService');

const service = {
    endpoint: helper.API_HOST_PREFIX
}


const getJobsByOrg = (pageIndex, pageSize, orgId) => {
    _logger("getJobs firing");
    const config = {
        method: "GET",
        url: `${service.endpoint}/api/jobs/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}&organizationId=${orgId}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getJobSkillsByJobId = (jobId) => {
    _logger("getJobSkillsByJobId firing");
    const config = {
        method: "GET",
        url: `${service.endpoint}/api/jobskills/${jobId}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const getFormExperience = () => {
    _logger("getFormExperience firing");
    const config = {
        method: "GET",
        url: `${service.endpoint}/api/experience`,
        crossdomain: true,
        headers: { "Conent-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const getFormSkills = () => {
    _logger("getFormSkills firing");
    const config = {
        method: "GET",
        url: `${service.endpoint}/api/skills`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);  
}

const addToJobSkills = (payload) => {
    _logger("addToJobSkills firing");
    const config = {
        method: "POST",
        url: `${service.endpoint}/api/jobskills`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const updateJobSkills = (payload) => {
    _logger("updateJobSkills firing");
    const config = {
        method: "PUT",
        url: `${service.endpoint}/api/jobskills/${payload.jobId}/${payload.skillId}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const deleteSkillRelationship = (jobId, skillId) => {
    _logger("deleteSkillRelationship firing");
    const config = {
        method: "DELETE",
        url: `${service.endpoint}/api/jobskills/${jobId}/${skillId}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}


export { getJobsByOrg, getJobSkillsByJobId, getFormExperience, getFormSkills, addToJobSkills, updateJobSkills, deleteSkillRelationship };
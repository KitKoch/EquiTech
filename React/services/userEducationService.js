import axios from "axios"
import * as helper from "../services/serviceHelpers"

const usersEducationEndPoint = `${helper.API_HOST_PREFIX}/api/users/education`

const addRecord = payload =>{
    const config ={
        method: "POST",
        url: `${usersEducationEndPoint}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addWithDegrees = payload =>{
    const config ={
        method: "POST",
        url: `${usersEducationEndPoint}/multipledegrees`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {"Content-Type": "application/json"}
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getById = id =>{
    const config = {
        method: "GET",
        url: `${usersEducationEndPoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: {"content-type": "application/json"},
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getByUser = userId =>{
    const config = {
        method: "GET",
        url: `${usersEducationEndPoint}/records/${userId}`,
        withCredentials: true,
        crossdomain: true,
        headers: {"content-type": "application/json"},
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getByCreatedBy = ( index, size ) => {
    const config = {
        method: "GET",
        url: `${usersEducationEndPoint}/paginate/?pageIndex=${index}&pageSize=${size}`,
        withCredentials: true,
        crossdomain: true,
        headers: {"content-type": "application/json"}
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateRecord = (payload, id) => {
    const config = {
        method: "PUT",
        url: `${usersEducationEndPoint}/${id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: {"content-type": "application/json"}
    }
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteRecord = id => {
    const config = {
        method: "DELETE",
        url: `${usersEducationEndPoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: {"content-type": "application/json"},
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const usersEducationService = {
    addRecord,
    getById,
    getByUser,
    getByCreatedBy,
    updateRecord,
    deleteRecord,
    addWithDegrees
};
export default usersEducationService;
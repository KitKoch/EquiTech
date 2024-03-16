import axios from "axios";
import * as helper from '../services/serviceHelpers';

const apptsEndpoint = `${helper.API_HOST_PREFIX}/api/appointments`;

const getAppointments = (pageIndex, pageSize, clientId) => {
    const config = {
        method: "GET",
        url: `${apptsEndpoint}/clientId?pageIndex=${pageIndex}&pageSize=${pageSize}&clientId=${clientId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getApptInfo = (id) => {
    const config = {
        method: "GET",
        url: `${apptsEndpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const confirmAppointment = (id) => {
    const config = {
        method: "PUT",
        url: `${apptsEndpoint}/confirmation/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteAppointment = (id) => {
    const config = {
        method: "DELETE",
        url: `${apptsEndpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addAppointment = (payload) => {
    const config = {
        method: "POST",
        url: `${apptsEndpoint}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateAppointment = (payload) => {
    const config = {
        method: "PUT",
        url: `${apptsEndpoint}/${payload.id}`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAppointmentsByOrg = (pageIndex, pageSize, orgId) => {
    const config = {
        method: "GET",
        url: `${apptsEndpoint}/organizationId?pageIndex=${pageIndex}&pageSize=${pageSize}&organizationId=${orgId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const appointmentsService = { addAppointment, deleteAppointment, getAppointments, updateAppointment, getApptInfo, confirmAppointment, getAppointmentsByOrg };

export default appointmentsService;

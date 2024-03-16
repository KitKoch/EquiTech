import axios from "axios";
import * as helper from '../services/serviceHelpers'

const venuesEndpoint = `${helper.API_HOST_PREFIX}/api/venues`

const getVenues = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `${venuesEndpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type" : "application/json"}
    }
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addVenue = (payload) => {
    const config = {
        method: "POST",
        url: `${venuesEndpoint}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateVenue = (payload, id) => {
    const config = {
        method: "PUT",
        url: `${venuesEndpoint}/${id}`,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

const deleteVenue = (id) => {
    const config = {
        method: "DELETE",
        url: `${venuesEndpoint}/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const searchVenues = (pageIndex, pageSize, query) => {
    const config = {
        method: "GET",
        url: `${venuesEndpoint}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type" : "application/json"}
    }
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const venuesService = { getVenues, addVenue, updateVenue, deleteVenue, searchVenues };

export {venuesService}
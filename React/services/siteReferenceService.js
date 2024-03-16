import axios from "axios";
import * as helper from '../services/serviceHelpers';

const siteRefEndpoint = `${helper.API_HOST_PREFIX}/api/sitereferences`;

const addReference = (refType, id) =>
{
    const config = {
        method: "POST",
        url: `${siteRefEndpoint}/${refType}?currentUserId=${id}`,
        data: refType,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const referenceChartInfo = () => {

    const config = {
        method: "GET",
        url: `${siteRefEndpoint}/chart`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config)
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError)
};

const getDataByDates = (date1, date2) => {
    
    const config = {
        method: "GET",
        url: `${siteRefEndpoint}/chart/dates?date1=${date1}&date2=${date2}`,
        withCredentials: true,
        crossdomain: true, 
        headers: { "Content-Type": "application/json"}
    }
    return axios(config)
    .then(helper.onGlobalSuccess)
    .catch(helper.onGlobalError)
}

const siteRefServices = { addReference, referenceChartInfo, getDataByDates};

export default siteRefServices;
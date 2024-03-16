import axios from "axios";
import {API_HOST_PREFIX, onGlobalSuccess, onGlobalError} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/workhistory`;

const addWorkHistory =(payload)=>{
    const config = {
      method:"POST",
      url:`${endpoint}`,
      data:payload,
      withCredentials: true,
      crossdomain:true,
      headers:{"Content-Type":"application/json"}
     };
     return axios(config).then(onGlobalSuccess).catch(onGlobalError);
   };
  
const editWorkHistory =(payload)=>{
    const config = { 
    method:"PUT",
    url:`${endpoint}/${payload.id}`,
    data:payload,
    withCredentials: true,
    crossdomain:true,
    headers:{"Content-Type":"application/json"}
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };

const deleteWorkHistory = (id) => {
    const config = {
        method: "DELETE",
        url: `${endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: {"content-type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };
  
const getWorkHistoryById =(id)=>{
    const config = {
      method:"GET",
      url:`${endpoint}/${id}`,
      withCredentials: true,
      crossdomain:true,
      headers:{"Content-Type":"application/json"}
     };
     return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };
  
const getWorkHistoryByUserIdPaginated = (pageIndexInput, pageSizeInput) => {
    const config = {
      method:"GET",
      url:`${endpoint}/?pageIndex=${pageIndexInput}&pageSize=${pageSizeInput}`,
      withCredentials: true,
      crossdomain:true,
      headers:{"Content-Type":"application/json"}
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };

const addWorkPosition =(payload)=>{
    const config = {
      method:"POST",
      url:`${endpoint}/position`,
      data:payload,
      withCredentials: true,
      crossdomain:true,
      headers:{"Content-Type":"application/json"}
     };
     return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };
  
const editWorkPosition =(payload)=>{
    const config = {
      method:"PUT",
      url:`${endpoint}/position/${payload.id}`,
      data:payload,
      withCredentials: true,
      crossdomain:true,
      headers:{"Content-Type":"application/json"}
     };
     return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };

const deleteWorkPosition = (id) => {
    const config = {
        method: "DELETE",
        url: `${endpoint}/position/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: {"content-type": "application/json"},
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };

const getWorkPositionById =(id)=>{
    const config = {
        method:"GET",
        url:`${endpoint}/position/${id}`,
        withCredentials: true,
        crossdomain:true,
        headers:{"Content-Type":"application/json"}
        };
        return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };

const getWorkPositionsByWorkHistoryId =(workHistoryId)=>{
    const config = {
        method:"GET",
        url:`${endpoint}/positions/${workHistoryId}`,
        withCredentials: true,
        crossdomain:true,
        headers:{"Content-Type":"application/json"}
        };
        return axios(config).then(onGlobalSuccess).catch(onGlobalError);
    };
  
  export {
      addWorkHistory,
      editWorkHistory,
      deleteWorkHistory,
      getWorkHistoryById,
      getWorkHistoryByUserIdPaginated,
      addWorkPosition,
      editWorkPosition,
      deleteWorkPosition,
      getWorkPositionById,
      getWorkPositionsByWorkHistoryId,
  };
  
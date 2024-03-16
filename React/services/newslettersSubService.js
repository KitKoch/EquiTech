import axios from "axios";
import {API_HOST_PREFIX, onGlobalSuccess, onGlobalError} from "./serviceHelpers";

const endpoint = `${API_HOST_PREFIX}/api/newslettersubscriptions`;

const add =(payload)=>{
  const config = {
    method:"POST",
    url:`${endpoint}`,
    data:payload,
    crossdomain:true,
    headers:{"Content-Type":"application/json"}
   };
   return axios(config).then(onGlobalSuccess).catch(onGlobalError);
 };

const edit =(payload)=>{
  const config = {
    method:"PUT",
    url:`${endpoint}`,
    data:payload,
    crossdomain:true,
    headers:{"Content-Type":"application/json"}
   };
   return axios(config).then(onGlobalSuccess).catch(onGlobalError);
 };

const getByEmail =(email)=>{
  const config = {
    method:"GET",
    url:`${endpoint}/email/?email=${email}`,
    crossdomain:true,
    headers:{"Content-Type":"application/json"}
   };
   return axios(config).then(onGlobalSuccess).catch(onGlobalError);
 };

const getPaginated = (filterMode, pageIndexInput, pageSizeInput) => {
  const config = {
    method:"GET",
    url:`${endpoint}/?filterMode=${filterMode}&?pageIndex=${pageIndexInput}&pageSize=${pageSizeInput}`,
    crossdomain:true,
    headers:{"Content-Type":"application/json"}
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getSubscribers =()=>{
  const config = {
    method:"GET",
    url:`${endpoint}/subscribers`,
    crossdomain:true,
    headers:{"Content-Type":"application/json"}
   };
   return axios(config).then(onGlobalSuccess).catch(onGlobalError);
 };

export {
    add,
    edit,
    getByEmail,
    getPaginated,
    getSubscribers
};
import axios from "axios";
import * as helper from "../services/serviceHelpers";

const locationsEndPoint = `${helper.API_HOST_PREFIX}/api/locations`;

const addLocation = (newLocation) => {
  const config = {
    method: "POST",
    url: `${locationsEndPoint}`,
    data: newLocation,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const updateLocation = (newLocation) => {
  const payload = {
    id: newLocation.id,
    locationTypeId: newLocation.locationTypeId,
    lineOne: newLocation.lineOne,
    lineTwo: newLocation.lineTwo,
    city: newLocation.city,
    zip: newLocation.zip,
    stateId: newLocation.stateId,
    latitude: newLocation.latitude,
    longitude: newLocation.longitude,
  };

  const config = {
    method: "PUT",
    url: `${locationsEndPoint}/${newLocation.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getById = (id) => {
  const config = {
    method: "GET",
    url: `${locationsEndPoint}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getAllPaginated = (index, size) => {
  const config = {
    method: "GET",
    url: `${locationsEndPoint}/paginated/??pageIndex=${index}&pageSize=${size}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const getAll = () => {
  const config = {
    method: "GET",
    url: `${locationsEndPoint}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config);
};

const locationServices = {
  addLocation,
  getById,
  updateLocation,
  getAllPaginated,
  getAll,
};

export default locationServices;

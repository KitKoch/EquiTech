import axios from "axios";
import * as helper from "../services/serviceHelpers";

const goalsEndpoint = `${helper.API_HOST_PREFIX}/api/goals/`;

const getGoalsByCreatedBy = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${goalsEndpoint}createdby?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getAllGoals = (completed, minPay, maxPay, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${goalsEndpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}&minPay=${minPay}&maxPay=${maxPay}&completed=${completed}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addGoal = (payload) => {
  const config = {
    method: "POST",
    url: `${goalsEndpoint}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateGoal = (id, payload) => {
  const config = {
    method: "PUT",
    url: `${goalsEndpoint}${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteGoal = (id) => {
  const config = {
    method: "DELETE",
    url: `${goalsEndpoint}${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(() => {
    return id;
  });
};

const searchByCandidateName = (isCompleted, queryStr, pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${goalsEndpoint}search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${queryStr}&completed=${isCompleted}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const filterByDesiredPay = (
  queryStr,
  isCompleted,
  minPay,
  maxPay,
  pageIndex,
  pageSize
) => {
  const config = {
    method: "GET",
    url: `${goalsEndpoint}filter?pageIndex=${pageIndex}&pageSize=${pageSize}&minPay=${minPay}&maxPay=${maxPay}&completed=${isCompleted}&query=${queryStr}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const goalsService = {
  getGoalsByCreatedBy,
  getAllGoals,
  addGoal,
  updateGoal,
  deleteGoal,
  searchByCandidateName,
  filterByDesiredPay,
};

export default goalsService;

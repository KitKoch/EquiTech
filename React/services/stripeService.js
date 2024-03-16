import axios from "axios";

const API_HOST_PREFIX = process.env.REACT_APP_API_HOST_PREFIX;

const endpoint = `${API_HOST_PREFIX}/api/stripe`;

const addSession = (payload) => {
  const config = {
    method: "POST",
    url: endpoint,
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const createSubscriptionSession = (payload) => {
  const config = {
    method: "POST",
    url: endpoint + "/subscriptions",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getSubscriptions = () => {
  const config = {
    method: "GET",
    url: endpoint + "/products",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const addSubscription = (payload) => {
  const config = {
    method: "POST",
    url: endpoint + "/subscriptions" + "/new",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getSubscriptionById = (id) => {
  const config = {
    method: "GET",
    url: endpoint + "/subscriptions" + `/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getInvoiceFromSubscription = (subscriptionId) => {
  const config = {
    method: "GET",
    url:
      endpoint + "/subscriptions/invoice" + `?subscriptionId=${subscriptionId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getCurrentUsersUpcomingInvoice = () => {
  const config = {
    method: "GET",
    url: endpoint + "/subscriptions/invoice",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getSubscriptionBySesssionId = (sessionId) => {
  const config = {
    method: "GET",
    url: endpoint + "/subscriptions" + `?sessionId=${sessionId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const getCurrentSubscription = () => {
  const config = {
    method: "GET",
    url: endpoint + "/subscriptions/current",
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

const updateSubscription = (payload) => {
  const config = {
    method: "PUT",
    url: endpoint + "/subscriptions",
    data: payload,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export {
  addSession,
  getSubscriptions,
  createSubscriptionSession,
  addSubscription,
  getSubscriptionById,
  getInvoiceFromSubscription,
  getSubscriptionBySesssionId,
  getCurrentSubscription,
  updateSubscription,
  getCurrentUsersUpcomingInvoice,
};

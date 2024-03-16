import axios from "axios";
import * as helper from "../services/serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/comments`;

const getCommentsByEntityType = (entityId, entityTypeId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${entityId}/${entityTypeId}`,
    withCredentials: true,
    crossDomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const addComment = (newComment) => {
  const config = {
    method: "POST",
    url: `${endpoint}/`,
    data: newComment,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateComment = (newComment) => {
  const payload = {
    id: newComment.id,
    subject: newComment.subject,
    text: newComment.text,
    parentId: newComment.parentId,
    commentEntityId: newComment.entityId,
    commentEntityTypeId: newComment.entityTypeId,
    isDeleted: newComment.isDeleted,
  };

  const config = {
    method: "PUT",
    url: `${endpoint}/${newComment.id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteComment = (idToBeDeleted) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}/${idToBeDeleted}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const commentService = {
  getCommentsByEntityType,
  addComment,
  updateComment,
  deleteComment,
};

export default commentService;

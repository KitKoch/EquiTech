import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import CommentWrapper from "./CommentWrapper";
import commentService from "../../services/commentService";
import CommentForm from "./CommentForm";
import "./commentstyle.css";
import toastr from "toastr";
 
function CommentsList({ entityId, entityTypeId, currentUser }) {
  const [comments, setComments] = useState({
    arrayOfComments: [],
    allItems: [],
    commentComponents: [],
  });

  const mapCommentCard = (aComment) => {
    return (
      <CommentWrapper
        aComment={aComment}
        key={aComment.id}
        currentUser={currentUser}
        entityId={entityId}
        entityTypeId={entityTypeId}
        onDelete={onDeleteRequest}
        onReply={onHandleSubmit}
      />
    );
  };

  useEffect(() => {
    commentService
      .getCommentsByEntityType(entityId, entityTypeId)
      .then(onGetCommentsSuccess)
      .catch(onGetCommentsError);
  }, []);

  const onGetCommentsSuccess = (data) => {
    let arrayOfComments = data.items.map((aComment) => {
      if (aComment.replies) {
        return aComment;
      } else {
        return { ...aComment, replies: [] };
      }
    });

    setComments((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfComments = arrayOfComments;
      pd.commentComponents = arrayOfComments.map(mapCommentCard);
      return pd;
    });
  };

  const onGetCommentsError = (error) => {
    toastr.error("Oops, something went wrong. Please try again.", error);
  };

  const onHandleSubmit = (newCommentData) => {
    const newComment = {
      ...newCommentData,
      author: { ...currentUser },
      replies: [],
    };

    setComments((prevState) => {
      const pd = { ...prevState };

      if (newComment.parentId) {
        const indexOfParent = pd.arrayOfComments.findIndex((aComment) => {
          return aComment.id === newComment.parentId;
        });

        pd.arrayOfComments[indexOfParent].replies.push(newComment);
      } else {
        pd.arrayOfComments.unshift(newComment);
      }

      pd.commentComponents = pd.arrayOfComments.map(mapCommentCard);
      return pd;
    });
  };

  const onDeleteRequest = useCallback((idToBeDeleted) => {
    const onDeleteHandler = onDeleteSuccess(idToBeDeleted);
    commentService
      .deleteComment(idToBeDeleted)
      .then(onDeleteHandler)
      .catch(onDeleteError);
  }, []);

  const onDeleteSuccess = (idToBeDeleted) => {
    return () => {
      setComments((prevState) => {
        const newState = { ...prevState };

        newState.arrayOfComments = prevState.arrayOfComments.filter(
          (aComment) => {
            let result = false;

            if (aComment.id !== idToBeDeleted) {
              result = true;
            }

            return result;
          }
        );

        newState.commentComponents =
          newState.arrayOfComments.map(mapCommentCard);

        return newState;
      });
    };
  };

  const onDeleteError = (error) => {
    toastr.error("Oops, something went wrong when trying to delete", error);
  };

  return (
    <React.Fragment>
      <hr />
      <h2 className="text-center">Add new comment</h2>
      <CommentForm
        submitLabel="Write"
        entityId={entityId}
        entityTypeId={entityTypeId}
        onSuccess={onHandleSubmit}
      />
      <h2 className="text-center text-info">Recent comments</h2>
      <div className="w-75 mx-auto">{comments.commentComponents}</div>
    </React.Fragment>
  );
}

CommentsList.propTypes = {
  entityId: PropTypes.number.isRequired,
  entityTypeId: PropTypes.number.isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CommentsList;

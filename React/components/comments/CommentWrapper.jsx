import React from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";
 
function CommentWrapper({ aComment, onDelete, currentUser, onReply }) {
  return (
    <React.Fragment>
      <CommentItem
        aComment={aComment}
        onDelete={onDelete}
        currentUser={currentUser}
        entityId={aComment.entityId}
        entityTypeId={aComment.entityTypeId}
        onReply={onReply}
      />

      {aComment.replies &&
        aComment.replies.map((aReply) => {
          return (
            <CommentItem
              aComment={aReply}
              onDelete={onDelete}
              onReply={onReply}
              entityId={aComment.entityId}
              entityTypeId={aComment.entityTypeId}
              currentUser={currentUser}
              key={aReply.id}
            />
          );
        })}
    </React.Fragment>
  );
}

CommentWrapper.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  aComment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    parentId: PropTypes.number,
    entityId: PropTypes.number.isRequired,
    entityTypeId: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    isDeleted: PropTypes.bool.isRequired,
    replies: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CommentWrapper;

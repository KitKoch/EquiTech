import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { BsFillReplyFill, BsFillTrashFill } from "react-icons/bs"; 
import { FaUserEdit } from "react-icons/fa";
import CommentForm from "./CommentForm";

function CommentItem({
  aComment,
  onDelete,
  currentUser,
  onReply,
  entityId,
  entityTypeId,
}) {
  const [showForm, setShowForm] = useState(false);

  const author = aComment.author;
  const dateNow = moment.utc();
  const commentCreatedDate = moment(aComment.dateCreated);

  const onDeleteClicked = () => {
    onDelete(aComment.id);
  };

  const onReplyClicked = () => {
    setShowForm(!showForm);
  };

  const onEditClicked = () => {
    setShowForm(!showForm);
  };

  const onReplySuccess = (newData) => {
    setShowForm(false);
    onReply(newData);
  };

  return (
    <React.Fragment>
      <div
        className={`d-flex shadow-lg p-3 mb-5 bg-body rounded ${
          aComment.parentId && "ms-5"
        }`}
      >
        <img
          src={author.avatarUrl}
          width="56"
          height="56"
          className="rounded-circle me-3"
          alt="Chris Wood"
        />
        <div className="flex-grow-1 ms-3">
          <small className="float-end text-navy">
            {dateNow.diff(commentCreatedDate, "days")} days ago
          </small>
          <p className="mb-2">
            <strong>{author.firstName + " " + author.lastName}</strong>
          </p>
          <p>{aComment.text}</p>

          {currentUser.id === aComment.author.id && (
            <>
              <button className="btn" cursor="pointer" onClick={onEditClicked}>
                <FaUserEdit size="" color="LimeGreen" cursor="pointer" />
                Edit
              </button>

              <button
                className="btn"
                cursor="pointer"
                onClick={onDeleteClicked}
              >
                <BsFillTrashFill color="red" cursor="pointer" />
                Delete
              </button>
            </>
          )}

          <button
            className="btn comment-btn-reply"
            cursor="pointer"
            onClick={onReplyClicked}
          >
            <BsFillReplyFill color="blue" cursor="pointer" />
            {showForm ? "Cancel Reply" : "Reply"}
          </button>
        </div>
      </div>
      ;
      {showForm && (
        <>
          <CommentForm
            entityId={entityId}
            entityTypeId={entityTypeId}
            parentId={aComment.id}
            onSuccess={onReplySuccess}
          />
          <hr />
        </>
      )}
    </React.Fragment>
  );
}

CommentItem.propTypes = {
  entityId: PropTypes.number.isRequired,
  entityTypeId: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  aComment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    parentId: PropTypes.number,
    entityType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    entityId: PropTypes.number.isRequired,
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
  }),
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default CommentItem;

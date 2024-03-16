import React, { useState, useEffect } from "react";
import CommentsList from "./CommentsList";
import userService from "../../services/userService";

function CommentsExample() { 
  const [currentUser, setCurrentUser] = useState(null);

  const onGetCurrentUserSuccess = (response) => {
    setCurrentUser(response.item);
  };

  useEffect(() => {
    userService.getCurrentUser().then(onGetCurrentUserSuccess);
  }, []);

  return (
    <>
      <h1 className="text-center">Blog Comments</h1>
      {currentUser && (
        <CommentsList entityId={5} entityTypeId={1} currentUser={currentUser} />
      )}
    </>
  );
}

export default CommentsExample;

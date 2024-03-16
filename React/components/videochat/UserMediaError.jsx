import React from "react";

function UserMediaError() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="call">
      <div className="info-box get-user-media-error">
        <h1>Camera or mic blocked</h1>
        <button onClick={refreshPage} type="button">
          Try again
        </button>
        <p>
          <a
            href="https://docs.daily.co/guides/how-daily-works/handling-device-permissions"
            target="_blank"
            rel="noreferrer"
          >
            Get help
          </a>
        </p>
      </div>
    </div>
  );
}

export default UserMediaError;

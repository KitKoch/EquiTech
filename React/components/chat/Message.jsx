import React from "react";
import PropTypes from "prop-types";
import { formatTime, simpleDate } from "../../utils/dateFormater";

function Message({ position, avatar, name, message, time }) {
  return (
    <div className={`chat-message-${position} pb-4`}>
      <div>
        <img
          src={avatar}
          className="rounded-circle me-1"
          alt={name}
          width="40"
          height="40"
        />
      </div>
      <div
        className={`flex-shrink-1 bg-light rounded py-2 px-3 ${
          position === "right" ? "me-3" : "ms-3"
        }`}
      >
        <div className="fw-bold mb-1">{name}</div>
        {message}
        <div className="text-muted small text-nowrap mt-2">
          {`${simpleDate(time)} ${formatTime(time)}`}
        </div>
      </div>
    </div>
  );
}

Message.propTypes = {
  position: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  message: PropTypes.string,
  time: PropTypes.string.isRequired,
};

export default Message;

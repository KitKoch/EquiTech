import React, { useState, useEffect } from "react";
import Chat from "./Chat";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { sendMessage } from "../../services/messageService";
import PropTypes from "prop-types";
import toastr from "toastr";
import userService from "../../services/userService";

const API_HOST_PREFIX = process.env.REACT_APP_API_HOST_PREFIX;

function ChatPage() {
  const [connection, setConnection] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const _logger = logger.extend("ChatPage");

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(API_HOST_PREFIX + "/chathub")
      .withAutomaticReconnect()
      .build();
    setConnection(() => {
      return newConnection;
    });
    userService
      .getCurrentUser()
      .then(onGetCurrentUserSuccess)
      .catch(onGetCurrentUserError);
  }, []);

  useEffect(() => {
    if (connection) {
      _logger(connection);
      connection.start().then(onConnecttionSuccess).catch(onConnecttionError);
    }
  }, [connection]);

  const onConnecttionSuccess = () => {
    _logger("Connected! ");
    connection.on("ReceiveMessage", (message) => {
      setNewMessage(() => {
        return message;
      });
      if (message.senderId !== currentUser.id) {
        toastr.success("New Message!");
      }
    });
  };

  const onGetCurrentUserSuccess = (res) => {
    _logger(res);
    const user = res.item;
    setCurrentUser(() => {
      return user;
    });
  };

  const onGetCurrentUserError = (err) => {
    _logger("GetCurrentUser failed: ", err);
    toastr.error("no user found");
  };

  const onConnecttionError = (e) => {
    _logger("Connection failed: ", e);
    toastr.error("Connection failed");
  };

  const onSubmit = (payload) => {
    if (connection._connectionStarted) {
      sendMessage(payload).then(onSendMessageSuccess).catch(onSendMessageError);
    } else {
      _logger("No connection to server yet.");
      toastr.error("No connection to server yet.");
    }
  };

  const onSendMessageSuccess = (res) => {
    _logger(res);
  };

  const onSendMessageError = (err) => {
    _logger(err);
    toastr.error("Message Send Failed");
  };

  return (
    <div>
      <Chat
        sendMessage={onSubmit}
        newMessage={newMessage}
        currentUser={currentUser}
      />
    </div>
  );
}

ChatPage.propTypes = {
  currentUser: PropTypes.shape({ id: PropTypes.number.isRequired }),
  newMessage: PropTypes.shape({
    message: PropTypes.string.isRequired,
    senderId: PropTypes.number.isRequired,
  }),
};

export default ChatPage;

import React, { useState, useEffect } from "react";
import Chat from "../../../chat/Chat";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { sendMessage } from "../../../../services/messageService";
import PropTypes from "prop-types";
import toastr from "toastr";
import userService from "../../../../services/userService";
import { Modal, Button } from "react-bootstrap";
import "./candidatechat.css";
const API_HOST_PREFIX = process.env.REACT_APP_API_HOST_PREFIX;

function CandidateChat() {
  const [connection, setConnection] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    toastr.error("No user found");
  };

  const onConnecttionError = (e) => {
    _logger("Connection failed: ", e);
    toastr.error("Connection failed");
  };

  const onSubmit = (payload) => {
    if (connection && connection.state === "Connected") {
      sendMessage(payload).then(onSendMessageSuccess).catch(onSendMessageError);
    } else {
      _logger("No connection to the server yet.");
      toastr.error("No connection to the server yet.");
    }
  };

  const onSendMessageSuccess = (res) => {
    _logger(res);
  };

  const onSendMessageError = (err) => {
    _logger(err);
    toastr.error("Message send failed");
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button
        className="col-2 candidate-chat-button"
        variant="primary"
        onClick={handleOpenModal}
      >
        Open Chat
      </Button>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Chat
            sendMessage={onSubmit}
            newMessage={newMessage}
            currentUser={currentUser}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

CandidateChat.propTypes = {
  currentUser: PropTypes.shape({ id: PropTypes.number.isRequired }),
  newMessage: PropTypes.shape({
    message: PropTypes.string.isRequired,
    senderId: PropTypes.number.isRequired,
  }),
};

export default CandidateChat;

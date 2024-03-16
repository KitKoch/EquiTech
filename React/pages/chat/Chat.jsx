import React, { useEffect, useState, useCallback } from "react";
import "./chat.css";
import { Card, Container, Row } from "react-bootstrap";
import ChatContacts from "../../components/chat/ChatContacts";
import ChatThread from "../../components/chat/ChatThread";
import userService from "../../services/userService";
import { getMessageThread } from "../../services/messageService";
import PropTypes from "prop-types";

function Chat({ sendMessage, newMessage, currentUser }) {
  const [chatPage, setChatPage] = useState({
    users: null,
    currentChat: null,
    messageThread: [],
  });

  const _logger = logger.extend("Chat");

  useEffect(() => {
    userService.getRelated().then(onGetUsersSuccess).catch(onGetUsersError);
  }, []);

  const onSearchSubmited = (query) => {
    userService
      .searchPaginated(query, 0, 10)
      .then(onGetSearchUsersSuccess)
      .catch(onGetUsersError);
  };

  useEffect(() => {
    if (chatPage.currentChat) {
      getMessageThread(chatPage.currentChat.id)
        .then(onGetMessageThreadSuccess)
        .catch(onGetMessageThreadError);
    }
  }, [chatPage.currentChat]);

  const onGetMessageThreadError = () => {
    setChatPage((prev) => {
      let newState = { ...prev };
      newState.messageThread = [];
      return newState;
    });
  };

  const onGetMessageThreadSuccess = (res) => {
    const messageThread = res.item;
    setChatPage((prev) => {
      let newState = { ...prev };
      newState.messageThread = messageThread.reverse();
      return newState;
    });
  };

  useEffect(() => {
    if (newMessage && chatPage.currentChat) {
      if (
        newMessage.senderId === chatPage.currentChat.id ||
        (newMessage.senderId === currentUser.id &&
          newMessage.recipientId === chatPage.currentChat.id)
      ) {
        setChatPage((prev) => {
          let newState = { ...prev };
          newState.messageThread = [...prev.messageThread, newMessage];
          return newState;
        });
      }
    }
  }, [newMessage]);

  const onGetUsersError = (err) => {
    _logger(err);
  };

  const onGetUsersSuccess = (res) => {
    _logger(res.item);
    const users = res.item;
    setChatPage((prevState) => {
      let newState = { ...prevState };
      newState.users = users;
      newState.currentChat = users[0];
      return newState;
    });
  };

  const onGetSearchUsersSuccess = (res) => {
    _logger(res.item.pagedItems);
    const users = res.item.pagedItems;
    setChatPage((prevState) => {
      let newState = { ...prevState };
      newState.users = users;
      newState.currentChat = users[0];
      return newState;
    });
  };

  const contactClicked = useCallback((user) => {
    _logger("currentUserId: " + user.id);
    setChatPage((prevState) => {
      let newState = { ...prevState };
      newState.currentChat = user;
      return newState;
    });
  }, []);

  return (
    <Container className="p-0">
      <h1 className="h3 mb-3 mt-2">Messages</h1>
      <Card className="shadow">
        <Row className="g-0 ">
          <ChatContacts
            users={chatPage.users}
            currentChat={chatPage.currentChat}
            contactClicked={contactClicked}
            onSearch={onSearchSubmited}
          />
          <ChatThread
            currentUser={currentUser}
            currentChat={chatPage.currentChat}
            messageThread={chatPage.messageThread}
            sendMessage={sendMessage}
          />
        </Row>
      </Card>
    </Container>
  );
}

Chat.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  newMessage: PropTypes.shape({
    message: PropTypes.string.isRequired,
    senderId: PropTypes.number.isRequired,
    recipientId: PropTypes.number.isRequired,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default Chat;

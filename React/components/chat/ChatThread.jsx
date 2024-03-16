import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import Message from "../../components/chat/Message";
import { MoreHorizontal } from "react-feather";
import ChatInput from "../../components/chat/ChatInput";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";

function ChatThread({ currentChat, messageThread, sendMessage, currentUser }) {
  const bottomRef = useRef(null);
  const [messageComponents, setMessageComponents] = useState(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageComponents]);

  useEffect(() => {
    if (messageThread) {
      setMessageComponents(() => {
        return messageThread.map(messageMapper);
      });
    }
  }, [messageThread]);

  const messageMapper = (msg) => {
    let isYou = msg.senderId === currentUser.id ? true : false;

    return (
      <Message
        key={Date.now() * Math.random()}
        position={isYou ? "right" : "left"}
        name={
          isYou ? "You" : `${currentChat.firstName} ${currentChat.lastName}`
        }
        avatar={
          isYou
            ? currentUser
              ? currentUser.avatarUrl
              : avatar2
            : currentChat
            ? currentChat.avatarUrl
            : avatar3
        }
        time={msg.dateSent.toString()}
        message={msg.message}
      />
    );
  };

  return (
    <Col lg={7} xl={8} className="">
      <div className="py-2 px-4 d-none d-lg-block shadow top-bar">
        <div className="d-flex align-items-center py-1">
          <div className="position-relative">
            <img
              src={currentChat ? currentChat.avatarUrl : avatar3}
              className="rounded-circle "
              alt="avatar"
              width="40"
              height="40"
            />
          </div>
          <div className="flex-grow-1 ms-3 ps-3">
            <strong>
              {currentChat?.firstName + " " + currentChat?.lastName}
            </strong>
            <div className="text-muted small">
              <em>{currentChat?.email}</em>
            </div>
          </div>
          <div>
            <Button size="lg" variant="light" className="px-3 border">
              <MoreHorizontal className="feather" />
            </Button>
          </div>
        </div>
      </div>

      <div className="position-relative">
        <div className="chat-messages p-4 no-scroll-bar">
          {messageThread && messageComponents && messageComponents}
          <div ref={bottomRef}></div>
        </div>
      </div>
      <div className=" py-3 px-4 ">
        <ChatInput
          recipientId={currentChat ? currentChat.id : 0}
          sendMessage={sendMessage}
        />
      </div>
    </Col>
  );
}

ChatThread.propTypes = {
  currentChat: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
  }),
  messageThread: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
    })
  ),
  sendMessage: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
};

export default ChatThread;

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  InputGroup,
  Form,
  ButtonGroup,
  DropdownButton,
  Container,
} from "react-bootstrap";
import "./emoji.css";
import emojiArr from "./emojis";

function ChatInput({ recipientId, sendMessage }) {
  const _logger = logger.extend("Chat");
  const [message, setMessage] = useState("");

  const emojis = () => {
    return (
      <Container>
        <span
          className="m-1 emoji"
          onClick={onEmojiClick}
          value={"&#128512;"}
          key={Date.now() * Math.random()}
        >
          &#128512;
        </span>
        <span
          className="m-1 emoji"
          value={"&#128513;"}
          onClick={onEmojiClick}
          key={Date.now() * Math.random()}
        >
          &#128513;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128515;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128517;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128526;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128525;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128529;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128540;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128557;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128561;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128512;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128514;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128293;
        </span>
        <span
          onClick={onEmojiClick}
          className="m-1 emoji"
          key={Date.now() * Math.random()}
        >
          &#128077;
        </span>
        <hr />
        <div className="emoji-container">
          {emojiArr.map((ji) => {
            return (
              <span
                onClick={onEmojiClick}
                className="m-1 emoji"
                key={Date.now() * Math.random()}
              >
                {ji}
              </span>
            );
          })}
        </div>
      </Container>
    );
  };

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return;
    }
  }

  const onEmojiClick = (e) => {
    const value = e.target.innerHTML;
    _logger(value);
    copyTextToClipboard(value)
      .then(() => {
        navigator.clipboard.readText().then((clipText) =>
          setMessage((prev) => {
            let msg = prev + clipText;
            return msg;
          })
        );
      })
      .catch((err) => {
        _logger(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    _logger(message);

    const isMessageProvided = message && message !== "";
    if (isMessageProvided) {
      const payload = {
        message: message,
        subject: "chat",
        recipientId: recipientId,
      };
      sendMessage(payload);
      setMessage("");
    }
  };

  const onMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  return (
    <Form onSubmit={onSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Type your message"
          id="message"
          name="message"
          value={message}
          onChange={onMessageUpdate}
          size="lg"
        />
        <ButtonGroup aria-label="Basic example">
          <DropdownButton
            as={ButtonGroup}
            title="&#128512;"
            id="bg-nested-dropdown"
          >
            {emojis()}
          </DropdownButton>
          <Button variant="primary" onClick={onSubmit}>
            Send
          </Button>
        </ButtonGroup>
      </InputGroup>
    </Form>
  );
}

ChatInput.propTypes = {
  recipientId: PropTypes.number.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default ChatInput;

import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import ContactCard from "./ContactCard";

function ChatContacts({ users, currentChat, contactClicked, onSearch }) {
  const [contactComponents, setContactComponents] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (users && currentChat) {
      setContactComponents(() => {
        let components = users.map(contactCardMapper);
        return components;
      });
    }
  }, [users, currentChat]);

  const contactCardMapper = (user) => {
    let isSelected = Number(user.id) === Number(currentChat.id);
    return (
      <ContactCard
        isSelected={isSelected}
        user={user}
        contactClicked={contactClicked}
        key={user.id}
      />
    );
  };

  const localSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const changeQuery = (e) => {
    setSearchQuery(() => {
      let query = e.target.value;
      return query;
    });
  };

  return (
    <Col lg={5} xl={4} className="">
      <div className="px-4 py-2 d-none d-lg-block shadow top-bar">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1 ms-3">
            <Form onSubmit={localSearchSubmit}>
              <Form.Control
                type="text"
                className="my-2"
                placeholder="Search..."
                value={searchQuery}
                onChange={changeQuery}
              />
            </Form>
          </div>
        </div>
      </div>
      <div className="chat-messages no-scroll-bar border">
        {contactComponents && contactComponents}
      </div>
      <hr className="d-block d-lg-none mt-1 mb-0" />
    </Col>
  );
}

ChatContacts.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({ user: PropTypes.string, message: PropTypes.string })
  ),
  currentChat: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  contactClicked: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default ChatContacts;

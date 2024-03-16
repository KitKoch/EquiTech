import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import avatar5 from "../../assets/img/avatars/avatar-5.jpg";

function ContactCard({ isSelected, user, contactClicked }) {
  const localClick = () => {
    contactClicked(user);
  };

  return (
    <ListGroup.Item
      action
      tag="a"
      href="#"
      className={
        isSelected
          ? "border-bottom border-top py-2 px-4 contact selected"
          : " border-top py-2 px-4 contact"
      }
      key={user.id}
      id={user.id}
      onClick={localClick}
    >
      <Badge bg="success" className="float-end my-2">
        i
      </Badge>
      <div className="d-flex">
        <img
          src={user.avatarUrl ? user.avatarUrl : avatar5}
          className="rounded-circle me-1"
          alt="user_contact"
          width="40"
          height="40"
        />
        <div className="flex-grow-1 ms-3">
          {user.firstName + " " + user.lastName}
          <div className="small text-muted">{user.email}</div>
        </div>
      </div>
    </ListGroup.Item>
  );
}

ContactCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  isSelected: PropTypes.bool,
  contactClicked: PropTypes.func,
};

export default ContactCard;

import React from "react";
import { Card, ListGroup } from "react-bootstrap";

function UserSettingsNavigation() {
  return (
    <Card>
      <Card.Header>
        <Card.Title className="mb-0">Profile Settings</Card.Title>
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item tag="a" href="#" action active>
          Account
        </ListGroup.Item>
        <ListGroup.Item action>User Demographics</ListGroup.Item>
        <ListGroup.Item tag="a" href="#" action>
          Privacy and safety
        </ListGroup.Item>
        <ListGroup.Item tag="a" href="#" action>
          Email notifications
        </ListGroup.Item>
        <ListGroup.Item tag="a" href="#" action>
          Web notifications
        </ListGroup.Item>
        <ListGroup.Item tag="a" href="#" action>
          Your data
        </ListGroup.Item>
        <ListGroup.Item tag="a" href="#" action>
          Delete account
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default UserSettingsNavigation;

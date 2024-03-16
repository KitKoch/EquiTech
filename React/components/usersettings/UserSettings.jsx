import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Col, Container, Row } from "react-bootstrap";
import UserSettingsNavigation from "./UserSettingsNavigation";
import UserInfoCard from "./UserInfoCard";
import UserPasswordCard from "./UserPasswordCard";
import PropTypes from "prop-types";
import userService from "../../services/userService";
import { Notyf } from "notyf";

const _logger = debug.extend("UserSettings");
const notyf = new Notyf({ position: { y: "top" } });

function UserSettings(props) {
  const currentUser = props.currentUser.id;

  const [userData, setUserData] = useState();

  useEffect(() => {
    userService
      .getCurrentById(currentUser)
      .then(onGetCurrentUserSuccess)
      .catch(onGetCurrentUserError);
  }, []);

  const onGetCurrentUserSuccess = (response) => {
    const user = response.item;
    setUserData(user);
  };
  const onGetCurrentUserError = (error) => {
    _logger(error);
    notyf.error("Failed to retrieve user data");
  };

  const handleFileChange = (response) => {
    const newUrl = response.items[0].url;
    userService
      .updateAvatar(currentUser, newUrl)
      .then(onAvatarUpdateSuccess)
      .catch(onAvatarUpdateError);
  };

  const onAvatarUpdateSuccess = (response) => {
    _logger(response);
    userService
      .getCurrentById(currentUser)
      .then(onGetCurrentUserSuccess)
      .catch(onGetCurrentUserError);
  };

  const onAvatarUpdateError = (error) => {
    _logger(error);
    notyf.error("Failed to update avatar");
  };

  const handleInfoChange = (response) => {
    const payload = {
      id: currentUser,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
    };

    userService
      .updateById(currentUser, payload)
      .then(onInfoUpdateSuccess)
      .catch(onInfoUpdateError);
  };

  const onInfoUpdateSuccess = (response) => {
    _logger(response);
    notyf.success("Profile updated");
    userService
      .getCurrentById(currentUser)
      .then(onGetCurrentUserSuccess)
      .catch(onGetCurrentUserError);
  };

  const onInfoUpdateError = (error) => {
    _logger(error);
    notyf.error("Failed to update user data");
  };

  const handlePasswordChange = (values) => {
    const payload = {
      password: values.newPassword,
      confirmPassword: values.confirm,
    };

    userService
      .changePassword(payload)
      .then(onPasswordUpdateSuccess)
      .catch(onPasswordUpdateError);
  };

  const onPasswordUpdateSuccess = (response) => {
    _logger(response);
    notyf.success("Password updated");
  };

  const onPasswordUpdateError = (error) => {
    _logger(error);
    notyf.error("Failed to update password");
  };

  return (
    <React.Fragment>
      <Helmet title="Settings" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Settings</h1>
        <Row>
          <Col md="3" xl="2">
            <UserSettingsNavigation />
          </Col>
          <Col md="9" xl="10">
            {userData && (
              <UserInfoCard
                userData={userData}
                handleFileChange={handleFileChange}
                handleInfoChange={handleInfoChange}
              />
            )}
            <UserPasswordCard handlePasswordChange={handlePasswordChange} />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

UserSettings.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default UserSettings;

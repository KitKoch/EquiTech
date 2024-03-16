import React, { useEffect, useState } from "react";
import { Dropdown, Button } from "react-bootstrap";
import { PieChart, Settings, User } from "react-feather";
// import avatar6 from "../../assets/img/avatars/avatar-6.jpg";
import userService from "../../services/userService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import toastr from "toastr";

const _logger = logger.extend("NavbarUser");

const NavbarUser = () => {
  const navigate = useNavigate();
  const signOut = () => {
    userService.signOut().then(onSignOutSuccess).catch(onSignOutError);
  };

  const [user, setCurrentUser] = useState({
    user: null,
  });

  useEffect(() => {
    userService
      .getCurrentUser()
      .then(getcurrentUserSuccess)
      .catch(getcurrentUserFail);
  }, []);

  const getcurrentUserSuccess = (res) => {
    setCurrentUser(() => {
      return res.item;
    });
  };

  const getcurrentUserFail = () => {
    toastr["error"]("Unable to get current user", "Error");
    _logger({ error: err });
  };

  const onSignOutSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "You Have Signed Out",
    }).then(signedOut);
  };

  const signedOut = () => {
    navigate("/auth/signin", { state: { type: "LOGOUT" } });
  };

  const onSignOutError = (error) => {
    _logger("onSignOutError", error);
    toastr.error("There was a problem, Please try again");
  };

  return (
    <Dropdown className="nav-item" align="end">
      <span className="d-inline-block d-sm-none">
        <Dropdown.Toggle as="a" className="nav-link">
          <Settings size={18} className="align-middle" />
        </Dropdown.Toggle>
      </span>
      <span className="d-none d-sm-inline-block">
        <Dropdown.Toggle as="a" className="nav-link">
          <img
            src={user?.avatarUrl}
            className="avatar img-fluid rounded-circle me-1"
            alt="Cookie Monster"
          />
          <span className="text-dark">
            {user?.firstName + " " + user?.lastName}
          </span>
        </Dropdown.Toggle>
      </span>
      <Dropdown.Menu drop="end">
        <Dropdown.Item>
          <User size={18} className="align-middle me-2" />
          Profile
        </Dropdown.Item>
        <Dropdown.Item>Work History</Dropdown.Item>
        <Dropdown.Item>
          <PieChart size={18} className="align-middle me-2" />
          Analytics
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Settings & Privacy</Dropdown.Item>
        <Dropdown.Item>Help</Dropdown.Item>
        <Dropdown.Item>
          <Button onClick={signOut}>Sign Out</Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NavbarUser;

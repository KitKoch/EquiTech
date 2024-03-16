import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import organizationServices from "../../../services/organizationService";
import { MessageSquare, Calendar } from "react-feather";
import { FaTools } from "react-icons/fa";
import toastr from "toastr";

const _logger = logger.extend("OrganizationCard");

function OrganizationCard({ user }) {
  const [organization, setOrganization] = useState({
    logo: "",
    name: "",
    type: "",
  });

  useEffect(() => {
    organizationServices
      .getUsersOrgMembership(user?.id)
      .then(onGetUsersOrgMembershipSuccess)
      .catch(onGetUsersOrgMembershipError);
  }, []);

  const onGetUsersOrgMembershipSuccess = (response) => {
    _logger("Get Organization By User Id Success", response);
    setOrganization((prevOrg) => {
      const newOrg = { ...prevOrg };
      newOrg.logo = response.item.logo;
      newOrg.name = response.item.name;
      newOrg.type = response.item.organizationType.name;
      return newOrg;
    });
    toastr.success("Organization Information Loaded");
  };

  const onGetUsersOrgMembershipError = (error) => {
    _logger("Get Organization By User Id Error", error);
    toastr.error("Can't Acquire Organization Information");
  };

  return (
    <Card className="flex-fill mb-3">
      <Card.Body className="text-center">
        <img
          src={organization.logo}
          alt="Organization Logo"
          className="img-fluid rounded-circle mb-2"
          width="128"
          height="128"
        />
        <Card.Title className="mb-0">{organization.name}</Card.Title>
        <div className="text-muted mb-2">
          Organization Type: {organization.type}
        </div>

        <div>
          <Button variant="primary" size="sm">
            <Calendar width={16} height={16} /> Schedules
          </Button>{" "}
          <Button variant="primary" size="sm">
            <MessageSquare width={16} height={16} /> Appointments
          </Button>{" "}
          <Button variant="primary" size="sm">
            <FaTools width={16} height={16} /> Services
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

OrganizationCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default OrganizationCard;

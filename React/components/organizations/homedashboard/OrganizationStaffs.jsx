import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import organizationMemberService from "../../../services/organizationMemberService";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";

const _logger = logger.extend("OrganizationStaffs");

function OrganizationStaffs({ user }) {
  const [staffs, setStaffs] = useState({
    totalCount: 0,
    currentPage: 1,
    pageSize: 4,
    arrayOfMembers: [],
    memberComponents: [],
  });

  useEffect(() => {
    organizationMemberService
      .getByOrgId(user?.organizationId, staffs.currentPage - 1, staffs.pageSize)
      .then(onGetByOrgIdSuccess)
      .catch(onGetByOrgIdError);
  }, [staffs.currentPage]);

  const onGetByOrgIdSuccess = (response) => {
    _logger("Get Org Members By Id Success", response.item);
    const currentOrgMembers = response.item.pagedItems;
    setStaffs((prevStaffs) => {
      const newStaffs = { ...prevStaffs };
      newStaffs.totalCount = response.item.totalCount;
      newStaffs.currentPage = response.item.pageIndex + 1;
      newStaffs.arrayOfMembers = currentOrgMembers;
      newStaffs.memberComponents = currentOrgMembers.map(staffCard);
      return newStaffs;
    });
    toastr.success("Organization Members Loaded");
  };

  const onGetByOrgIdError = (error) => {
    _logger("Get Org Members By Id Error", error);
    toastr.error("Unable to Get Organization Members");
  };

  const onChange = (page) => {
    setStaffs((prevData) => {
      const pd = { ...prevData };
      pd.currentPage = page;
      return pd;
    });
  };

  const staffCard = (staff) => {
    const staffInfo = staff.user;
    return (
      <React.Fragment key={staffInfo.id}>
        <div className="d-flex">
          <img
            src={staffInfo.avatarUrl}
            width="56"
            height="56"
            className="rounded-circle me-2"
            alt="Chris Wood"
          />
          <div className="flex-grow-1 ms-3">
            <p className="my-1">
              <strong>
                {staffInfo.firstName} {staffInfo.lastName}
              </strong>
            </p>
            <div className="text-muted">{staffInfo.position.name}</div>
          </div>
        </div>

        <hr className="my-2" />
      </React.Fragment>
    );
  };

  return (
    <Card className="flex-fill mb-3">
      <Card.Header>
        <Card.Title className="mb-0">
          Members ({staffs.totalCount} Active)
        </Card.Title>
      </Card.Header>
      <Card.Body>{staffs.memberComponents}</Card.Body>
      <Card.Footer>
        <Pagination
          className="text-center"
          onChange={onChange}
          pageSize={staffs.pageSize}
          current={staffs.currentPage}
          locale={locale}
          total={staffs.totalCount}
        />
      </Card.Footer>
    </Card>
  );
}

OrganizationStaffs.propTypes = {
  user: PropTypes.shape({
    organizationId: PropTypes.number.isRequired,
  }),
};

export default OrganizationStaffs;

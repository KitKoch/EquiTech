import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Table, Container, Navbar, Col, Row } from "react-bootstrap";
import { UserPlus } from "react-feather";
import organizationMemberService from "../../services/organizationMemberService";
import OrgMemberCard from "./OrgMemberCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import MemberSearchBar from "./MemberSearchBar";
import propTypes from "prop-types";

const OrgMembersList = (props) => {
  const [members, setMembers] = useState({
    membersArr: [],
    mappedMembers: [],
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
    totalCount: 0,
  });
  const [memberSearch, setMemberSearch] = useState("");
  const _logger = debug.extend("orgMember");
  const propOrgId = props.currentUser.organizationId;

  useEffect(() => {
    if (memberSearch.trim().length === 0) {
      organizationMemberService
        .getByOrgId(propOrgId, pagination.pageIndex, pagination.pageSize)
        .then(onGetByOrgIdSuccess)
        .catch(onGetByOrgIdError);
    } else {
      const input = setTimeout(() => {
        organizationMemberService
          .getByOrgNameEmail(
            memberSearch,
            pagination.pageIndex,
            pagination.pageSize
          )
          .then(onSearchSuccess)
          .catch(onSearchError);
      }, 600);
      return () => {
        clearTimeout(input);
      };
    }
  }, [memberSearch, pagination.pageIndex]);

  function onSearchSuccess(response) {
    const list = response.item.pagedItems;
    setMembers((prevState) => {
      const pd = { ...prevState };
      pd.membersArr = list;
      pd.mappedMembers = list.map(orgMembersMapped);
      return pd;
    });
  }
  function onSearchError(err) {
    _logger(err);
  }
  function onGetByOrgIdSuccess(response) {
    const list = response.item.pagedItems;
    setMembers((prevState) => {
      const pd = { ...prevState };
      pd.membersArr = list;
      pd.mappedMembers = list.map(orgMembersMapped);
      return pd;
    });
    setPagination({
      pageIndex: response.item.pageIndex,
      pageSize: response.item.pageSize,
      totalCount: response.item.totalCount,
    });
  }
  function onGetByOrgIdError(err) {
    _logger(err);
  }
  function orgMembersMapped(arr) {
    return (
      <OrgMemberCard
        membersList={arr.user}
        key={`orgMember_${arr.id}`}
        deleteMemberId={deleteMemberId}
      />
    );
  }
  function deleteMemberId(input) {
    setMembers((prevState) => {
      const pd = { ...prevState };
      pd.membersArr = [...pd.membersArr];
      const idxOf = pd.membersArr.findIndex((person) => {
        let result = false;
        if (person.user.id === input) {
          result = true;
        }
        return result;
      });
      if (idxOf >= 0) {
        pd.membersArr.splice(idxOf, 1);
        pd.mappedMembers = pd.membersArr.map(orgMembersMapped);
      }
      return pd;
    });
  }
  const handlePageChange = (page) => {
    setPagination({ ...pagination, pageIndex: page - 1 });
  };
  function handleSearch(input) {
    setMemberSearch(input);
  }
  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Row>
            <Col>
              <Card.Title sm={10}>Altura Solutions</Card.Title>{" "}
              {/*A State with the orgs Id and Name will be passed down*/}
            </Col>
            <Col className="d-flex justify-content-end ">
              <Link to="/admin/organization/members/add">
                <UserPlus className="feather" />
              </Link>
            </Col>
          </Row>
        </Card.Header>

        <Navbar>
          <Container>
            <Pagination
              pageSize={pagination.pageSize}
              current={pagination.pageIndex + 1}
              total={pagination.totalCount}
              onChange={handlePageChange}
              locale="en_US"
            />{" "}
            <MemberSearchBar mSearch={handleSearch} />
          </Container>
        </Navbar>

        <Table striped hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>{members.mappedMembers}</tbody>
        </Table>
      </Card>
    </React.Fragment>
  );
};
OrgMembersList.propTypes = {
  currentUser: propTypes.shape({
    organizationId: propTypes.number.isRequired,
  }).isRequired,
};
export default OrgMembersList;

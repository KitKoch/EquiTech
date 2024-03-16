import React from "react";
import { useEffect, useCallback } from "react";
import userSkillService from "../../services/userSkillServices";
import { useState } from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import { Form, Formik, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const UserSkillsList = (props) => {
  const _logger = debug.extend("userskillsList");
  const [userSkillData, setUserSkillData] = useState({
    currentUserSkills: [],
    userSkillComponents: [],
    pageIndex: 0,
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  });

  const [searchInput, setSearchInput] = useState("");
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const navigate = useNavigate();
  const { candidateId } = useParams();

  useEffect(() => {
    _logger(props, props.currentUser.roles[0], "roles");
    _logger("This is the Candidate Id:", candidateId);

    let idToBeUse = props.currentUser.id;
    if (candidateId) {
      idToBeUse = candidateId;
    }
    getData(idToBeUse);
  }, [userSkillData.currentPage]);

  const getData = (idToBeUse) => {
    _logger(props, "props");
    userSkillService
      .getByUserId(
        idToBeUse,
        userSkillData.currentPage - 1,
        userSkillData.pageSize
      )
      .then(getSuccess)
      .catch(getError);
  };

  const getSuccess = (response) => {
    let paginationData = response.item;
    let skillArray = response.item.pagedItems;
    setUserSkillData((prev) => {
      const n = { ...prev };
      n.currentUserSkills = skillArray;
      n.userSkillComponents = skillArray.map(mapUserSkills);
      n.currentPage = paginationData.pageIndex + 1;
      n.pageSize = paginationData.pageSize;
      n.totalCount = paginationData.totalCount;
      n.totalPages = paginationData.totalPages;
      _logger(n);
      return n;
    });
  };

  const getError = (error) => {
    _logger(error);
  };

  const mapUserSkills = (skillObj) => {
    const onEditClicked = () => {
      navigate(`/user/skills/${skillObj.skill.id}`, { state: skillObj });
    };

    const onLocalDeleteClick = () => {
      handleDeleteSkill(skillObj.skill.id);
    };

    return (
      <tr key={skillObj.skill.id}>
        <td>{skillObj.skill.name}</td>
        <td>{skillObj.industry.name}</td>
        <td>
          {skillObj.experience.name}: {skillObj.experience.col3}
        </td>
        {props.currentUser.roles.includes("Candidate") && (
          <>
            <td>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={onEditClicked}
              >
                Edit
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger"
                type="button"
                onClick={onLocalDeleteClick}
              >
                Delete
              </button>
            </td>
          </>
        )}
      </tr>
    );
  };

  const onChange = (page) => {
    setUserSkillData((prevState) => {
      const n = { ...prevState };
      n.currentPage = page;
      return n;
    });
  };

  const searchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSkills = (e) => {
    e.preventDefault();
    userSkillService
      .searchSkills(
        userSkillData.pageIndex,
        userSkillData.pageSize,
        searchInput
      )
      .then(onSearchSkillsSuccess)
      .catch(onSearchSkillsError);
  };

  const onSearchSkillsSuccess = (response) => {
    _logger("onSeachSuccess", response);
    let skillArray = response.item.pagedItems;
    setUserSkillData((prev) => {
      const d = { ...prev };
      d.currentUserSkills = skillArray;
      d.userSkillComponents = skillArray.map(mapUserSkills);
      d.totalCount = response.item.totalCount;
      d.totalPages = response.item.totalPages;
      d.currentPage = 1;
      _logger(response);
      return d;
    });
    setIsSearchPerformed(true);
  };

  const onSearchSkillsError = (error) => {
    _logger(error);
  };

  const handleAddNewSkill = () => {
    navigate("/user/skills/new");
  };

  const handleDeleteSkill = useCallback((skillId) => {
    _logger(skillId, "skillId handleDeleteSkill");

    Swal.fire({
      title: "Are you sure?",
      text: "This skill will be deleted permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      customClass: { confirmButton: "mx-5" },
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const handler = getDeleteSuccessHandler(skillId);
        userSkillService
          .deleteSkill(skillId)
          .then(handler)
          .catch(onDeleteError);
      } else if (result.dismiss) {
        Swal.fire({
          title: "Delete cancelled!",
          icon: "info",
        });
      }
    });
  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    _logger(idToBeDeleted, "idToBeDeleted");
    Swal.fire({
      title: "Deleted successfully!",
      icon: "success",
    });

    setUserSkillData((prev) => {
      const newPageData = { ...prev };

      const indexOf = newPageData.currentUserSkills.findIndex((skillId) => {
        _logger(skillId, "setUserSkill:skillId");
        let result = false;

        if (skillId.skill.id === idToBeDeleted) {
          result = true;
        }
        return result;
      });

      if (indexOf >= 0) {
        newPageData.currentUserSkills.splice(indexOf, 1);
        newPageData.userSkillComponents =
          newPageData.currentUserSkills.map(mapUserSkills);
      }
      return newPageData;
    });
  };

  const onDeleteError = (error) => {
    _logger(error, "onDeleteError");
    Swal.fire({
      title: "Not deleted!",
      icon: "info",
    });
  };

  const handleShowAllSkills = () => {
    setIsSearchPerformed(false);
    setSearchInput("");
    const idToBeUsed = candidateId ? candidateId : props.currentUser.id;
    getData(idToBeUsed);
  };

  return (
    <div>
      <Formik>
        <Form>
          {props.currentUser.roles.includes("Candidate") && (
            <button
              type="button"
              className="btn btn-info mb-3"
              onClick={handleAddNewSkill}
            >
              Add New Skill
            </button>
          )}
          <div className="mb-2">
            <label htmlFor="searchKeyword">Search Skills</label>
            <div className="row input-group-lg">
              <div className="col-10">
                <Field
                  type="text"
                  name="searchKeyword"
                  className="form-control  w-100"
                  value={searchInput}
                  onChange={searchInputChange}
                />
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-success w-100"
                  onClick={handleSearchSkills}
                >
                  Search Skills
                </button>
              </div>
              {isSearchPerformed && (
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-primary w-100 mt-2"
                    onClick={handleShowAllSkills}
                  >
                    Show All Skills
                  </button>
                </div>
              )}
            </div>
          </div>
        </Form>
      </Formik>

      {userSkillData.currentUserSkills.length === 0 && (
        <div className="alert alert-info">
          No candidate skills have been added.
        </div>
      )}

      <Table bordered>
        <thead className="bg-primary text-white">
          <tr>
            <td>Skill</td>
            <td>Industry</td>
            <td>Experience Level</td>
            {props.currentUser.roles.includes("Candidate") && (
              <>
                <td></td>
                <td></td>
              </>
            )}
          </tr>
        </thead>
        <tbody className="bg-white">{userSkillData.userSkillComponents}</tbody>
      </Table>
      <Pagination
        onChange={onChange}
        current={userSkillData.currentPage}
        total={userSkillData.totalCount}
        pageSize={userSkillData.pageSize}
        locale={locale}
        className="mb-3 "
      />
    </div>
  );
};
UserSkillsList.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default UserSkillsList;

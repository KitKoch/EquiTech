import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Table, Button } from "react-bootstrap";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";
import Swal from "sweetalert2";
import "../skills/skills.css";
import * as skillsService from "../../services/skillService";
import Skill from "./Skill";

export default function SkillList() {
  const _logger = debug.extend("SkillList");

  const [pageData, setPageData] = useState({
    skills: [],
    skillComponents: [],
    pageIndex: 0,
    pageSize: 10,
    totalSkills: 0,
  });

  const navigate = useNavigate();

  const onPageChange = (page) => {
    _logger(page, "click");

    setPageData((prevState) => {
      const newPageData = { ...prevState };
      newPageData.pageIndex = page - 1;
      return newPageData;
    });
  };

  useEffect(() => {
    _logger("firing useEffect for get skills");

    skillsService
      .getSkillsPaged(pageData.pageIndex, pageData.pageSize)
      .then(onGetSkillsPagedSuccess)
      .catch(onGetSkillsError);
  }, [pageData.pageIndex + 1]);

  const onGetSkillsPagedSuccess = (data) => {
    _logger(data, "onGetSkillsPagedSuccess");

    let newSkills = data.item.pagedItems;
    _logger(newSkills);

    setPageData((prevState) => {
      const newPageData = { ...prevState };
      newPageData.skills = newSkills;
      newPageData.totalSkills = data.item.totalCount;
      newPageData.skillComponents = newSkills.map(mapSkill);

      return newPageData;
    });
  };

  const onGetSkillsError = (error) => {
    _logger(error, "onGetSkillsError");
    toastr.error("Something went wrong. Failed to get the skills list.");
  };

  const mapSkill = (aSkill) => {
    return (
      <Skill
        skill={aSkill}
        key={`skill_${aSkill.id}`}
        onSkillDeleteClicked={onDeleteRequest}
        onSkillEditClicked={onEditRequest}
        onSkillApproveClicked={onApproveRequest}
      />
    );
  };

  const onApproveRequest = useCallback((mySkill, eObj) => {
    _logger(mySkill.id, { mySkill, eObj });

    Swal.fire({
      title: mySkill.isApproved
        ? "Are you sure to uncheck it?"
        : "Are you sure to approve?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: mySkill.isApproved
        ? "Yes, uncheck it!"
        : "Yes, approve it!",
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const handler = getApproveSuccessHandler(mySkill.id);
        skillsService
          .updateSkillIsApproved(mySkill, mySkill.id)
          .then(handler)
          .catch(onApproveError);
      } else if (result.dismiss) {
        Swal.fire({
          title: "Request cancelled!",
          icon: "info",
        });
      }
    });
  }, []);

  const getApproveSuccessHandler = (idToBeApproved) => {
    _logger(idToBeApproved, "getApproveSuccessHandler");

    Swal.fire({
      title: "Changed successfully!",
      icon: "success",
    });

    setPageData((prevState) => {
      const newPageData = { ...prevState };

      const indexOf = newPageData.skills.findIndex((skill) => {
        let result = false;

        if (skill.id === idToBeApproved) {
          result = true;
        }
        return result;
      });

      if (indexOf >= 0) {
        newPageData.skills[indexOf].isApproved =
          !newPageData.skills[indexOf].isApproved;

        newPageData.skillComponents = newPageData.skills.map(mapSkill);
      }
      return newPageData;
    });
  };

  const onApproveError = (error) => {
    _logger(error, "onApproveError");
    Swal.fire({
      title: "Change Not made, please try again!",
      icon: "info",
    });
  };

  const onEditRequest = (skill) => {
    _logger("go to skills form", skill.id);
    const state = {
      type: "SKILL_VIEW",
      payload: { skill },
    };
    navigate(`/skills/${skill.id}/edit`, { state });
  };

  const onDeleteRequest = useCallback((mySkill, eObj) => {
    _logger(mySkill.id, { mySkill, eObj });

    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will be able to edit it to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const handler = getDeleteSuccessHandler(mySkill.id);
        skillsService.deleteById(mySkill.id).then(handler).catch(onDeleteError);
      } else if (result.dismiss) {
        Swal.fire({
          title: "Delete cancelled!",
          icon: "info",
        });
      }
    });
  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    _logger(idToBeDeleted, "getDeleteSuccessHandler");
    Swal.fire({
      title: "Deleted successfully!",
      icon: "success",
    });

    setPageData((prevState) => {
      const newPageData = { ...prevState };

      const indexOf = newPageData.skills.findIndex((skill) => {
        let result = false;

        if (skill.id === idToBeDeleted) {
          result = true;
        }
        return result;
      });

      if (indexOf >= 0) {
        newPageData.skills[indexOf].isDeleted = true;
        newPageData.skillComponents = newPageData.skills.map(mapSkill);
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

  const onClickAdd = () => {
    navigate("/skills/add");
  };

  return (
    <React.Fragment>
      <Card className="bg-light">
        <Card.Header className="bg-light pb-0">
          <Card.Title className="mt-2 mb-auto fs-1">
            Skills
            <Button
              type="button"
              variant="primary"
              className="btn btn-lg float-end"
              onClick={onClickAdd}
            >
              Add New Skill
            </Button>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Table className="table-responsive table-striped table-hover table-primary">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
                <th>Industry Name</th>
                <th className="skills-col">Is Deleted</th>
                <th className="skills-col">Is Approved</th>
                <th className="skills-col">Date Created</th>
                <th className="skills-col">Date Modified</th>
                <th className="skills-col">Actions</th>
              </tr>
            </thead>
            <tbody>{pageData.skillComponents}</tbody>
          </Table>
          <Pagination
            className="pagination justify-content-end mt-4 mb-2 mx-3"
            onChange={onPageChange}
            pageSize={pageData.pageSize}
            current={pageData.pageIndex + 1}
            total={pageData.totalSkills}
            locale={locale}
          />
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

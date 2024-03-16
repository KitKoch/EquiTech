import React from "react";
import PropTypes from "prop-types";
import { Badge } from "react-bootstrap";
import { Edit, Trash } from "react-feather";

export default function Skill(props) {
  const _logger = debug.extend("Skill");
  const aSkill = props.skill;

  const onLocalSkillDeleteClick = (e) => {
    _logger(props.skill, e);
    e.preventDefault();
    props.onSkillDeleteClicked(props.skill, e);
  };

  const onLocalEditClick = (e) => {
    _logger("Local edit clicked", e.target);
    props.onSkillEditClicked(props.skill, e);
  };

  const onLocalApproveClick = (e) => {
    _logger("Local approve clicked", e.target);
    props.onSkillApproveClicked(props.skill, e);
  };

  return (
    <tr>
      <td>{aSkill.id}</td>
      <td>{aSkill.name}</td>
      <td>{aSkill.description}</td>
      <td>{aSkill.industry.name}</td>
      <td>
        <Badge className={aSkill.isDeleted ? "bg-danger" : "bg-success"}>
          {aSkill.isDeleted ? "Deleted" : "Active"}
        </Badge>
      </td>
      <td>
        <Badge className={aSkill.isApproved ? "bg-success" : "bg-warning"}>
          {aSkill.isApproved ? "Approved" : "Pending"}
        </Badge>
      </td>
      <td>{aSkill.dateCreated.slice(0, 10)}</td>
      <td>{aSkill.dateModified.slice(0, 10)}</td>
      <td className="table-action">
        <Edit
          className="align-middle me-1 skills-feather-18 link-btn"
          type="button"
          onClick={onLocalEditClick}
        />
        <Trash
          className="align-middle me-1 skills-feather-18"
          type="button"
          onClick={onLocalSkillDeleteClick}
          visibility={aSkill.isDeleted ? "hidden" : "visible"}
        />
        <input
          className="align-middle me-1 skills-feather-18 bg-success"
          type="checkbox"
          checked={aSkill.isApproved}
          onChange={onLocalApproveClick}
        />
      </td>
    </tr>
  );
}

Skill.propTypes = {
  skill: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    industry: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    isDeleted: PropTypes.bool.isRequired,
    isApproved: PropTypes.bool.isRequired,
    createdBy: PropTypes.number.isRequired,
    modifiedBy: PropTypes.number.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
  }).isRequired,
  onSkillDeleteClicked: PropTypes.func.isRequired,
  onSkillEditClicked: PropTypes.func.isRequired,
  onSkillApproveClicked: PropTypes.func.isRequired,
  isChecked: PropTypes.bool,
};

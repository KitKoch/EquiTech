import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Edit2, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";

const GoalCard = (props) => {
  const _logger = debug.extend("GoalCard");
  const aGoal = props.goal;
  _logger(props);

  const onLocalDeleteClicked = (evt) => {
    evt.preventDefault();
    props.onGoalClicked(props.goal, evt);
  };

  const personalValueNames = useMemo(
    () =>
      aGoal.goalValues.map((item) => <div key={item.name}>{item.name}.</div>),
    [aGoal.goalValues]
  );

  const navigate = useNavigate();
  const goToPage = () => {
    const stateCard = { type: "CANDIDATE_GOAL", payload: aGoal };
    navigate(`/goals/${aGoal.id}/form`, { state: stateCard });
  };

  const goalExpirationInfo = useMemo(() => {
    const currentDate = new Date();
    const currentMonth =
      currentDate.getMonth() + 1 > 9
        ? currentDate.getMonth() + 1
        : `0${currentDate.getMonth() + 1}`;
    const currentDateStr = `${currentDate.getFullYear()}-${currentMonth}-${currentDate.getDate()}`;
    const startYear = props.goal.dateCreated.slice(0, 4);
    const endMonth = props.goal.dateCreated.slice(5, 7);
    const endDay = props.goal.dateCreated.slice(8, 10);
    const endYear = parseInt(startYear) + props.goal.yearsToGoal;
    const endDateStr = `${endYear}-${endMonth}-${endDay}`;
    const inMin = new Date(endDateStr) - new Date(currentDateStr);
    const daysLeft = Math.round(inMin / (1000 * 60 * 60 * 24));
    return {
      endDateStr,
      daysLeft,
    };
  }, [props.goal]);

  return (
    <React.Fragment>
      <tr>
        <td width="13%">
          {aGoal.createdBy.firstName} {aGoal.createdBy.lastName}
        </td>
        <td width="10%">{aGoal.name}</td>
        <td width="15%">{aGoal.statement}</td>
        <td width="10%">${aGoal.paymentPreference.desiredPay.toFixed(2)}</td>
        <td width="4%">{aGoal.priority}</td>
        <td width="11%">
          <div>{aGoal.yearsToGoal} Year Goal</div>
          <div>{goalExpirationInfo.endDateStr}</div>
          <div>Days Left: {goalExpirationInfo.daysLeft}</div>
        </td>
        <td width="25%">{personalValueNames}</td>
        <td width="5%">{aGoal.isCompleted ? "Yes" : "No"}</td>
        {props.currentUser.roles.includes("Candidate") && (
          <td width="4%">
            <Edit2
              className="align-middle me-1"
              size={18}
              onClick={goToPage}
              cursor="pointer"
            />
            <Trash
              className="align-middle"
              size={18}
              onClick={onLocalDeleteClicked}
              cursor="pointer"
            />
          </td>
        )}
      </tr>
    </React.Fragment>
  );
};

GoalCard.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    statement: PropTypes.string.isRequired,
    paymentPreference: PropTypes.shape({
      id: PropTypes.number.isRequired,
      minimumPay: PropTypes.number.isRequired,
      desiredPay: PropTypes.number.isRequired,
      isHourly: PropTypes.bool.isRequired,
    }).isRequired,
    priority: PropTypes.number.isRequired,
    yearsToGoal: PropTypes.number.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,

    createdBy: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
    }).isRequired,

    goalValues: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ).isRequired,

    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,

  onGoalClicked: PropTypes.func,

  currentUser: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default GoalCard;

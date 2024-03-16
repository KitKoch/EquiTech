import React, { memo } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const _logger = debug.extend("CompensationLabelSelect");

const animatedSelect = makeAnimated();

function CompensationLabelSelect(props) {
  const onChangeValue = (currentLabels, actionType) => {
    _logger("currentLabels", currentLabels);
    _logger("ActionType", actionType);

    if (actionType.action === "select-option") {
      props.addLabel(currentLabels, actionType.option, props.typeId);
    } else if (actionType.action === "remove-value") {
      props.deleteLabel(currentLabels, actionType.removedValue, props.typeId);
    } else if (actionType.action === "clear") {
      props.clearLabels(props.typeId);
    }
  };

  return (
    <Select
      options={props.labels}
      value={props.currentValues}
      isMulti={true}
      onChange={onChangeValue}
      closeMenuOnSelect={false}
      hideSelectedOptions={true}
      isClearable={true}
      placeholder="Select New Label"
      components={animatedSelect}
    />
  );
}

CompensationLabelSelect.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  currentValues: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  typeId: PropTypes.number.isRequired,

  addLabel: PropTypes.func.isRequired,
  deleteLabel: PropTypes.func.isRequired,
  clearLabels: PropTypes.func.isRequired,
};

export default memo(CompensationLabelSelect);

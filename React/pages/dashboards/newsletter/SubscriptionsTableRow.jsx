import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/ToggleButton";
import { formatDateTime } from "../../../utils/dateFormater.js";

function SubscriptionsTableRow(props) {
  const element = props.subscription;

  const status = () => {
    let statusMsg = "Not Subscribed";
    let buttonMsg = "Subscribe";
    if (element.isSubscribed) {
      statusMsg = "Subscribed";
      buttonMsg = "Unsubscribe";
    }
    return (
      <div className="d-flex justify-content-between align-items-center">
        {statusMsg}
        <Button className="mx-2" variant="outline-dark" onClick={onStatusClick}>
          {buttonMsg}
        </Button>
      </div>
    );
  };

  const onStatusClick = (e) => {
    e.preventDefault();
    let newElement = element;
    newElement.isSubscribed = !element.isSubscribed;
    props.statusChange(newElement);
  };

  return (
    <tr>
      <td>{element?.email}</td>
      <td>{formatDateTime(element?.dateCreated)}</td>
      <td>{status()}</td>
    </tr>
  );
}

SubscriptionsTableRow.propTypes = {
  subscription: PropTypes.shape({
    email: PropTypes.string.isRequired,
    isSubscribed: PropTypes.bool.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
  }),
  statusChange: PropTypes.func.isRequired,
};

export default SubscriptionsTableRow;

import React from "react";
import PropTypes from "prop-types";
import { Trash2, Edit } from "react-feather";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function CharitableFundListItem({ charitableFund, fundDelete, fundEdit }) {
  const onEditClicked = () => {
    fundEdit(charitableFund);
  };

  const onDeleteClicked = () => {
    fundDelete(charitableFund);
  };

  const renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {charitableFund.description}
      </Tooltip>
    );
  };

  return (
    <tr role="row">
      <td role="cell" className="align-middle">
        <div className="d-flex align-items-center">
          <div className="ms-3">
            <h5 className="mb-0">
              <a
                className="text-inherit"
                href="/dashboard/projects/single/files"
              ></a>
            </h5>
          </div>
        </div>
      </td>
      <td role="cell" className="align-middle">
        {charitableFund.name}
      </td>
      <td role="cell" className="align-middle">
        <OverlayTrigger placement="right-start" overlay={renderTooltip}>
          <div>{charitableFund.description.slice(0, 30)}</div>
        </OverlayTrigger>
      </td>
      <td role="cell" className="align-middle">
        <Button variant="link" href={charitableFund.url}>
          {charitableFund.url}
        </Button>
      </td>
      <td role="cell" className="align-middle">
        {charitableFund.dateCreated.slice(0, 10)}
      </td>
      <td role="cell" className="align-middle">
        <div className="dropdown">
          <Button variant="link" onClick={onEditClicked}>
            <Edit />
          </Button>
          <Button variant="link" onClick={onDeleteClicked}>
            <Trash2 />
          </Button>
        </div>
      </td>
    </tr>
  );
}

CharitableFundListItem.propTypes = {
  fundDelete: PropTypes.func.isRequired,
  fundEdit: PropTypes.func.isRequired,
  charitableFund: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
  }),
};
export default CharitableFundListItem;

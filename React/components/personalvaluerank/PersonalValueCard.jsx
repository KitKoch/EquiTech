import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, ProgressBar, Badge } from "react-bootstrap";
import { Trash2, MoreVertical } from "react-feather";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./PersonalValue.css";
const percentConverter = (rankNum, total) => {
  return (100 / total) * (total - rankNum + 1);
};

function PersonalValueCard(props) {
  const [cardData] = useState({
    totalCount: props.total,
    progressBarPercentage: percentConverter(props.record.rank, props.total),
  });
  const aPersonalValue = props.record;
  const onRemoveClicked = () => {
    props.onRemoveClicked(aPersonalValue.id);
  };
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <React.Fragment>
      <Card
        className="mb-3 bg-light border"
        ref={setNodeRef}
        style={style}
        {...attributes}
      >
        <Card.Body className="p-3 row">
          <MoreVertical className="my-auto col-1" {...listeners} />
          <h4 className="col-9 my-auto personal-values-zero-padd">
            {aPersonalValue.name}
          </h4>
          <Trash2
            className="btn my-auto col-2"
            size={30}
            onClick={onRemoveClicked}
          />
        </Card.Body>
        <Card.Footer>
          <p className="mb-2 fw-bold">
            Current Ranking
            <Badge className="float-end" pill>
              {aPersonalValue.rank}
            </Badge>
          </p>
          <ProgressBar
            className="progress-md mb-1"
            animated
            now={cardData.progressBarPercentage}
          />
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
}

PersonalValueCard.propTypes = {
  id: PropTypes.number.isRequired,
  record: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rank: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sort: PropTypes.number.isRequired,
  }),
  total: PropTypes.number.isRequired,
  onRemoveClicked: PropTypes.func.isRequired,
};
export default PersonalValueCard;

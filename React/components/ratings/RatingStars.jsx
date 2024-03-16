import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import AverageChecker from "./AverageChecker";
import ratingService from "../../services/ratingService";
import PropTypes from "prop-types";
import toastr from "toastr";
import "toastr/build/toastr.css";

function RatingStars(props) {
  const _logger = debug.extend("reviews");
  const commentId = props.commentId;
  const entityTypeId = props.entityTypeId;
  const entityId = props.entityId;
  const showAverage = props.isShowAverage;

  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    rating: 0,
    commentId: 0,
    entityTypeId: 0,
    entityId: 0,
  });

  useEffect(() => {
    setFormData((prevState) => {
      let nS = { ...prevState };
      nS.commentId = commentId;
      nS.entityTypeId = entityTypeId;
      nS.entityId = entityId;

      return nS;
    });
  }, [props]);

  useEffect(() => {
    if (rating !== 0) {
      let dataForService = { ...formData };
      dataForService.rating = rating;
      dataForService.commentId = props.commentId;
      dataForService.entityId = props.entityId;
      dataForService.entityTypeId = props.entityTypeId;

      _logger("data for service after the parse", dataForService);

      ratingService
        .addReview(dataForService)
        .then(onAddRatingSuccess)
        .catch(onAddRatingError);
    }
  }, [props.entityId]);

  _logger("rating", rating);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const onAddRatingSuccess = (response) => {
    _logger("onAddRatingSuccess", response);
  };

  const onAddRatingError = (error) => {
    _logger("onAddRatingError", error);
    toastr.error("There was an error sending your review", error);
  };

  const fillColorArray = [
    "#f17a45",
    "#f17a45",
    "#f19745",
    "#f19745",
    "#f1a545",
    "#f1a545",
    "#f1b345",
    "#f1b345",
    "#f1d045",
    "#f1d045",
  ];
  return (
    <React.Fragment>
      <Rating
        transition
        size={50}
        onClick={handleRating}
        fillColorArray={fillColorArray}
      />
      {showAverage && (
        <AverageChecker
          entityId={formData.entityId}
          entityTypeId={formData.entityTypeId}
          key={`${formData.entityId}${formData.entityTypeId}`}
        />
      )}
    </React.Fragment>
  );
}

RatingStars.propTypes = {
  commentId: PropTypes.number.isRequired,
  entityTypeId: PropTypes.number.isRequired,
  entityId: PropTypes.number.isRequired,
  isShowAverage: PropTypes.bool.isRequired,
};

export default RatingStars;

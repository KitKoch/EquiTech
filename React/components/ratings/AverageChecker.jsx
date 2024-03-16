import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import ratingService from "../../services/ratingService";
import PropTypes from "prop-types";
import toastr from "toastr";
import "toastr/build/toastr.css";

function AverageChecker(props) {
  const aEntityTypeId = props.entityTypeId;
  const aEntityId = props.entityId;
  const [paginatedRequest] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [ratingsData, setRatingData] = useState({
    average: 0,
    totalCount: 0,
  });

  useEffect(() => {
    if (aEntityTypeId !== 0) {
      ratingService
        .getByEntityId(
          paginatedRequest.pageIndex,
          paginatedRequest.pageSize,
          aEntityId,
          aEntityTypeId
        )
        .then(onGetByEntitySuccess)
        .catch(onGetByEntityError);

      ratingService
        .getAverage(aEntityTypeId, aEntityId)
        .then(onGetAverageSuccess)
        .catch(onGetAverageError);
    }
  }, []);

  const onGetAverageSuccess = (response) => {
    setRatingData((prevState) => {
      let nS = { ...prevState };

      nS.average = response.item;

      return nS;
    });
  };

  const onGetAverageError = (error) => {
    toastr.error("No average found", error);
  };

  const onGetByEntitySuccess = (response) => {
    setRatingData((prevState) => {
      let nS = { ...prevState };

      nS.totalCount = response.item.totalCount;

      return nS;
    });
  };

  const onGetByEntityError = (error) => {
    toastr.error("We had an error trying to find your Entity", error);
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
      <p>
        Average:{" "}
        <Rating
          readonly
          initialValue={ratingsData.average}
          size={10}
          fillColorArray={fillColorArray}
        />{" "}
        {ratingsData.average}({ratingsData.totalCount})
      </p>
    </React.Fragment>
  );
}

AverageChecker.propTypes = {
  entityTypeId: PropTypes.number.isRequired,
  entityId: PropTypes.number.isRequired,
};

export default AverageChecker;

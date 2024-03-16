import React, { useState } from "react";
import RatingStars from "./RatingStars";

function Reviews() {
  const _logger = debug.extend("reviews");
  const [formData, setFormData] = useState({
    commentId: 16,
    entityTypeId: 3,
    entityId: 3,
  });

  _logger(setFormData);

  return (
    <React.Fragment>
      <div className="container mt-3">
        <div className="row text-center">
          <div className=" my-4">Reviews</div>

          <div className="mb-3">
            <RatingStars
              commentId={formData.commentId}
              entityTypeId={formData.entityTypeId}
              entityId={formData.entityId}
              isShowAverage={true}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Reviews;

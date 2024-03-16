import React from "react";
import { useEffect, useState } from "react";
import surveyService from "../../services/surveyService";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatDateTime } from "../../utils/dateFormater";
import { useCallback } from "react";
import { Card } from "react-bootstrap";
import toastr from "toastr";

const avatar = {
  width: "70px",
  height: "70px",
  borderRadius: "100px",
};

const Response = ({ currentSurvey }) => {
  const initialPagination = {
    pageIndex: 0,
    pageSize: 20,
    hasNextPage: true,
    totalCount: 0,
  };
  const [pagination, setPagination] = useState(initialPagination);
  const [selectResponse, setSelectResponse] = useState();
  const [currentResponses, setCurrentResponses] = useState([]);
  const [selectDetails, setSelectDetails] = useState();
  const _logger = logger.extend("survey");

  const onFetchSuccess = ({ item }) => {
    _logger("fetch successful", item);
    const { pageIndex, pageSize, hasNextPage, totalCount, pagedItems } = item;
    setPagination({ pageIndex, pageSize, hasNextPage, totalCount });
    setCurrentResponses(pagedItems);
    setSelectResponse(pagedItems[0]);
  };
  const onFetchFailed = (e) => {
    toastr.error("fetch failed", e);
  };

  useEffect(() => {
    if (!currentSurvey) return;
    surveyService
      .getSurveyInstancesById(
        currentSurvey.id,
        pagination.pageIndex,
        pagination.pageSize
      )
      .then(onFetchSuccess)
      .catch(onFetchFailed);
  }, [currentSurvey, pagination.pageIndex]);

  const onFetchDetailSuccess = ({ item }) => {
    _logger("get details", item);
    setSelectDetails(item);
    _logger(selectDetails);
  };

  useEffect(() => {
    if (!selectResponse) return;
    surveyService
      .getSurveyInstancesDetail(selectResponse.id)
      .then(onFetchDetailSuccess)
      .catch(onFetchFailed);
  }, [selectResponse]);

  const styleSroll = {
    height: "93vh",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    maxWidth: "300px",
  };

  const mappedResponses = useCallback(() => {
    return currentResponses.map((res) => (
      <div
        key={res.id}
        className={`d-flex p-2 ${
          selectResponse?.id === res.id && "bg-light border"
        }`}
        onClick={() => setSelectResponse(res)}
      >
        <div>
          <div>{res.creator.firstName}</div>
          <div>created at: {formatDateTime(res.dateCreated)}</div>
        </div>
      </div>
    ));
  }, [currentResponses, selectResponse]);

  const nextPage = () => {
    if (!pagination.hasNextPage) return;
    setPagination((prev) => {
      return {
        ...prev,
        pageIndex: prev.pageIndex + 1,
      };
    });
  };

  const detailBody = useCallback(() => {
    _logger("Modified select details");
    if (!selectDetails)
      return (
        <div>
          <h2>loading...</h2>
        </div>
      );

    return (
      <div>
        <Card>
          <div className="d-flex">
            <img src={selectDetails.creator.avatarUrl} alt="" style={avatar} />
            <div className="ms-3 d-flex flex-column justify-content-center">
              <div className="fw-bolder">
                {selectDetails.creator.lastName},{" "}
                {selectDetails.creator.firstName}
              </div>
              <div>
                Time Created: {formatDateTime(selectDetails.dateCreated)}
              </div>
            </div>
          </div>
        </Card>
        <h3>Questions</h3>
        {selectDetails.questions.map((question) => (
          <div key={question.id} className="my-1 border-bottom w-100">
            <div className="fw-bolder">{question.question}</div>
            <div className="d-flex ms-4">
              <div className="me-2">Answer: </div>
              {question.answers ? (
                <div>
                  {question.answers.map((answer) => (
                    <div key={answer.id}>{answer.answer}</div>
                  ))}
                </div>
              ) : (
                <div>No answer provided</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }, [selectDetails]);

  return (
    <div className="d-flex w-100">
      <InfiniteScroll
        dataLength={currentResponses.length}
        next={nextPage}
        hasMore={pagination.hasNextPage}
        scrollableTarget="scrollable"
      >
        <div style={styleSroll} id="scrollable">
          {mappedResponses()}
        </div>
      </InfiniteScroll>
      <div className="px-4 flex-grow-1">{detailBody()}</div>
    </div>
  );
};

Response.propTypes = {
  currentSurvey: propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    description: propTypes.string,
    surveyStatus: propTypes.shape({ name: propTypes.string }),
    createdBy: propTypes.shape({
      avatarUrl: propTypes.string,
      firstName: propTypes.string,
    }),
    surveyTypes: {
      name: propTypes.string,
    },
    dateCreated: propTypes.string,
  }),
};

export default Response;

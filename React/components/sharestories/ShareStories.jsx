import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import "./sharestories.css";
import { Link } from "react-router-dom";
import { getStoriesPaged } from "../../services/shareStoryService";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";

function ShareStories({ currentUser }) {
  const _logger = debug.extend("share stories");
  _logger("share stories");
  const [state, setState] = useState({
    shareStories: [],
    storyComponents: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: 0,
    isApproved: true,
    isLoggedIn: false,
  });

  const navigate = useNavigate();

  const mappingStories = (aStory) => {
    _logger("mapping stories", aStory);
    const seeMoreClicked = () => {
      let upStory = { type: "STORY_FULL", payload: aStory };
      navigate(`/sharestories/${aStory.id}/seemore`, { state: upStory });
    };
    return (
      <Row key={"ShareStoryPreview-" + aStory.id} className="border-bottom">
        <div className="d-flex py-3">
          <div>
            <img
              className="story-avatar w-auto mh-200 col-6 col-sm-auto story-avatar-control img-thumbnail rounded-circle"
              src={aStory.author.avatarUrl}
            />
          </div>
          <div className="ms-5 d-flex flex-column story-width justify-content-center">
            <h3 className="bs-primary text-primary fs-1">{aStory.name}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  aStory.story.substring(0, 350) + "..."
                ),
              }}
              className="editor"
            ></div>
            <Row className="mt-3">
              <div className="col">
                {" "}
                <div>
                  Author:{" "}
                  {aStory.author.firstName + " " + aStory.author.lastName}
                  <p className="me-auto">
                    Date Posted: {aStory.dateCreated.substring(0, 10)}
                  </p>
                </div>
              </div>
              <div className="col text-center">
                {" "}
                <Button className="btn btn-primary" onClick={seeMoreClicked}>
                  See More
                </Button>
              </div>
            </Row>
          </div>
        </div>
      </Row>
    );
  };

  useEffect(() => {
    getStoriesPaged(state.pageIndex, state.pageSize, state.isApproved)
      .then(onPageSuccess)
      .catch(onPageError);
  }, [state.pageIndex]);

  useEffect(() => {
    _logger("currentUser", currentUser);
    setState((prevState) => {
      let newState = { ...prevState };
      newState.isLoggedIn = currentUser.isLoggedIn;

      return newState;
    });
  }, []);

  const onPageSuccess = (response) => {
    _logger("onPageSuccess", response.item.totalCount);
    setState((prevState) => {
      const pv = { ...prevState };
      pv.shareStories = response.item.pagedItems;
      pv.storyComponents = pv.shareStories.map(mappingStories);
      pv.totalCount = response.item.totalCount;
      return pv;
    });
  };

  const onPageError = (err) => {
    toastr.error("Unable to load page data. Please refresh page and try again");
    _logger(err);
  };

  const onChangeStoryPage = (page) => {
    setState((prevState) => {
      return { ...prevState, pageIndex: page - 1 };
    });
  };

  return (
    <React.Fragment>
      <Container className="bg-white mw-50 pt-3">
        <Row>
          <Col className="px-3">
            <div>
              <div className="bg-primary w-100 mb-3 pt-3">
                <h1 className="share-story-title text-center  text-light">
                  Our Success Stories
                </h1>
                <div className="share-story-head-info mx-3 p-4 text-center text-wrap text-white">
                  &nbsp; &nbsp; Fairly has been an answer to the hiring dilemma
                  commonly faced on both the hiring and applying side of
                  employment. Our clients have made a big decision to choose
                  working with with a third party platform and have seen the
                  benefits. Fairly provides an opportunity to be lifechanging,
                  to create new relationships and business partners. So who
                  better to get advice from than past and current customers who
                  have been right where you are? You’ll hear stories of pivots
                  in careers, the Fairly experience, how they got the job or
                  found talent after sign up and the exciting companies and
                  associates they work with now! At Fairly, community is
                  everything – which is why we post these stories. We could not
                  be more proud of what our clients have achieved. We hope these
                  inspire you to consider a future with Fairly!
                </div>
              </div>
              <div>{state?.storyComponents}</div>
              <div className="pt-3">
                {" "}
                <Pagination
                  onChange={onChangeStoryPage}
                  current={state.pageIndex + 1}
                  pageSize={state.pageSize}
                  locale={locale}
                  className="d-flex pt-3 py-3 story-page-centering "
                  total={state.totalCount}
                />
              </div>
            </div>
            <div className="py-4">
              <div>
                <div>
                  {currentUser.isLoggedIn && (
                    <Link to="/sharestories/add">
                      <Button
                        variant="primary"
                        type="button"
                        className="d-flex mx-auto"
                      >
                        Add Your Success Story!
                      </Button>
                    </Link>
                  )}
                  <div className="py-3">
                    <Link to="/">
                      <Button
                        variant="secondary"
                        type="button"
                        className="d-flex mx-auto"
                      >
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
ShareStories.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    organizationId: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

ShareStories.propTypes = {
  currentUser: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
  }),
};

export default ShareStories;

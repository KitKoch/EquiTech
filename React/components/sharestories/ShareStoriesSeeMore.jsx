import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./sharestories.css";

import DOMPurify from "dompurify";
import { useLocation } from "react-router-dom";
function ShareStoriesSeeMore() {
  const _logger = debug.extend("see more story-id");

  const { state } = useLocation();
  const [aStory, setStory] = useState({
    name: "",
    email: "",
    yourStory: "",
    imageUrl: "",
  });
  _logger(state);

  useEffect(() => {
    if (state?.type === "STORY_FULL" && state?.payload) {
      setStory(state.payload);
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Row className="border-bottom mt-3">
          <Col>
            <div className="d-flex py-3">
              <div>
                <img
                  className="story-avatar w-auto mh-200 col-6 col-sm-auto story-avatar-control img-thumbnail rounded-circle"
                  src={aStory?.author?.avatarUrl}
                />
              </div>
              <div className="ms-5 d-flex flex-column story-width justify-content-center">
                <h3 className="bs-primary text-primary fs-1">{aStory?.name}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(aStory?.story),
                  }}
                  className="editor"
                ></div>
                <div>
                  <img
                    className="w-auto d-flex my-3 mx-auto mh-200 col-6 col-sm-auto "
                    src={aStory?.primaryImageUrl}
                  />
                </div>
                <Row>
                  <div className="col">
                    {" "}
                    <div>
                      Author:
                      {` ${aStory?.author?.firstName} ${aStory?.author?.lastName}`}
                      <p className="me-auto">
                        Date Posted: {aStory?.dateCreated?.substring(0, 10)}
                      </p>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
        <div className="pt-4 pb-6">
          <Link to="/sharestories">
            <Button className="btn btn-secondary d-flex mx-auto" type="button">
              Back to Success Stories
            </Button>
          </Link>
        </div>
      </Container>
    </React.Fragment>
  );
}

ShareStoriesSeeMore.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    organizationId: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
export default ShareStoriesSeeMore;

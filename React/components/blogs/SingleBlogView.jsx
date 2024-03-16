import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./blogs.css";
import DOMPurify from "dompurify";

function SingleBlogView() {
  const _logger = debug.extend("singleBlogCard");
  const { state } = useLocation();
  const [aBlog, setBlog] = useState({});
  _logger("blog");

  useEffect(() => {
    if (state?.type === "BLOGS_SINGLE") {
      _logger("State in blogsCard", state);
      setBlog(state.payload);
    }
  }, []);

  const navigate = useNavigate();
  const onClickReturnToBlogsPage = () => navigate(`/blogs`);

  return (
    <React.Fragment>
      <div className="content">
        <div className="p-0 container">
          <Card className="mx-auto">
            <Card.Img width="75%" src={aBlog?.imageUrl} alt="Card image" />
            <h1 className="blog-title">{aBlog?.title}</h1>
            <Card.Body>
              <Card.Text>
                <h6 className="fst-italic">
                  Author: {aBlog?.author?.firstName} {aBlog?.author?.lastName}
                  <img
                    className="blog-avatar-img"
                    src={aBlog?.author?.avatarUrl}
                    alt="avatarUrl"
                  />
                  <p className="blog-date-created">
                    Date Created: {aBlog?.dateCreated?.substring(0, 10)}
                  </p>
                </h6>
                <h6 className="fst-italic">Subject: {aBlog?.subject}</h6>
                <p
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(aBlog?.content),
                  }}
                />
              </Card.Text>
              <Button
                variant="primary"
                className="return-to-blogs-btn"
                onClick={onClickReturnToBlogsPage}
              >
                Return to Blogs
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );

  BlogCard.propTypes = {
    blog: PropTypes.shape({
      id: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      dateCreated: PropTypes.number.isRequired,
    }).isRequired,
  };
}

export default SingleBlogView;

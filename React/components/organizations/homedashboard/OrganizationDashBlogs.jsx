import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Button, Card } from "react-bootstrap";
import blogService from "../../../services/blogService";
import DOMPurify from "dompurify";
import toastr from "toastr";
import PropTypes from "prop-types";

const _logger = logger.extend("OrganizationDashBlogs");

function OrganizationDashBlogs({ checkDate }) {
  const [blogContents, setBlogContents] = useState({
    pageIndex: 0,
    pageSize: 2,
    arrayOfBlogs: [],
    blogComponents: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    blogService
      .getBlogsByLatestDate(blogContents.pageIndex, blogContents.pageSize)
      .then(onGetBlogsByLatestDateSuccess)
      .catch(onGetBlogsByLatestDateError);
  }, []);

  const onGetBlogsByLatestDateSuccess = (response) => {
    _logger("Get Blogs By Latest Date Success", response);
    const acquiredBlogs = response.item.pagedItems;
    setBlogContents((prevBlogContents) => {
      const newBlogContents = { ...prevBlogContents };
      newBlogContents.arrayOfBlogs = acquiredBlogs;
      newBlogContents.blogComponents = acquiredBlogs.map(mapBlogs);
      return newBlogContents;
    });
    toastr.success("Latest Blogs Loaded");
  };

  const onGetBlogsByLatestDateError = (error) => {
    _logger("Get Blogs By Latest Date Error", error);
    toastr.error("Unable to Get Latest Blogs");
  };

  const mapBlogs = (aBlog) => {
    const payload = { state: { type: "BLOGS_SINGLE", payload: aBlog } };
    const navigateToBlog = () => {
      navigate(`/blogs/${aBlog.id}`, payload);
    };
    return (
      <React.Fragment key={aBlog.id}>
        <div className="d-flex">
          <img
            src={aBlog.author.avatarUrl}
            width="56"
            height="56"
            className="rounded-circle me-3"
            alt="Carl Jenkins"
          />
          <div className="flex-grow-1 ms-3">
            <small className="float-end text-navy">
              {checkDate(aBlog.dateModified)}
            </small>
            <h3 className="mb-2">
              <strong>{aBlog.blogType.name}</strong>
            </h3>
            <p>{aBlog.title}</p>

            <Row>
              <Col xs={6}>
                <img
                  src={aBlog.imageUrl}
                  className="img-fluid"
                  alt="Unsplash"
                />
              </Col>
            </Row>

            <br />
            <Card.Text
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  aBlog.content.substring(0, 10) + "..."
                ),
              }}
            />
            <Button
              size="sm"
              variant="danger"
              className="mb-3"
              type="button"
              onClick={navigateToBlog}
            >
              Read More
            </Button>
          </div>
        </div>

        <hr />
      </React.Fragment>
    );
  };

  return (
    <Card className="flex-fill">
      <Card.Header>
        <div className="card-actions float-end">
          <Button type="button">
            <Link to="/blogs" className="text-white">
              View All Blogs
            </Link>
          </Button>
        </div>
        <Card.Title>Latest Blogs</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>{blogContents.blogComponents}</Row>
      </Card.Body>
    </Card>
  );
}

OrganizationDashBlogs.propTypes = {
  checkDate: PropTypes.func.isRequired,
};

export default OrganizationDashBlogs;

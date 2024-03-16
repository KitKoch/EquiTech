import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./landing.css";

function BlogLandingCard(props) {
  const blog = props.blog;

  const navigate = useNavigate();
  const onClickViewFullBlog = () => {
    let path = `/blogs/${blog.id}`;
    let currentBlog = blog;
    navigate(path, { state: { type: "BLOGS_SINGLE", payload: currentBlog } });
  };

  return (
    <Card onClick={onClickViewFullBlog} className="mx-1">
      <Card.Img
        src={blog.imageUrl}
        alt="Blog image"
        variant="top"
        className="landing-blog-img"
      />
      <Card.Header>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text className="fst-italic">
          Author: {blog.author.firstName} {blog.author.lastName}
        </Card.Text>
      </Card.Header>
    </Card>
  );
}

BlogLandingCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default BlogLandingCard;

import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./blogs.css";
import DOMPurify from "dompurify";

function BlogCard(props) { 
  const aBlog = props.blogCard;

  const navigate = useNavigate();
  const onClickViewFullBlog = () => {
    let path = `${aBlog.id}`;
    let currentBlog = aBlog;
    navigate(path, { state: { type: "BLOGS_SINGLE", payload: currentBlog } });
  };

  return (
    <React.Fragment>
      <Card className="mx-2 shadow">
        <Card.Img className="blog-img" src={aBlog.imageUrl} alt="Blog image" />
        <Card.Header>
          <Card.Title>{aBlog.title}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className="fst-italic">
            Author: {aBlog.author.firstName} {aBlog.author.lastName}
          </Card.Text>
          <Card.Text className="fst-italic">
            Date Published: {aBlog.datePublished.substring(0, 10)}
          </Card.Text>
          <Card.Text className="fst-italic">Subject:{aBlog.subject}</Card.Text>
          <Card.Text
            className="fst-italic"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                aBlog.content.substring(0, 60) + "..."
              ),
            }}
          />

          <Button
            variant="primary"
            type="button"
            className="btn-pill text-white me-2"
            onClick={onClickViewFullBlog}
          >
            Read More
          </Button>
        </Card.Body>
      </Card>
    </React.Fragment>
  );

  BlogCard.propTypes = {
    blogCard: PropTypes.shape({
      id: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      datePublished: PropTypes.string.isRequired,
    }).isRequired,
  };
}

export default BlogCard;

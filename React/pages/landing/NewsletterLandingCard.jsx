import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NewsletterLandingCard(props) {
  const newsletter = props.newsletter;

  const navigate = useNavigate();
  const onClickViewNewsletters = () => {
    let path = `/newsletters`;
    navigate(path);
  };

  return (
    <React.Fragment>
      <Card onClick={onClickViewNewsletters} className="mx-2">
        <Card.Img src={newsletter.coverPhoto} />
        <Card.Header>
          <Card.Title>{newsletter.name}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className="fst-italic">{newsletter.description}</Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );

  NewsletterLandingCard.propTypes = {
    newsletter: PropTypes.shape({
      id: PropTypes.number.isRequired,
      coverPhoto: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  };
}

export default NewsletterLandingCard;

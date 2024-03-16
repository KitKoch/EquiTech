import React from "react";
import { Card } from "react-bootstrap";
import orgDefaultImage from "../../assets/img/photos/unsplash-1.jpg";
import PropTypes from "prop-types";

const _loggerPage = logger.extend("ORG");

export default function OrgFormToolCard(props) {
  const input = props.input;
  _loggerPage(props, "here are props on card");
  return (
    <Card>
      <Card.Img
        width="100%"
        src={input.logo ? input.logo : orgDefaultImage}
        alt="Card image cap"
      />
      <Card.Body>
        <Card.Title className="mb-4">
          {input.name ? input.name : "Name"}{" "}
        </Card.Title>
        <p>{input.headline ? input.headline : "Headline"}</p>
        <p>{input.description ? input.description : "Description"}</p>
        <p>
          {input.organizationTypeName
            ? input.organizationTypeName
            : "Organization Type"}
        </p>
        <p>{input.phone ? input.phone : "Phone"}</p>
        <p>{input.siteUrl ? input.siteUrl : "Site Url"}</p>
      </Card.Body>
    </Card>
  );
}
OrgFormToolCard.propTypes = {
  input: PropTypes.shape({
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    siteUrl: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    organizationTypeId: PropTypes.string.isRequired,
    organizationTypeName: PropTypes.string.isRequired,
  }).isRequired,
  organizationTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

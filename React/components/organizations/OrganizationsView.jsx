import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Row,
  Col,
  Breadcrumb,
  Button,
  Tab,
  Nav,
} from "react-bootstrap";
import "./OrganizationStyles.css";
import { Helmet } from "react-helmet-async";

const _loggerPage = debug.extend("ORG");

function OrganizationsView() {
  const location = useLocation();

  _loggerPage("location :", location);

  let orgObj = location.state;

  const navigate = useNavigate();

  function BreadCrumbElement() {
    return (
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item onClick={() => navigate("/admin/organizations")}>
          Organizations Admin Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{orgObj.name}</Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  function CompanyNameCard() {
    return (
      <Card>
        <Card.Body>
          <Row>
            {/* <Col sm={3}> */}
            <img
              src={orgObj.logo}
              className="company-name-card-image-size me-5"
              alt={orgObj.name}
            />
            {/* </Col> */}
            <Col>
              <p>
                <Card.Title className="mb-0">{orgObj.name}</Card.Title>
              </p>
              <strong>
                {orgObj.location[0].city}, {orgObj.location[0].state.name}
              </strong>
              <p>{orgObj.description}</p>
              <Button href="#" variant="primary">
                Visit Website
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

  const TabsWithTextLabel = () => (
    <div className={"tab"}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="first">About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Jobs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">People</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="fourth">Posts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <h4 className="tab-title">Overview</h4>
            <p>{orgObj.description}</p>
            <p>
              <strong>Headline</strong>
              <p>{orgObj.headline}</p>
            </p>
            <p>
              <strong>Phone</strong>
              <p>{orgObj.phone}</p>
            </p>
            <p>
              <strong>Website</strong>
              <p>{orgObj.siteUrl}</p>
            </p>
            <p>
              <strong>Location</strong>

              <p>{orgObj.location[0].lineOne}</p>
              <p>{orgObj.location[0].lineTwo}</p>
              <p>
                {orgObj.location[0].city}, {orgObj.location[0].state.name}
              </p>
              <p>{orgObj.location[0].zip}</p>
            </p>
            <p>
              <strong>Organization Type</strong>
              <p>{orgObj.organizationType[0].name}</p>
            </p>
            <p>
              <strong>Validation Status</strong>
              <p>{orgObj.isValidated ? "Validated" : "Not Validated"}</p>
            </p>
            <p>
              <strong>Date Created</strong>
              <p>{orgObj.dateCreated.substring(0, 10)}</p>
            </p>
            <p>
              <strong>Date Modified</strong>
              <p>{orgObj.dateModified.substring(0, 10)}</p>
            </p>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <h4 className="tab-title">Jobs</h4>
            <p>Job posts</p>
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            <h4 className="tab-title">People</h4>
            <p>Affiliated users</p>
          </Tab.Pane>
          <Tab.Pane eventKey="fourth">
            <h4 className="tab-title">Posts</h4>
            <p>Recent activity</p>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );

  return (
    <React.Fragment>
      <Helmet title="Organization Informaton" />
      <Row>
        <Col>
          <BreadCrumbElement />
        </Col>
      </Row>
      <Container fluid className="p-0">
        <Row className="align-items-start">
          <Col sm={8} className="mx-auto">
            <CompanyNameCard />
          </Col>
        </Row>
        <Row>
          <Col sm={8} className="mx-auto">
            <TabsWithTextLabel />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default OrganizationsView;

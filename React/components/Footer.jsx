import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

const Footer = () => (
  <div>
    <footer className="footer">
      <Container fluid>
        <Row className="text-muted">
          <Col xs="8" className="text-start">
            <ul className="list-inline">
              <li className="list-inline-item">
                <Nav.Link href="/aboutus" rel="noreferrer" active>
                  <span className="text-muted navpub-m ms-3">About Us</span>
                </Nav.Link>
              </li>
              <li className="list-inline-item">
                <Nav.Link href="/privacypolicy" rel="noreferrer" active>
                  <span className="text-muted navpub-m ms-3">Privacy</span>
                </Nav.Link>
              </li>
              <li className="list-inline-item">
                <Nav.Link href="/cookiespolicy" rel="noreferrer" active>
                  <span className="text-muted navpub-m ms-3">
                    Cookie Policy
                  </span>
                </Nav.Link>
              </li>
              <li className="list-inline-item">
                <Nav.Link href="/contactus" rel="noreferrer" active>
                  <span className="text-muted navpub-m ms-3">Contact Us</span>
                </Nav.Link>
              </li>
              <li className="list-inline-item">
                <Nav.Link href="/faqs" rel="noreferrer" active>
                  <span className="text-muted navpub-m ms-3">FAQ</span>
                </Nav.Link>
              </li>
              <li className="list-inline-item">
                <Nav.Link href="/newsletters/subscribe" rel="noreferrer" active>
                  <span className="text-muted navpub-m ms-3">Newsletter</span>
                </Nav.Link>
              </li>
              <li className="list-inline-item">
                <Nav.Link href="/podcasts" rel="noreferrer" active>
                  <span className="text-muted navpub-m ms-3">Podcasts</span>
                </Nav.Link>
              </li>
              <li className="list-inline-item">
                <Nav.Link href="/sharestories" active>
                  <span className="text-muted ms-3">Success Stories</span>
                </Nav.Link>
              </li>

              <li className="list-inline-item">
                <Nav.Link href="/forums" active>
                  <span className="text-muted">Forums</span>
                </Nav.Link>
              </li>
            </ul>
          </Col>
          <Col xs="4" className="text-end">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} -{" "}
              <span href="/" className="text-muted">
                Fairly
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  </div>
);

export default Footer;

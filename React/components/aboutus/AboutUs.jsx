import React from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import "./aboutus.css";
function AboutUs() {
  const _logger = debug.extend("about us");
  _logger("about us");

  return (
    <React.Fragment>
      <div className="aboutUs-centerHead">
        <h1 className="aboutUs-titleBig">What is Fairly?</h1>
      </div>
      <div className="aboutUs-centerInfo">
        <p className="aboutUs-infoMiddle">
          EquiTech is an SaaS platform, enabling talent acquisition teams to
          quickly find the best talent for their company while saving time on
          recruiting & hiring. SaaS is a method of software delivery and
          licensing that is used online, we offer our services in the
          convinience of a mobile app or website!
        </p>
      </div>
      <div className="aboutUs-centerMotto">
        <p>FIND, HIRE & PAY THE BEST TALENT</p>
      </div>
      <div className="aboutUs-titleBig">
        <h5 className="aboutUs-titleBig">Meet Our Founders</h5>
      </div>
      <Container className="aboutUs-center pb-6">
        <Row>
          <Col className="aboutUs-center" md={25}>
            <Card className="aboutUs-cardContainer">
              <div className="aboutUs-cardCenter">
                <Card.Img
                  className="img-thumbnail rounded-circle"
                  src={robFounder}
                  alt="Founder image"
                />
              </div>
              <Card.Body>
                <Card.Text>
                  <h1 className="">
                    <p className="aboutUs-cardCenter">Rob Patrick</p>
                  </h1>
                  <h3 className="aboutUs-cardCenter">
                    Technology Entrepreneur
                  </h3>
                  <p className="aboutUs-cardTextCenter">
                    Rob once rap battled Eminem, he could have won but.. Rob
                    went to Cranbrook, that&apos;s a private school.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="aboutUs-center" md={25}>
            <Card className="aboutUs-cardContainer">
              <div className="aboutUs-cardCenter">
                <Card.Img
                  className="img-thumbnail rounded-circle"
                  src={deidraFounder}
                  alt="Founder image"
                />
              </div>
              <Card.Body>
                <Card.Text>
                  <h1 className="">
                    <p className="aboutUs-cardCenter">Deidra Willis</p>
                  </h1>
                  <h3 className="aboutUs-cardCenter">Project Management</h3>
                  <p className="aboutUs-cardTextCenter">
                    Deidra grew up in the Meta. She has started over nine
                    million fortune 500 companies. (virtually)
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="aboutUs-center" md={25}>
            <Card className="aboutUs-cardContainer">
              <div className="aboutUs-cardCenter">
                <Card.Img
                  className="img-thumbnail rounded-circle"
                  src={tylerFounder}
                  alt="Founder image"
                />
              </div>
              <Card.Body>
                <Card.Text>
                  <h1 className="">
                    <p className="aboutUs-cardCenter">Tyler Rasmussen </p>
                  </h1>
                  <h3 className="aboutUs-cardCenter">Head of Finance</h3>

                  <p className="aboutUs-cardTextCenter">
                    Tyler Rasmussen learned finance from the Wolf of Wall
                    Street.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="aboutUs-center" md={25}>
            <Card className="aboutUs-cardContainer">
              <div className="aboutUs-cardCenter">
                <Card.Img
                  className="img-thumbnail rounded-circle"
                  src={jonnyFounder}
                  alt="Founder image"
                />
              </div>
              <Card.Body>
                <Card.Text>
                  <h1 className="">
                    <p className="aboutUs-cardCenter">Jonny Elliott</p>
                  </h1>
                  <h3 className="aboutUs-cardCenter">
                    Machine Learning/AI Leader
                  </h3>

                  <p className="aboutUs-cardTextCenter">
                    Jonny single handedly reconstructed a fully functional
                    RoboCop for his private security business at the age of six.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className="aboutUs-center" md={25}>
            <Card className="aboutUs-cardContainer">
              <div className="aboutUs-cardCenter">
                <Card.Img
                  className="img-thumbnail rounded-circle"
                  src={isabelleFounder}
                  alt="Founder image"
                />
              </div>
              <Card.Body>
                <Card.Text>
                  <h1 className="">
                    <p className="aboutUs-cardCenter">Isabelle Koverda</p>
                  </h1>
                  <h3 className="aboutUs-cardCenter">Marketing Strategist</h3>

                  <p className="aboutUs-cardTextCenter">
                    Isabelle is a professor at MIT, where she has taught the
                    marketing strategists for Deidra&apos;s fortune 500
                    companies.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AboutUs;

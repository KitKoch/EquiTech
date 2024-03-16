import React from "react";
import logo from "../../assets/img/FairlyFindHirePay.png";
import { Container, Row } from "react-bootstrap";

function JobsPage() {
  return (
    <React.Fragment>
      <Container>
        <Row className="justify-content-center">
          <h1 className="text-primary d-flex justify-content-center">
            Welcome Hiring Administrator
          </h1>
          <br />
          <br />
          <br />
          <div className="container d-flex justify-content-center">
            <img className="center-fit" src={logo} alt="Fairly Logo" />
          </div>
        </Row>
      </Container>
    </React.Fragment>
  );
}
export default JobsPage;

import React from "react";
import { withFormik } from "formik";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const _logger = debug.extend("location");

const FinalPage = (props) => {
  const { resume, onBack, onFinish, backLabel, isSubmitting, types } = props;

  const filterNames = (value) => {
    let industry = {};
    let industryName = "";
    if (parseInt(value) !== 0) {
      industry = types.industries[value - 1];
      industryName = industry.name;
    }
    return industryName;
  };

  const filterNamesExp = (value) => {
    let experience = {};
    let experienceName = "";
    if (parseInt(value) !== 0) {
      experience = types.experienceLevels[value - 1];
      experienceName = experience.name;
    }
    return experienceName;
  };

  function filterById(aLocation) {
    let result = false;
    _logger("resumeLocations", resume.locations);
    if (parseInt(aLocation.id) === parseInt(resume.locations)) {
      result = true;
    }
    return result;
  }

  const filterNamesLoc = (value) => {
    let location = [];
    let locationFiltered = {};
    let locationName = "";
    if (parseInt(value) !== 0) {
      location = types.locations;
      locationFiltered = location.filter(filterById);
      locationName =
        locationFiltered[0].name + ", " + locationFiltered[0].lineOne;
    }
    return locationName;
  };

  const mapSkillName = (skill) => {
    const skillName = skill.label;
    return `${skillName} `;
  };

  return (
    <Container>
      <Row className="justify-content-center g-0 min-vh-100">
        <Col lg={8} md={8} className="py-8 py-xl-0">
          <Card>
            <Card.Header>
              <h1 className="text-primary">Review</h1>
            </Card.Header>
            <Card.Body>
              <Col>
                <strong>Minimum Pay: </strong> ${resume?.minimumPay}
              </Col>
              <Col>
                <strong>Desired Pay: </strong> ${resume?.desiredPay}
              </Col>
              <Col>
                <strong>Is this rate Hourly?: </strong>
                {resume?.isHourly ? "Yes" : "No"}
              </Col>
              <Col>
                <strong>Skills: </strong> {resume.skills.map(mapSkillName)}
              </Col>
              <Col>
                <strong>Experience Level: </strong>
                {filterNamesExp(resume.experienceLevels)}
              </Col>
              <Col>
                <strong>Years: </strong> {resume?.years}
              </Col>
              <Col>
                <strong>Months: </strong> {resume?.months}
              </Col>
              <Col>
                <strong>Company Name: </strong> {resume?.companyName}
              </Col>
              <Col>
                <strong>Contact Reference: </strong> {resume?.contactReference}
              </Col>
              <Col>
                <strong>Contact Email: </strong> {resume?.companyEmail}
              </Col>
              <Col>
                <strong>Contact Phone: </strong> {resume?.companyPhone}
              </Col>
              <Col>
                <strong>Locations: </strong> {filterNamesLoc(resume?.locations)}
              </Col>
              <Col>
                <strong>Industries: </strong> {filterNames(resume.industries)}
              </Col>
              <Col>
                <strong>Start Date: </strong> {resume?.startDate.toDateString()}
              </Col>
              <Col>
                <strong>End Date: </strong> {resume?.endDate.toDateString()}
              </Col>

              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Button
                  type="btn"
                  className="btn m-1"
                  onClick={onBack}
                  disabled={isSubmitting}
                >
                  {backLabel}
                </Button>
                <Button
                  type="submit"
                  className="btn btn-secondary m-1"
                  onClick={onFinish}
                >
                  Submit
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

FinalPage.propTypes = {
  types: PropTypes.shape({
    industries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    experienceLevels: PropTypes.arrayOf(
      PropTypes.shape({
        col3: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
      })
    ),
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        lineOne: PropTypes.string,
        zip: PropTypes.string,
        id: PropTypes.number,
      })
    ),
  }).isRequired,
  resume: PropTypes.shape({
    minimumPay: PropTypes.number,
    desiredPay: PropTypes.number,
    isHourly: PropTypes.bool,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number,
        label: PropTypes.string,
      })
    ),
    experienceLevels: PropTypes.string,
    years: PropTypes.number,
    months: PropTypes.number,
    companyName: PropTypes.string,
    contactReference: PropTypes.string,
    companyEmail: PropTypes.string,
    companyPhone: PropTypes.string,
    locations: PropTypes.string,
    industries: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  backLabel: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  onFinish: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValue: (props) => ({
    minimumPay: props.resume.minimumPay,
    desiredPay: props.resume.desiredPay,
    isHourly: props.resume.isHourly,
    skills: props.resume.skills,
    experienceLevels: props.resume.experienceLevels,
    years: props.resume.years,
    months: props.resume.months,
    companyName: props.resume.companyName,
    contactReference: props.resume.contactReference,
    companyEmail: props.resume.companyEmail,
    companyPhone: props.resume.companyPhone,
    locations: props.resume.locations,
    industries: props.resume.industries,
    startDate: props.resume.startDate,
    endDate: props.resume.endDate,
  }),

  handleSubmit: (values, { props }) => {
    props.onNext(values);
    props.onFinish(values);
  },
})(FinalPage);

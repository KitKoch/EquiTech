import React from "react";
import { withFormik, Field, Form as FormikForm } from "formik";
import PropTypes from "prop-types";
import {
  Container,
  InputGroup,
  Form,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import wizardPaySchema from "../../../schemas/wizardPaySchema";

const WizardPayForm = (props) => {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    nextLabel,
    touched,
  } = props;

  return (
    <Container>
      <Row className="justify-content-center g-0 min-vh-100">
        <Col lg={8} md={8} className="py-8 py-xl-0">
          <Card>
            <Card.Header>
              <h1 className="ms-3 text-primary">Pay Preferences</h1>
            </Card.Header>
            <Card.Body>
              <FormikForm onSubmit={handleSubmit} className="p-1">
                <Form.Label htmlFor="minimumPay">Minimum Pay</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Field
                    type="number"
                    className={`form-control ${
                      errors.minimumPay && touched.minimumPay && "is-invalid"
                    }`}
                    name="minimumPay"
                    id="minimumPay"
                    value={parseInt(values.minimumPay)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                {errors.minimumPay && touched.minimumPay && (
                  <div className="invalid-input">
                    {"Minimum Pay must be greater than 0"}
                  </div>
                )}
                <Form.Label htmlFor="desiredPay">Desired Pay</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>$</InputGroup.Text>
                  <Field
                    type="number"
                    className={`form-control ${
                      errors.desiredPay && touched.desiredPay && "is-invalid"
                    }`}
                    name="desiredPay"
                    id="desiredPay"
                    value={parseInt(values.desiredPay)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
                {errors.desiredPay && touched.desiredPay && (
                  <div className="invalid-input">
                    {"Desired Pay must be greater than 0"}
                  </div>
                )}
                <Form.Group className="mb-2">
                  <InputGroup>
                    <Field
                      type="checkbox"
                      className="form-check m-1"
                      name="isHourly"
                      id="isHourly"
                    />
                    <div className="m-1">Is this rate hourly?</div>
                  </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <Button
                    type="submit"
                    className="med-md-2 mb-3"
                    disabled={isSubmitting}
                  >
                    {nextLabel}
                  </Button>
                </div>
              </FormikForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

WizardPayForm.propTypes = {
  resume: PropTypes.shape({
    minimumPay: PropTypes.number,
    desiredPay: PropTypes.number,
    isHourly: PropTypes.bool,
  }).isRequired,
  values: PropTypes.shape({
    minimumPay: PropTypes.number,
    desiredPay: PropTypes.number,
    isHourly: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    minimumPay: PropTypes.string,
    desiredPay: PropTypes.string,
    isHourly: PropTypes.string,
  }),
  touched: PropTypes.shape({
    minimumPay: PropTypes.bool,
    desiredPay: PropTypes.bool,
    isHourly: PropTypes.bool,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  onNext: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withFormik({
  mapPropsToValues: (props) => ({
    minimumPay: props.resume.minimumPay,
    desiredPay: props.resume.desiredPay,
    isHourly: props.resume.isHourly,
  }),

  handleSubmit: (values, { props }) => {
    props.onNext(values);
  },
  validationSchema: wizardPaySchema,
})(WizardPayForm);

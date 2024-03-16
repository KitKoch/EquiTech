import React, { useState } from "react";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { Form, Formik, Field, ErrorMessage } from "formik";
// import { getTypes } from "../../services/lookUpService";
import * as Yup from "yup";

function ThreadForm(props) {
  const threadFormSchema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    forumCategoryId: Yup.number().required(),
    isPrivate: Yup.bool().required(),
  });

  const _logger = debug.extend("Forums Form");
  const [formData] = useState({
    name: "",
    description: "",
    forumCategoryId: "",
    isPrivate: true,
    IsClosed: false,
    toDelete: false,
    id: 0,
  });
  _logger("THREAD form", props);

  const onSubmit = (values, { resetForm }) => {
    _logger("Submit Button", values);
    resetForm();
  };
  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
        <Col lg={5} md={8} xs={6} className="mt-4">
          <Card>
            <Card.Title>
              <h2 className="text-primary text-center mt-4 mb-auto">
                {formData.id ? "Update Thread" : "Be the First to add a Thread"}
              </h2>
            </Card.Title>
            <Card.Body>
              <Formik
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={onSubmit}
                validationSchema={threadFormSchema}
              >
                <Form>
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="text-dark">
                      Thread Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      autoFocus={true}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="description" className="text-dark">
                      Description
                    </label>
                    <Field
                      type="textarea"
                      as="textarea"
                      name="description"
                      id="description"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="has-error"
                    />
                  </div>

                  <div className="row">
                    <div className="col">
                      <Button type="button" className="btn btn-primary mb-2">
                        {formData.id ? "Update" : "Submit"}
                      </Button>
                    </div>
                    <div className="col">
                      <Button
                        type="reset"
                        className="btn btn-outline btn-warning"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ThreadForm;

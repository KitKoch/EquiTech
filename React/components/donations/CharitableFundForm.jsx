import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form as FormikForm } from "formik";
import { Button, Card, Col, Row, Container, Form } from "react-bootstrap";
import charitableFundFormSchema from "../../schemas/charitableFundFormSchema";
import charitableFundService from "../../services/charitableFundService";
import Swal from "sweetalert2";
import { useEffect } from "react";

function CharitableFundForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const defaultValues = {
    id: "",
    name: "",
    description: "",
    url: "",
  };

  const [pageData, setPageData] = useState({
    initialValues: defaultValues,
    isUpdate: false,
  });

  useEffect(() => {
    if (state?.type === "CHARITABLEFUND_UPDATE") {
      setPageData((prevState) => {
        let update = { ...prevState };
        update.initialValues.id = state.payload.id;
        update.initialValues.name = state.payload.name;
        update.initialValues.description = state.payload.description;
        update.initialValues.url = state.payload.url;
        update.isUpdate = true;
        return update;
      });
    }
  }, []);

  const onSubmit = (values) => {
    if (!pageData.isUpdate) {
      charitableFundService
        .createCharitableFund(values)
        .then(onCreateSuccess)
        .catch(onCreateError);
    } else {
      charitableFundService
        .updateCharitableFund(values)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    }
  };

  const onCreateSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "You have successfully created a Charitable Fund",
    }).then(navigate("/donation/charitablefund/list"));
  };

  const onCreateError = () => {
    Swal.fire({
      icon: "error",
      title: "There was an error, Please check input fields and Try again",
    });
  };

  const onUpdateSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "You have successfully updated a Charitable Fund",
    }).then(navigate("/donation/charitablefund/list"));
  };

  const onUpdateError = () => {
    Swal.fire({
      icon: "error",
      title: "There was an error, Please check input fields and Try again",
    });
  };

  const onClearClicked = () => {
    setPageData((prevState) => {
      let update = { ...prevState };
      update.initialValues = defaultValues;
      update.isUpdate = false;
      return update;
    });
  };

  return (
    <Container className="mt-3">
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={8} md={8} className="py-8 py-xl-0">
          <Card>
            <Card.Header>
              <Card.Title>
                <h1 className="text-primary">
                  {pageData.isUpdate
                    ? "Update Charitable Fund"
                    : "Create Charitable Fund"}
                </h1>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Formik
                validationSchema={charitableFundFormSchema.charitableFund}
                onSubmit={onSubmit}
                initialValues={pageData.initialValues}
                enableReinitialize={true}
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  touched,
                  errors,
                }) => (
                  <FormikForm noValidate onSubmit={handleSubmit}>
                    <Row>
                      <Form.Group
                        as={Col}
                        md={12}
                        controlId="firstName"
                        className="mb-3"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Name"
                          isValid={touched.name && !errors.name}
                          isInvalid={touched.name && errors.name}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md={12}
                        controlId="mi"
                        className="mb-3"
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          type="text"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Description"
                          isValid={
                            touched.description &&
                            values.description &&
                            !errors.description
                          }
                          isInvalid={touched.description && errors.description}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.description}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md={12}
                        controlId="lastName"
                        className="mb-3"
                      >
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                          type="text"
                          name="url"
                          value={values.url}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Website Url"
                          isValid={touched.url && !errors.url}
                          isInvalid={touched.url && errors.url}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.url}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Button type="submit">
                      {pageData.isUpdate ? "Update" : "Create"}
                    </Button>
                    <Button
                      type="button"
                      onClick={onClearClicked}
                      variant="danger"
                      className="m-2"
                    >
                      Clear
                    </Button>
                    <Link className="p-2" to="/donation/charitablefund/list">
                      {"View All Charitable Funds"}
                    </Link>
                  </FormikForm>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default CharitableFundForm;

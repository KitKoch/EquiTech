import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import forumsFormSchema from "../../schemas/forumsFormSchema";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { getTypes } from "../../services/lookUpService";

function ForumsForm() {
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

  const [category, setCategory] = useState({
    categories: [],
    categoriesSelect: [],
  });

  useEffect(() => {
    _logger("useEffect for Forums");
    getTypes(["Forum_Categories"])
      .then(getForumCategoriesSuccess)
      .catch(getError);
  }, []);

  const getForumCategoriesSuccess = (res) => {
    let resCategories = res.item.forum_Categories;
    setCategory((prevState) => {
      let pd = { ...prevState };
      pd.categories = resCategories;
      pd.categoriesSelect = resCategories.map(mapCategories);
      return pd;
    });
  };

  const getError = (err) => {
    _logger("ERROR", err);
  };
  const mapCategories = (aCategory) => {
    return (
      <option value={aCategory.id} key={"aCategory" + aCategory.id}>
        {aCategory.name}
      </option>
    );
  };

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
                {formData.id ? "Update Forum" : "Add New Forum"}
              </h2>
            </Card.Title>
            <Card.Body>
              <Formik
                enableReinitialize={true}
                initialValues={formData}
                onSubmit={onSubmit}
                validationSchema={forumsFormSchema}
              >
                <Form>
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="text-dark">
                      Forum Name
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
                  <div className="form-group mb-3">
                    <label htmlFor="industryId" className="text-dark">
                      Forum Category
                    </label>
                    <Field
                      as="select"
                      name="forumCategoryId"
                      id="forumCategoryId"
                      className="form-select"
                    >
                      <option value="">Choose a Forum Category</option>
                      {category.categoriesSelect}
                    </Field>
                    <ErrorMessage
                      name="forumCategoryId"
                      component="div"
                      className="has-error"
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <Button type="submit" className="btn btn-primary mb-2">
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

export default ForumsForm;

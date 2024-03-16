import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Card, FormLabel, Button, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import newsletterTemplateService from "../../services/newsletterTemplateService";
import * as lookUpService from "../../services/lookUpService";
import newsletterService from "../../services/newsletterService";
import NewslettersValidationSchema from "../../schemas/newslettersFormSchema";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import toastr from "toastr";
import Swal from "sweetalert2";
import "./newsletters.css";

const _logger = debug.extend("Newsletters");
const initialValues = {
  templateId: "0",
  categoryId: "",
  description: "",
  name: "",
  coverPhoto: "",
  isSubscribed: true,
  dateToPublish: "",
  dateToExpire: "",
  contents: [],
  pageIndex: 0,
  pageSize: 8,
};

function AddNewsletterForm() {
  const [templates, setTemplates] = useState({
    arrayOfTemplates: [],
    templatesComponentArray: [],
  });
  const [categoryOptions, setCategoryOptions] = useState({
    arrayOfCategories: [],
    categoriesComponentArray: [],
  });

  useEffect(() => {
    newsletterTemplateService
      .getAll(initialValues.pageIndex, initialValues.pageSize)
      .then(onGetTemplatesSuccess)
      .catch(onGetTemplatesError);

    lookUpService
      .getTypes(["NewsletterCategories"])
      .then(getTypeSuccess)
      .catch(getCategoryError);
  }, [initialValues.pageIndex]);

  const onGetTemplatesSuccess = (response) => {
    const responseArray = response.item.pagedItems;
    toastr.success("We have Templates!");
    setTemplates((prevState) => {
      let newTemplateData = { ...prevState };
      newTemplateData.arrayOfTemplates = responseArray;
      newTemplateData.templatesComponentArray = responseArray.map(mapTemplates);
      return newTemplateData;
    });
  };

  const onAddNewsletterSuccess = ({ resetForm }) => {
    toastr.success("Hurray! You created a Newsletter");
    resetForm();
  };

  const onGetTemplatesError = () => {
    toastr.error("NO TEMPLATES FOR YOU! >:(");
  };
  const onAddNewsletterError = () => {
    toastr.error("Something went wrong. Please, try again in a few minutes");
  };

  const getTypeSuccess = (response) => {
    const responseArray = response.item.newsletterCategories;
    toastr.success("We have Categories!");
    setCategoryOptions((prevState) => {
      let newCategoryData = { ...prevState };
      newCategoryData.arrayOfCategories = responseArray;
      newCategoryData.categoriesComponentArray = responseArray.map(mapType);
      return newCategoryData;
    });
  };

  const getCategoryError = (err) => {
    _logger("getCategory not working", err);
    Swal.fire({
      icon: "error",
      title: "Could not get newsletter Categories",
      confirmButtonText: "Refresh page",
    });
  };

  const mapTemplates = (template) => {
    return (
      <option
        value={`${template.templateId}`}
        key={`${template.name}_${template.templateId}`}
      >
        {template.name}
      </option>
    );
  };

  const mapType = (type) => {
    return (
      <option value={type.id} key={`CategoryType_${type.id}`}>
        {type.name}
      </option>
    );
  };

  const renderOneContent = (component, index, setFieldValue) => {
    let result = null;
    if (
      component.type.id === 1 ||
      component.type.id === 2 ||
      component.type.id === 5 ||
      component.type.id === 7 ||
      component.type.id === 8
    ) {
      result = (
        <Row key={index} className="mb-4">
          <FormLabel>
            Content for the {component.keyName} || Data Type:{" "}
            {component.type.name}
          </FormLabel>
          <Field
            type={
              component.type.name === "Link"
                ? "url"
                : component.type.name === "Image"
                ? "file"
                : component.type.name
            }
            id={component.keyId}
            className="form-control"
            placeholder="Add Content Here!"
            name={`contents[${index}].content`}
          />
        </Row>
      );
    } else if (component.type.id === 6) {
      result = (
        <Row key={index} className="mb-4">
          <FormLabel>
            Content for the {component.keyName} || Data Type:{" "}
            {component.type.name}
          </FormLabel>
          <CKEditor
            editor={ClassicEditor}
            onReady={(editor) => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                  "height",
                  "300px",
                  editor.editing.view.document.getRoot()
                );
              });
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFieldValue(`contents[${index}].content`, data);
            }}
            name={`contents[${index}].content`}
            className="Form-control"
          />
        </Row>
      );
    } else {
      result = <h4> Unmatched key type id </h4>;
    }

    return result;
  };

  const handleTemplateChange = (e, setValues) => {
    const currentTemplateId = parseInt(e.target.value);
    if (currentTemplateId > 0) {
      const template = templates.arrayOfTemplates.find(
        (template) => template.templateId === currentTemplateId
      );

      if (template) {
        _logger("Template Selected:", template);

        setValues((prevState) => ({
          ...prevState,
          templateId: `${currentTemplateId}`,
          contents: template.templateKeys,
        }));
      }
    }
  };

  const onSubmitRequest = (values, { resetForm }) => {
    _logger("On Submit Newsletter Request", values);

    newsletterService
      .add(values)
      .then(onAddNewsletterSuccess({ resetForm }))
      .catch(onAddNewsletterError);
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Card>
            <Card.Header className="text-center">
              <Card.Title>
                <h1 className="text-primary">CREATE A NEW NEWSLETTER</h1>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                onSubmit={onSubmitRequest}
                validationSchema={NewslettersValidationSchema}
              >
                {({ values, setValues, setFieldValue }) => (
                  <Form>
                    <Row className="form-group mb-3" md="6" id="templateInput">
                      <FormLabel>Template</FormLabel>
                      <Field
                        component="select"
                        name="templateId"
                        className="form-control"
                        placeholder="Select a Template"
                        onChange={(e) =>
                          handleTemplateChange(e, setValues, setFieldValue)
                        }
                      >
                        <option value="">Select a Template</option>
                        {templates.templatesComponentArray}
                      </Field>
                      <ErrorMessage
                        name="templateId"
                        component="div"
                        className="newsletter-formik-error-message"
                      />
                    </Row>

                    <Row
                      className="form-group mb-3"
                      md="6"
                      id="categoryIdInput"
                    >
                      <FormLabel>Category</FormLabel>
                      <Field
                        component="select"
                        name="categoryId"
                        className="form-control"
                        placeholder="Select a Category"
                      >
                        {categoryOptions.categoriesComponentArray}
                      </Field>
                      <ErrorMessage
                        name="categoryId"
                        component="div"
                        className="newsletter-formik-error-message"
                      />
                    </Row>

                    <Row className="form-group mb-3" md="6" id="nameInput">
                      <FormLabel>Title</FormLabel>
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Insert the Newsletters Name"
                        disabled={parseInt(values.templateId) === 0}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="newsletter-formik-error-message"
                      />
                    </Row>

                    <Row
                      className="form-group mb-3"
                      md="6"
                      id="coverPhotoInput"
                    >
                      <FormLabel>Cover Photo</FormLabel>
                      <Field
                        type="url;"
                        name="coverPhoto"
                        className="form-control"
                        placeholder="Insert a Image"
                        disabled={parseInt(values.templateId) === 0}
                      />
                      <ErrorMessage
                        name="coverPhoto"
                        component="div"
                        className="newsletter-formik-error-message"
                      />
                    </Row>

                    <Row
                      className="form-group mb-3"
                      md="6"
                      id="descriptionInput"
                    >
                      <FormLabel>Description</FormLabel>
                      <Field
                        type="text"
                        name="description"
                        className="form-control newsletter-textarea"
                        placeholder="Insert a Description"
                        as="textarea"
                        rows={7}
                        disabled={parseInt(values.templateId) === 0}
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="newsletter-formik-error-message"
                      />
                    </Row>

                    <Row className="form-group mb-3" md="6" id="datesInputs">
                      <Col md="6">
                        <FormLabel>Date To Publish</FormLabel>
                        <Field
                          type="date"
                          name="dateToPublish"
                          className="form-control"
                          placeholder="Select a Date To Publish"
                          disabled={parseInt(values.templateId) === 0}
                        />
                        <ErrorMessage
                          name="dateToPublish"
                          component="div"
                          className="newsletter-formik-error-message"
                        />
                      </Col>

                      <Col md="6">
                        <FormLabel>Expiring Date</FormLabel>
                        <Field
                          type="date"
                          name="dateToExpire"
                          className="form-control"
                          placeholder="Select a Date To Expire"
                          disabled={parseInt(values.templateId) === 0}
                        />
                        <ErrorMessage
                          name="dateToExpire"
                          component="div"
                          className="newsletter-formik-error-message"
                        />
                      </Col>
                    </Row>

                    <div className="form-group mb-3" id="contentsArrayInput">
                      {parseInt(values.templateId) > 0 && (
                        <h3 className="text-center justify-content-center mt-5">
                          LIST OF CONTENTS
                        </h3>
                      )}
                      <FieldArray name="contents">
                        {() => {
                          return (
                            <>
                              <Row>
                                {values.contents.map((contentITem, index) =>
                                  renderOneContent(
                                    contentITem,
                                    index,
                                    setFieldValue
                                  )
                                )}
                              </Row>
                            </>
                          );
                        }}
                      </FieldArray>
                    </div>
                    <Row className="justify-content-center mt-3">
                      <Button type="submit">Submit!</Button>
                    </Row>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default AddNewsletterForm;

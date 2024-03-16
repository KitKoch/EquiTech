import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "react-bootstrap";
import { Field, Form, withFormik } from "formik";
import orgFormToolSchema from "../../schemas/orgFormToolSchema";
import * as lookUpService from "../../services/lookUpService";
import OrgFormToolCard from "./OrgFormToolCard";
import FileUploadWidget from "../fileupload/FileUploadWidget";

const _loggerPage = logger.extend("ORG");

function OrgFormToolPart1(props) {
  const {
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    values,
    nextLabel,
  } = props;

  const [organizationTypes, setOrganizationTypes] = useState({
    organizationTypes: [],
    setOrganizationTypes: [],
  });

  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    lookUpService
      .getTypes(["OrganizationTypes"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);

  const onLookUpSuccess = (response) => {
    let typesArray = response.item.organizationTypes;

    setOrganizationTypes((prevState) => {
      let newState = { ...prevState };

      newState.organizationTypes = typesArray;
      newState.organizationTypesComponent = typesArray.map(mappingOptions);

      return newState;
    });
    _loggerPage(organizationTypes.organizationTypes);
  };

  const onLookUpError = (error) => {
    _loggerPage("onGetTypesError", error);
  };

  const mappingOptions = (option) => {
    return (
      <React.Fragment key={option.id}>
        <option value={option.id}>{option.name}</option>
      </React.Fragment>
    );
  };

  const getUrl = (fileReponse, setUrl) => {
    _loggerPage("file response", fileReponse, setFieldValue);
    setUrl("logo", fileReponse[0].url);
    _loggerPage(values);
  };

  useEffect(() => {
    let id = parseInt(props.values.organizationTypeId);
    if (initialRender === false && id > 0) {
      let index = props.values.organizationTypeId - 1;
      _loggerPage("TYPEIDCHANGED!");
      setFieldValue(
        "organizationTypeName",
        organizationTypes.organizationTypes[index].name
      );
    } else if (initialRender === false && id === 0) {
      setFieldValue("organizationTypeName", "");
    } else {
      setInitialRender(false);
    }
  }, [props.values.organizationTypeId]);

  return (
    <React.Fragment>
      <Row className="mb-3">
        <Col sm={12} className="mt-3 mx-auto">
          <Card>
            <Card.Header>
              <Card.Title>Organization</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={handleSubmit}
                validationSchema={orgFormToolSchema.part1}
              >
                <Row>
                  <Col>
                    <Row className="mb-3">
                      <Col>
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <Field
                          type="text"
                          name="name"
                          id="name"
                          className={`form-control ${
                            errors.name && touched.name ? "input-error" : ""
                          }`}
                        />
                        {errors.name && touched.name && (
                          <p className="input-feedback text-danger">
                            {errors.name}
                          </p>
                        )}
                      </Col>
                      <Col>
                        <label htmlFor="headline" className="form-label">
                          Headline
                        </label>
                        <Field
                          type="text"
                          name="headline"
                          id="headline"
                          className={`form-control ${
                            errors.headline && touched.headline
                              ? "input-error"
                              : ""
                          }`}
                        />
                        {errors.headline && touched.headline && (
                          <p className="input-feedback text-danger">
                            {errors.headline}
                          </p>
                        )}
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col>
                        <label htmlFor="description" className="form-label">
                          Desciption
                        </label>
                        <Field
                          as="textarea"
                          name="description"
                          id="description"
                          rows="3"
                          className={`form-control ${
                            errors.description && touched.description
                              ? "input-error"
                              : ""
                          }`}
                        />
                        {errors.description && touched.description && (
                          <p className="input-feedback text-danger">
                            {errors.description}
                          </p>
                        )}
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <label htmlFor="logo" className="form-label">
                          Logo
                        </label>
                        <FileUploadWidget
                          id="logo"
                          name="logo"
                          isThumbnail={false}
                          isFileList={false}
                          handleFileChange={(files) =>
                            getUrl(files, setFieldValue)
                          }
                          isAlertPopUp={true}
                          className={`form-control ${
                            errors.logo && touched.logo ? "input-error" : ""
                          }`}
                        />
                        {errors.logo && touched.logo && (
                          <p className="input-feedback text-danger">
                            {errors.logo}
                          </p>
                        )}
                      </Col>
                      <Col>
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <Field
                          type="text"
                          id="phone"
                          name="phone"
                          className={`form-control ${
                            errors.phone && touched.description
                              ? "input-error"
                              : ""
                          }`}
                        />
                        {errors.phone && touched.phone && (
                          <p className="input-feedback text-danger">
                            {errors.phone}
                          </p>
                        )}

                        <label htmlFor="siteUrl" className="mt-3 form-label">
                          Site Url
                        </label>
                        <Field
                          type="text"
                          id="siteUrl"
                          name="siteUrl"
                          className={`form-control ${
                            errors.siteUrl && touched.siteUrl
                              ? "input-error"
                              : ""
                          }`}
                        />
                        {errors.siteUrl && touched.siteUrl && (
                          <p className="input-feedback text-danger">
                            {errors.siteUrl}
                          </p>
                        )}

                        <label
                          htmlFor="organizationType"
                          className="mt-3 form-label"
                        >
                          Organiztions Type
                        </label>
                        <Field
                          as="select"
                          id="organizationTypeId"
                          name="organizationTypeId"
                          className={`form-control ${
                            errors.organizationTypeId &&
                            touched.organizationTypeId
                              ? "input-error"
                              : ""
                          }`}
                        >
                          <option value="">Select...</option>
                          {organizationTypes.organizationTypesComponent}
                        </Field>
                        {errors.organizationTypeId &&
                          touched.organizationTypeId && (
                            <p className="input-feedback text-danger">
                              {errors.organizationTypeId}
                            </p>
                          )}
                      </Col>
                    </Row>
                  </Col>
                  <Col sm={4} className="mt-3">
                    <OrgFormToolCard input={values} />
                  </Col>
                </Row>
                <Row className="text-end mb-4 mt-5">
                  <Col>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn btn-primary"
                    >
                      {nextLabel}
                    </button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

OrgFormToolPart1.propTypes = {
  orgLoc: PropTypes.shape({}),
  touched: PropTypes.func.isRequired,
  errors: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.func.isRequired,
  nextLabel: PropTypes.string.isRequired,
  values: PropTypes.shape({
    logo: PropTypes.string,
    organizationTypeId: PropTypes.string,
    organizationTypeName: PropTypes.string,
  }),
};

export default withFormik({
  mapPropsToValues: (props) => ({
    name: props.orgLoc.name,
    headline: props.orgLoc.headline,
    description: props.orgLoc.description,
    logo: props.orgLoc.logo,
    organizationTypeId: props.orgLoc.organizationTypeId,
    organizationTypeName: props.orgLoc.organizationTypeName,
    phone: props.orgLoc.phone,
    siteUrl: props.orgLoc.siteUrl,
  }),
  validationSchema: orgFormToolSchema.part1,
  handleSubmit: (values, { props }) => {
    _loggerPage("submitted", values);
    props.onNext(values);
  },
})(OrgFormToolPart1);

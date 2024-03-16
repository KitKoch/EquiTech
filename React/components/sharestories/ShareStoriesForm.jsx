import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./sharestories.css";
import { Link } from "react-router-dom";
import { addStory } from "../../services/shareStoryService";
import shareStorySchema from "../../schemas/shareStorySchema";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function ShareStoriesForm(props) {
  const _logger = debug.extend("share story");
  _logger("share story");
  const formData = {
    name: "",
    story: "",
    primaryImageUrl: "",
  };

  const handleSubmit = (values) => {
    _logger(values);
    values.email = props.currentUser.email;

    addStory(values).then(onStorySubmitSuccess).catch(onStorySubmitError);
  };

  const onStorySubmitSuccess = (response) => {
    _logger(response, "story added succesfully");
    Swal.fire("Good job!", "You have submitted your story!", "success");
  };
  const onStorySubmitError = (response) => {
    _logger(response, "story DID NOT add");
    Swal.fire(
      "Oops, There was an error!",
      "Your story did not go through, check that your Title, and Story are filled in :)"
    );
  };

  return (
    <React.Fragment>
      <Container>
        <Col>
          <Row>
            <h1>Share Your Own Success Story</h1>
            <Formik
              enableReinitialize={true}
              initialValues={formData}
              onSubmit={handleSubmit}
              validationSchema={shareStorySchema}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="form-group mt-3">
                    <label htmlFor="name">Title Your Story:</label>
                    <Field
                      type="text"
                      name="name"
                      className="form-control py-1"
                    />
                    <ErrorMessage name="name" />
                  </div>

                  <div className="form-group mt-3">
                    <label>Add Your Success Story Here:</label>
                    <CKEditor
                      editor={ClassicEditor}
                      className="py-1"
                      onChange={(event, editor) => {
                        const editorContent = editor.getData();
                        setFieldValue("story", editorContent);
                      }}
                      onReady={(editor) => {
                        editor.editing.view.change((writer) => {
                          writer.setStyle(
                            "height",
                            "400px",
                            editor.editing.view.document.getRoot()
                          );
                        });
                      }}
                    />
                  </div>

                  <div className="form-group mt-3">
                    <label htmlFor="name">Add an Image Url:</label>
                    <Field
                      type="text"
                      name="primaryImageUrl"
                      className="form-control py-1"
                    />
                    <ErrorMessage name="imageUrl" />
                  </div>

                  <div className="pt-4 pb-1">
                    <Button
                      className="btn btn-primary d-flex mx-auto"
                      type="submit"
                    >
                      Submit Story
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>{" "}
            <div className="pt-3 pb-6">
              <Link to="/sharestories">
                <Button
                  className="btn btn-secondary d-flex mx-auto"
                  type="button"
                >
                  Back to Success Stories
                </Button>
              </Link>
            </div>
          </Row>
        </Col>
      </Container>
    </React.Fragment>
  );
}

ShareStoriesForm.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    organizationId: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ShareStoriesForm;

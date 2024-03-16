import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik"; 
import {
  Button,
  Container,
  Col,
  Row,
  FormLabel,
  FormGroup,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import commentFormSchema from "../../schemas/commentFormSchema";
import commentService from "../../services/commentService";
import toastr from "toastr";
import PropTypes from "prop-types";
import "./commentstyle.css";

const CommentForm = (props) => {
  const [commentFormData, setCommentFormData] = useState({
    id: "",
    subject: "subject",
    text: "",
    parentId: null,
    entityTypeId: 1,
    entityId: 5,
    isDeleted: false,
  });

  useEffect(() => {
    setCommentFormData((prevState) => {
      const newCommentFormData = {
        ...prevState,
      };

      newCommentFormData.entityTypeId = props.entityTypeId || 1;
      newCommentFormData.entityId = props.entityId || 5;
      newCommentFormData.parentId = props.parentId || null;

      return newCommentFormData;
    });
  }, []);

  const onHandleSubmit = (values) => {
    commentService
      .addComment(values)
      .then((response) => onAddCommentSuccess(response, values))
      .catch(onAddCommentError);
  };

  const onAddCommentSuccess = (response, values) => {
    toastr.success("New Comment Added");
    props.onSuccess({ ...values, id: response.item });
  };

  const onAddCommentError = (error) => {
    toastr.error("Oops, something went wrong. Please try again.", error);
  };

  return (
    <React.Fragment>
      <Helmet title="Formik" />
      <Container
        className={`p-0 justify-content-center align-items-center  ${
          props.parentId && "ms-5"
        }`}
      >
        <Row className="row">
          <Col className="col-12">
            <Formik
              enableReinitialize={true}
              initialValues={commentFormData}
              validationSchema={commentFormSchema}
              onSubmit={onHandleSubmit}
            >
              <Form className="px-md-2">
                <FormGroup className="comment-form-textarea">
                  <FormLabel htmlFor="text">Comment</FormLabel>
                  <Field
                    component="textarea"
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Please Enter Comment Here"
                  />
                  <ErrorMessage
                    name="text"
                    component="div"
                    className="comment-has-error"
                  />
                </FormGroup>
                <Button
                  type="submit"
                  className="btn comment-btn-square comment-button-feather btn-primary my-3"
                >
                  Add Comment
                </Button>
              </Form>
            </Formik>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

CommentForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  entityId: PropTypes.number.isRequired,
  entityTypeId: PropTypes.number.isRequired,
  parentId: PropTypes.number,
};

export default CommentForm;

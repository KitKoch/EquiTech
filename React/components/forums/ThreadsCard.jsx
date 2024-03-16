// import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import forumsServices from "../../services/forumService";
import userService from "../../services/userService";
import ThreadResponse from "./ThreadResponse";
import Offcanvas from "react-bootstrap/Offcanvas";
import { bottom } from "@popperjs/core";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import threadReplySchema from "../../schemas/threadReplySchema";

function ThreadsCard(props) {
  const _logger = debug.extend("Forum ThreadCard");
  const input = props.input;

  const [pageData, setPageData] = useState({
    show: false,
    pageSize: 30,
    pageIndex: 0,
    tName: "",
    tReplies: [],
    tRepliesArray: [],
    replyForm: false,
    replyLenght: 0,
  });

  const [formData, setFormData] = useState({
    subject: "",
    parentId: input.id,
    forumId: input.forumId,
    content: input.content,
    createdBy: 0,
  });

  useEffect(() => {
    if (input.replies !== null) {
      setPageData((prevState) => {
        let pd = { ...prevState };
        pd.replyLenght = input.replies.length;
        return pd;
      });
    }

    userService.getCurrentUser().then(onGetUserSuccess).catch(onGetError);
  }, []);

  const showOffcanvas = () => {
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.replyForm === true ? (pd.replyForm = false) : (pd.replyForm = true);
      return pd;
    });
  };
  const showReplies = () => {
    let parentId = input.id;

    if (input.replies === null) {
      showOffcanvas();
    } else {
      forumsServices
        .getByParentId(parentId, pageData.pageIndex, pageData.pageSize)
        .then(onGetPartentById)
        .catch(onGetError);
    }
  };
  const onGetUserSuccess = (resposnse) => {
    let res = resposnse.item.id;
    setFormData((prevState) => {
      let pd = { ...prevState };
      pd.createdBy = res;
      return pd;
    });
    _logger("onGetUser", res);
  };

  const theseValues = (childInfo) => {
    setFormData((prevState) => {
      let pd = { ...prevState };
      pd.forumId = childInfo.forumId;
      pd.content = childInfo.content;
      pd.parentId = childInfo.parentThreadId;
      return pd;
    });
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.replyForm === true ? (pd.replyForm = false) : (pd.replyForm = true);
      return pd;
    });
  };

  const postReply = (values) => {
    _logger("These are the values at the END", values);
    forumsServices.postThread(values).then(onPostSuccess).catch(onGetError);
  };

  const onPostSuccess = (res) => {
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.replyLenght = pageData.replyLenght + 1;
      return pd;
    });

    showReplies();
    showOffcanvas();

    _logger("onPostSuccess->", res);
  };

  const onGetPartentById = (res) => {
    let threadsByPId = res.item.pagedItems[0];
    if (res === null) {
    }
    setPageData((prevState) => {
      _logger("threadsByPId->", threadsByPId);

      let pd = { ...prevState };
      pd.show === true ? (pd.show = false) : (pd.show = true);
      pd.tName = threadsByPId.content;
      pd.tReplies = threadsByPId.replies;
      pd.tRepliesArray = threadsByPId.replies.map(tMapper);

      return pd;
    });
  };

  const onGetError = (err) => {
    _logger("ERROR", err);
  };

  const tMapper = (singleThread) => {
    return (
      <ThreadResponse
        toCard={singleThread}
        key={"tCard" + singleThread.id}
        fromChild={theseValues}
      />
    );
  };

  return (
    <>
      <tr onClick={showReplies}>
        <td>
          <img
            src={input.author.avatarUrl}
            width="40"
            height="40"
            className="rounded-circle me-2"
            alt="Avatar"
          />
          {""}
          {input.author.firstName} {""} {input.author.lastName}
        </td>
        <td>{input.subject}</td>
        <td>{input.content}</td>
        <td>{pageData.replyLenght}</td>
      </tr>
      {pageData.show === true && pageData.tRepliesArray}

      <Offcanvas
        placement={bottom}
        show={pageData.replyForm}
        onHide={showOffcanvas}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ADD YOUR REPLY</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Formik
            enableReinitialize={true}
            initialValues={formData}
            onSubmit={postReply}
            validationSchema={threadReplySchema}
          >
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="subject" className="text-dark">
                  Add Your Reply
                </label>
                <Field
                  type="text"
                  name="subject"
                  id="subject"
                  className="form-control"
                  autoFocus={true}
                />
                <ErrorMessage
                  name="subject"
                  component="div"
                  className="has-error"
                />
              </div>
              <Button
                type="submit"
                variant="info"
                size="sm"
                className="btn-pill me-1"
              >
                Reply
              </Button>
            </Form>
          </Formik>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

ThreadsCard.propTypes = {
  // fromThreadsCard: PropTypes.func(PropTypes.shape()),
  input: PropTypes.shape({
    id: PropTypes.number.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    forumName: PropTypes.string.isRequired,
    parentThreadId: PropTypes.number,
    forumId: PropTypes.number,
    replies: PropTypes?.arrayOf(PropTypes.shape()),

    author: PropTypes.shape({
      avatarUrl: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }),
};

export default ThreadsCard;

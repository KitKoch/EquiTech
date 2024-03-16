import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import forumsServices from "../../services/forumService";
import { Card, Container, Table } from "react-bootstrap";
import "rc-pagination/assets/index.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ThreadsCard from "./ThreadsCard";

function ForumsCategoryById() {
  const _logger = debug.extend("Forum ThreadId");
  let { forumId } = useParams();
  const [pageData, setPageData] = useState({
    threadRaw: [],
    threadArray: [],
    name: "",
    threadsReplies: [],
  });

  useEffect(() => {
    forumsServices
      .getThreadByForumId(forumId)
      .then(onGetThreadSuccess)
      .catch(onGetError);
  }, []);

  const onGetThreadSuccess = (res) => {
    let input = res.items;

    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.threadRaw = input;
      pd.name = input[0].forumName;
      pd.threadArray = input.map(threadMapper);
      return pd;
    });
  };

  const threadMapper = (aThread) => {
    return (
      <ThreadsCard
        key={"thread" + aThread.id}
        input={aThread}
        // fromThreadsCard={showMe}
      />
    );
  };

  const onGetError = (err) => {
    _logger("ERROR", err);
  };

  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/forums/">Categories</Breadcrumb.Item>
          <Breadcrumb.Item active>Thread: {pageData.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Card>
          <Card.Header>
            <Card.Title> Welcome to the threads</Card.Title>
          </Card.Header>
          <Table striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Content</th>
                <th>Replies</th>
              </tr>
            </thead>
            <tbody>{pageData.threadArray}</tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
}

export default ForumsCategoryById;

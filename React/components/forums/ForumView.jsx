import React, { useEffect, useState } from "react";
import ForumCategory from "./ForumCategory";
import { Container, Row, Card, Col } from "react-bootstrap";
import forumsServices from "../../services/forumService";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function ForumView() {
  const _logger = debug.extend("Forums");
  const [pageData, setPageData] = useState({
    categories: [],
    categoriesArray: [],
  });

  useEffect(() => {
    forumsServices
      .SelectAllCategories()
      .then(onGetForumCategoriesSuccess)
      .catch(onGetError);
  }, []);

  const onGetForumCategoriesSuccess = (res) => {
    _logger("onGetForumCategoriesSuccess", res);

    let resCategories = res.items;
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.categories = resCategories;
      pd.categoriesArray = resCategories.map(categoryMap);
      return pd;
    });
  };

  const onGetError = (err) => {
    _logger("ERROR", err);
  };

  const categoryMap = (aForum) => {
    return <ForumCategory toCard={aForum} key={"Category-" + aForum.id} />;
  };

  return (
    <React.Fragment>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/forums/">Categories</Breadcrumb.Item>
        </Breadcrumb>
        <Card className="justify-content-center">
          <h1 className="justify-content-center">Forum View</h1>
          <Col>
            <Row className="justify-content-center" md="6" lg="4">
              {pageData.categoriesArray}
            </Row>
          </Col>
        </Card>
      </Container>
    </React.Fragment>
  );
}
export default ForumView;

import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import ForumsCard from "./ForumsCard";
import forumsServices from "../../services/forumService";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";

function ForumCatogory(props) {
  const _logger = debug.extend("Forum Category");
  const fData = props.toCard;
  _logger("FC props", fData);

  const [pageData, setPageData] = useState({
    forumsRaw: [],
    forumsArray: [],
    name: "",
    totalCount: 0,
    pageIndex: 0,
    pageSize: 5,
    totalPages: 0,
  });

  useEffect(() => {
    _logger("useEffect in ForumsCategoryById");

    forumsServices
      .getForumsByCat(fData.id, pageData.pageIndex, pageData.pageSize)
      .then(onGetForumSuccess)
      .catch(onGetError);
  }, [pageData.pageIndex]);

  const onGetForumSuccess = (res) => {
    let resIn = res.item.pagedItems;

    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.forumsRaw = resIn;
      pd.name = resIn[0].forumCategory.name;
      pd.totalCount = res.item.totalCount;
      pd.totalPages = res.item.totalPages;
      pd.forumsArray = resIn.map(forumMap);
      return pd;
    });
  };

  const forumMap = (aForum) => {
    return <ForumsCard forumById={aForum} key={"CatyById-" + aForum.id} />;
  };

  const onGetError = (err) => {
    _logger("ERROR", err);
  };

  const onChange = (page) => {
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.pageIndex = page - 1;
      return pd;
    });
  };
  return (
    <>
      <Card>
        <Card.Header>
          <Card.Title>{fData.name}</Card.Title>
        </Card.Header>
        <Table striped bordered hover variant>
          {pageData.forumsArray}
        </Table>
        <Pagination
          onChange={onChange}
          pageSize={pageData.pageSize}
          current={pageData.pageIndex + 1}
          total={pageData.totalCount}
          locale={locale}
          className="m-lg-4 text-center"
        />
      </Card>
    </>
  );
}

ForumCatogory.propTypes = {
  toCard: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    forums: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }),
};

export default ForumCatogory;

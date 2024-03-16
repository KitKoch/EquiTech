import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import blogsService from "../../services/blogsService";
import toastr from "toastr";
import "./blogs.css";
import { getTypes } from "../../services/lookUpService";
import { Form } from "react-bootstrap";
import { CardGroup } from "react-bootstrap";

function BlogsPage() {
  const _logger = debug.extend("BlogsPage");
  const [pageData, setPageData] = useState({
    arrayOfBlogs: [],
    blogsComponent: [],
    pageIndex: 0,
    pageSize: 3,
    totalCount: 0,
    query: "",
  });
  const [blogTypeSelected, setBlogTypeSelected] = useState(0);

  useEffect(() => {
    if (pageData.query === "") {
      blogsService
        .getBlogs(pageData.pageIndex, pageData.pageSize)
        .then(onGetBlogsSuccess)
        .catch(onGetBlogsError);
    } else {
      blogsService
        .searchBlogs(pageData.pageIndex, pageData.pageSize, pageData.query)
        .then(onGetBlogsSuccess)
        .catch(onSearchBlogsError);
    }
  }, [pageData.pageIndex, pageData.pageSize, pageData.query]);

  const onGetBlogsSuccess = (data) => {
    let arrayOfCoolBlogs = data.item.pagedItems;
    const totalCount = data.item.totalCount;

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfBlogs = arrayOfCoolBlogs;
      pd.blogsComponent = arrayOfCoolBlogs.map(mapBlog);
      pd.totalCount = totalCount;
      return pd;
    });
  };

  const onGetBlogsError = (err) => {
    _logger(err);
  };

  const onSearchBlogsError = (err) => {
    _logger(err);
  };
  const mapBlog = (aBlog) => {
    return <BlogCard blogCard={aBlog} key={"BlogCard-" + aBlog.id} />;
  };

  const onChange = (page) => {
    setPageData((prevData) => {
      const pd = { ...prevData };
      pd.pageIndex = page - 1;
      return pd;
    });
  };

  const onFilterByTypeChange = (e) => {
    const value = e.target.value;
    _logger("SELECTED OPTION", value);
    setBlogTypeSelected(value);

    if (value === "") {
      blogsService
        .getBlogs(pageData.pageIndex, pageData.pageSize)
        .then(onGetBlogsSuccess)
        .catch(onGetBlogsError);
    } else {
      blogsService
        .getBlogsByTypes(pageData.pageIndex, pageData.pageSize, value)
        .then(onGetBlogsByTypeSuccess)
        .catch(onGetBlogsByTypeError);
    }
  };
  const onGetBlogsByTypeSuccess = (data) => {
    _logger("firing:", data);
    let arrayOfCoolBlogs = data.item.pagedItems;
    const totalCount = data.item.totalCount;

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfBlogs = arrayOfCoolBlogs;
      pd.blogsComponent = arrayOfCoolBlogs.map(mapBlog);
      pd.totalCount = totalCount;
      return pd;
    });
  };

  const onGetBlogsByTypeError = (err) => {
    toastr.error("Blogstypes unable to load, Refresh page.");
    _logger(err);
  };

  const [blogType, setBlogType] = useState({
    blogTypeId: [],
    blogTypeNames: [],
  });

  useEffect(() => {
    _logger("useEffect for blogs");
    getTypes(["blogTypes"])
      .then(onBlogTypeOptionSuccess)
      .catch(onBlogTypeOptionError);
  }, []);

  const onBlogTypeOptionSuccess = (response) => {
    _logger("blogTypeSuccess", response);
    let blogTypeArray = response.item.blogTypes;

    setBlogType((prevState) => {
      const pd = { ...prevState };
      pd.blogType = blogTypeArray;
      pd.blogTypeNames = blogTypeArray.map(mapBlogTypes);

      return pd;
    });
  };
  const onBlogTypeOptionError = (err) => {
    _logger(err);
  };

  const mapBlogTypes = (blogType) => {
    return (
      <option value={blogType.id} key={`blogTypes-${blogType.id}`}>
        {blogType.name}
      </option>
    );
  };

  const onSearchBlogsChange = (event) => {
    _logger("onChange");

    const target = event.target;

    const searchBlogValue = target.value;

    _logger({ searchBlogValue });

    setPageData((prevState) => {
      _logger("updated onChange");
      const newBlogObject = {
        ...prevState,
      };

      newBlogObject.query = searchBlogValue;
      newBlogObject.pageIndex = 0;
      return newBlogObject;
    });

    _logger("end onChange");
  };

  return (
    <div className="container">
      <h3 className="mt-3">Blogs</h3>
      <div className="row justify-content-between">
        <div className="col-3">
          <form className="search-bar">
            <div className="mb-3">
              <label htmlFor="title" className="form-label"></label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="search"
                name="search"
                placeholder="Search..."
                value={pageData.query}
                onChange={onSearchBlogsChange}
              />
            </div>
          </form>
        </div>
        <div className="col-3">
          <Form className=" py-4">
            <Form.Select
              className=""
              onChange={onFilterByTypeChange}
              value={blogTypeSelected}
            >
              <option value="">All Categories</option>
              {blogType.blogTypeNames}
            </Form.Select>
          </Form>
        </div>
      </div>

      <CardGroup>{pageData.blogsComponent}</CardGroup>
      <div className="row text-center pb-4">
        <Pagination
          className="mt-3 mb-3 text-center"
          onChange={onChange}
          pageSize={pageData.pageSize}
          current={pageData.pageIndex + 1}
          total={pageData.totalCount}
        />
      </div>
    </div>
  );
}

export default BlogsPage;

import React, { useEffect, useState } from "react";
import * as lookUpService from "../../services/lookUpService";
import newsletterService from "../../services/newsletterService";
import { Form } from "react-bootstrap";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import toastr from "toastr";
import Swal from "sweetalert2";
import "./newsletter.css";
import "rc-pagination/assets/index.css";

function Newsletter() {
  const _logger = debug.extend("Newsletter");
  const [pageData, setPageData] = useState({
    arrayOfNewsletters: [],
    newsletterComponents: [],
    totalItemCount: 0,
    pageIndex: 0,
    pageSize: 4,
    categoryId: 1,
  });

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    lookUpService
      .getTypes(["NewsletterCategories"])
      .then(getTypeSuccess)
      .catch(getCategoryError);
  }, []);

  useEffect(() => {
    fetchNewsletters();
  }, [pageData.pageIndex, pageData.categoryId]);

  const fetchNewsletters = () => {
    if (pageData.categoryId !== 1 || pageData.categoryId !== "1") {
      newsletterService
        .getNewslettersByCatagoryTypes(
          pageData.pageIndex,
          pageData.pageSize,
          pageData.categoryId
        )
        .then(onGetNewslettersSuccess)
        .catch(onGetCategoryError);
    } else {
      newsletterService
        .getPaginated(pageData.pageIndex, pageData.pageSize)
        .then(onGetNewslettersSuccess)
        .catch(onGetNewslettersError);
    }
  };

  const onGetNewslettersSuccess = (data) => {
    let arrayOfNewsletters = data.item.pagedItems;
    setPageData((prevState) => ({
      ...prevState,
      arrayOfNewsletters,
      newsletterComponents: arrayOfNewsletters.map(mapNewsletter),
      totalItemCount: data.item.totalCount,
    }));
  };

  const onGetNewslettersError = (error) => {
    _logger(error);
    toastr.error("Error displaying Newsletters");
  };

  const onGetCategoryError = (error) => {
    _logger(error);
    toastr.error("Error displaying Newsletter Categories");
  };

  const onFilterByTypeChange = (e) => {
    const value = e.target.value;
    setPageData((prevState) => ({
      ...prevState,
      categoryId: value,
      pageIndex: 0,
    }));
    _logger("filter changed", value);
  };

  const handlePageChange = (page) => {
    setPageData((prevState) => ({
      ...prevState,
      pageIndex: page - 1,
    }));
  };

  const getTypeSuccess = (response) => {
    const categoryTypes = response.item.newsletterCategories;
    setCategoryOptions(categoryTypes);
  };

  const getCategoryError = (err) => {
    _logger("getCategory not working", err);
    Swal.fire({
      icon: "error",
      title: "Could not get newsletter Categories",
      confirmButtonText: "Refresh page",
    });
  };

  const mapNewsletter = (aNewsletter) => {
    return (
      <div className="col-md-3" key={"Newsletters-Item" + aNewsletter.id}>
        <div className="newsletter-card-rounded">
          <div className="newsletter-card-image">
            <img
              src={aNewsletter.coverPhoto}
              className="newsletter-card-img-top"
              alt="Newspaper Cover Photo"
            />
          </div>
          <div className="newsletter-card-body">
            <p>
              <b>
                <span className="newsletter-subscriber-text">
                  SUBSCRIBER ONLY{" "}
                </span>
                | WEEKLY
              </b>
            </p>
            <h2 className="newsletter-title-height">{aNewsletter.name}</h2>
            <p className="newsletter-title-height">{aNewsletter.description}</p>
            <h6>
              Date Created: {aNewsletter.template.dateCreated.slice(0, 10)}
            </h6>
          </div>
        </div>
      </div>
    );
  };

  const mapType = (type) => {
    return (
      <option value={type.id} key={`CategoryType_${type.id}`}>
        {type.name}
      </option>
    );
  };

  return (
    <div className="container">
      <h1 className="mt-3">
        <strong>Newsletters</strong>
      </h1>
      <h4 className="mb-4">
        Get the best of <em>The Fairly</em>, straight to your inbox.
      </h4>
      <div className="col-3">
        <Form className="py-3">
          <Form.Select
            className=""
            onChange={onFilterByTypeChange}
            value={pageData.categoryId}
          >
            {categoryOptions.map(mapType)}
          </Form.Select>
        </Form>
      </div>
      <div className="row mt-4">{pageData.newsletterComponents}</div>
      <Pagination
        className="mt-3 mb-3 text-center"
        onChange={handlePageChange}
        current={pageData.pageIndex + 1}
        total={pageData.totalItemCount}
        locale={locale}
        pageSize={pageData.pageSize}
      />
    </div>
  );
}

export default Newsletter;

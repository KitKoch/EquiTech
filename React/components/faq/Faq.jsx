import React, { useState, useEffect, useCallback } from "react";
import { Col, Container, Row, Tabs, Tab, Button } from "react-bootstrap";
import * as lookUpService from "../../services/lookUpService";
import faqsBanner from "../../assets/img/photos/faqs.jpg";
import faqService from "../../services/faqService";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import FaqCard from "./FaqCard";
import Swal from "sweetalert2";
import toastr from "toastr";
import "./faq.css";
function FAQ(props) {
  const _logger = debug.extend("faq");

  const navigate = useNavigate();

  const [faqs, setFaqs] = useState({
    arrayOfFaqs: [],
    arrayOfFaqComponents: [],
  });

  const [catTab, setCatTab] = useState({
    catTabs: [],
    tabSelected: 0,
  });

  useEffect(() => {
    faqService.getAll().then(onGetFaqsSuccess).catch(onGetFaqsFailure);
    lookUpService
      .getTypes(["FAQCategories"])
      .then(getTypeSuccess)
      .catch(getTypeError);
  }, []);

  const onGetFaqsSuccess = (response) => {
    setFaqs((prevState) => {
      const faqData = { ...prevState };
      faqData.arrayOfFaqs = response.items;
      faqData.arrayOfFaqComponents = response.items.map(mapFaq);
      return faqData;
    });
  };

  function mapFaq(faq) {
    return (
      <FaqCard
        faq={faq}
        key={`faq ${faq.id}`}
        currentUser={props.currentUser}
        faqDeleteHandler={onFaqsDelete}
      />
    );
  }

  const onGetFaqsFailure = (err) => {
    toastr["error"]("Unable to get FAQs", "Error");
    _logger({ error: err });
  };

  const getTypeSuccess = (data) => {
    const mapcatTabs = (category) => {
      return (
        <Tab
          eventKey={category.id}
          title={category.name}
          className={category.id}
          onClick={handleButtonClick}
          key={`CatBtn_${category.id}`}
        ></Tab>
      );
    };

    setCatTab((prevState) => {
      const catData = { ...prevState };
      catData.catTabs = data.item.faqCategories.map(mapcatTabs);
      return catData;
    });
  };

  const getTypeError = (err) => {
    toastr["error"]("Unable to get FAQs", "Error");
    _logger({ error: err });
  };

  function handleButtonClick(e) {
    _logger(e);
    const setTab = (num) => {
      setCatTab((prevState) => {
        const catData = { ...prevState };
        catData.tabSelected = num;
        _logger("current tab selected", catData.tabSelected);
        return catData;
      });
    };
    filterByCategory(e);
    setTab(e);
  }

  const filterByCategory = (categoryId) => {
    faqService
      .getByCategory(categoryId)
      .then(onFilterSuccess)
      .catch(onFilterFail);

    function onFilterSuccess(response) {
      setFaqs((prevState) => {
        const faqData = { ...prevState };
        faqData.arrayOfFaqs = response.items;
        faqData.arrayOfFaqComponents = response.items.map(mapFaq);
        return faqData;
      });
    }

    const onFilterFail = (err) => {
      toastr["error"]("Unable to filter FAQs", "Error");
      _logger({ error: err });
    };
  };

  const onFaqsDelete = useCallback((aFaq) => {
    _logger(aFaq, "from the delete");
    const idToBeDeleted = aFaq.id;
    Swal.fire({
      title: "Are you sure?",
      text: "This FAQ will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
    })
      .then((result) => {
        if (result.isConfirmed) {
          faqService
            .deleteById(idToBeDeleted)
            .then(onDeleteSuccess(aFaq.id))
            .catch(onFaqsDeleteError);
        }
      })
      .catch((err) => {
        if (err) {
          _logger("error", err);
          Swal.fire("Error.", "FAQ could not be deleted", "error");
        }
      });
    _logger(idToBeDeleted, "is going to be deleted");
  }, []);

  const onDeleteSuccess = () => {
    Swal.fire("Deleted!", "Appointment has been deleted.", "success");
    const selectedTab = catTab.tabSelected;
    if (selectedTab === 0) {
      faqService.getAll().then(onGetFaqsSuccess).catch(onGetFaqsFailure);
    } else {
      filterByCategory(selectedTab);
    }
  };

  const onFaqsDeleteError = (err) => {
    _logger({ error: err });
  };

  const sendNewFAQ = () => {
    navigate("/faqs/new");
  };

  return (
    <React.Fragment>
      <Row>
        <div className="jumbotron jumbotron-fluid">
          <img
            src={faqsBanner}
            className="img-fluid faq-banner-img"
            alt="faq-banner"
          />
        </div>
      </Row>
      <Row>
        <Tabs
          defaultActiveKey="general"
          className="mb-2 d-flex justify-content-center mt-4"
          onSelect={handleButtonClick}
        >
          {catTab.catTabs}
        </Tabs>
      </Row>
      <Container>
        <Row className="ml-2">
          <Col className="shadow-lg p-3 mb-5 bg-body-tertiary rounded">
            {faqs.arrayOfFaqComponents}
          </Col>
        </Row>
        <Row className=" mb-3">
          <Col>
            <Button className="d-flex btn btn-success" onClick={sendNewFAQ}>
              Add New FAQ+
            </Button>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

FAQ.propTypes = {
  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default FAQ;

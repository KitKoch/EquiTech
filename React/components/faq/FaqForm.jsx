import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, FormLabel, Row } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as lookUpService from "../../services/lookUpService";
import faqService from "../../services/faqService";
import newFaqSchema from "../../schemas/faqFormSchema";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import "./faq.css";

const _logger = logger.extend("faq");

function FaqForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const [initialValues, setInitialValues] = useState({
    id: 0,
    question: "",
    answer: "",
    categoryId: 0,
    sortorder: 0,
  });

  const [categoryId, setCategoryId] = useState([]);

  useEffect(() => {
    const payload = ["FAQCategories"];
    lookUpService
      .getTypes(payload)
      .then(getTypeSuccess)
      .catch(getCategoryError);
    if (location.state?.type === "FAQ_EDIT" && location.state?.payload.id > 0) {
      setInitialValues((prevState) => {
        let initialV = { ...prevState };
        let newData = location.state.payload;
        newData.category = { ...location.state.payload.category };
        initialV.id = newData.id;
        initialV.question = newData.question;
        initialV.answer = newData.answer;
        initialV.categoryId = newData.category.id;
        initialV.sortorder = newData.sortOrder;
        return initialV;
      });
    }
  }, []);

  const getTypeSuccess = (response) => {
    const categoryTypes = response.item.faqCategories;
    setCategoryId(categoryTypes.map(mapType));
    _logger("caregories", categoryTypes);
  };

  function getCategoryError(err) {
    _logger("getCategory not working", err);
    Swal.fire({
      icon: "error",
      title: "Could not get FAQ Categories",
      confirmButtonText: "Refresh 8d",
    });
  }

  const mapType = (type) => {
    return (
      <option value={type.id} key={`CategoryType_${type.id}`}>
        {type.name}
      </option>
    );
  };

  const onCreateFaqSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "You created a new FAQ!",
    }).then(navigate("/faqs"));
  };

  const onCreateFaqError = (error) => {
    _logger("On FAQ creation error", error);
    Swal.fire({
      icon: "error",
      title: "Faq creation unsuccessful",
      confirmButtonText: "Try again",
    });
  };

  const handleSubmit = (values) => {
    _logger("edit pressed or submit", "values", values);
    if (location.state?.type === "FAQ_EDIT") {
      _logger("edited faq");
      faqService.updateFaq(values).then(onEditSuccess).catch(onEditFaqError);
    } else {
      _logger("added faq");
      faqService
        .addFaq(values)
        .then(onCreateFaqSuccess)
        .catch(onCreateFaqError);
    }
  };

  const onEditSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "FAQ edit was successful!",
    }).then(navigate("/faqs"));
  };

  const onEditFaqError = (error) => {
    _logger("On FAQ edit error", error);
    Swal.fire({
      icon: "error",
      title: "Faq edit unsuccessful",
      confirmButtonText: "Try again",
    });
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card id="basecard">
            <Card.Header id="cardTitle">
              <Card.Title>
                <h1 className="d-flex justify-content-center pt-5 colorB">
                  What FAQ would you like to create?
                </h1>
              </Card.Title>
            </Card.Header>
            <Card.Body id="carbody">
              <Formik
                enableReinitialize={true}
                validationSchema={newFaqSchema}
                onSubmit={handleSubmit}
                initialValues={initialValues}
              >
                <Form>
                  <Row className="px-2">
                    <FormLabel htmlFor="question">Question</FormLabel>
                    <Field
                      className="form-control"
                      type="text"
                      name="question"
                      placeholder="Type question here"
                    ></Field>
                    <ErrorMessage
                      name="question"
                      component="div"
                      className="faq-has-error"
                    />
                  </Row>
                  <br />
                  <Row className="px-2">
                    <FormLabel htmlFor="answer">Answer</FormLabel>
                    <Field
                      className="form-control"
                      type="text"
                      name="answer"
                      placeholder="Type answer here"
                    ></Field>
                    <ErrorMessage
                      name="answer"
                      component="div"
                      className="faq-has-error"
                    />
                  </Row>
                  <br />
                  <Row className="px-2">
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <Field
                      className="form-control"
                      component="select"
                      name="categoryId"
                    >
                      <option value={categoryId}>
                        Please Select A Category
                      </option>
                      {categoryId}
                    </Field>
                    <ErrorMessage
                      name="categoryId"
                      component="div"
                      className="faq-has-error"
                    />
                  </Row>
                  <br />
                  <Row className="px-2">
                    <FormLabel htmlFor="sortorder">Sort Order</FormLabel>
                    <Field
                      className="form-control"
                      type="number"
                      min="0"
                      name="sortorder"
                      placeholder="Enter the order you want to sort in"
                    ></Field>
                    <ErrorMessage
                      name="sortorder"
                      component="div"
                      className="faq-has-error"
                    />
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Button
                        className="m-3 btn btn-primary ml-32"
                        type="submit"
                      >
                        {location.state?.type === "FAQ_EDIT"
                          ? "Submit Edit"
                          : "Submit New FAQ"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default FaqForm;

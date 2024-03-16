import React, { useEffect, useState } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  addSubscription,
  getInvoiceFromSubscription,
  getSubscriptionBySesssionId,
  getCurrentUsersUpcomingInvoice,
  getCurrentSubscription,
} from "../../services/stripeService";
import {
  ProgressBar,
  Col,
  Row,
  Container,
  Card,
  Button,
} from "react-bootstrap";

const _logger = logger.extend("orderSuccess");

function StripeOrderSuccessPage() {
  const notyf = new Notyf();
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const sessionId = params.get("sessionId");

  const [successPage, setSuccessPage] = useState({
    isLoaded: false,
    currentSubscription: null,
    invoice: null,
  });

  useEffect(() => {
    if (sessionId) {
      addSubscription({ sessionId: sessionId })
        .then(onAddSubSuccess)
        .catch(onAddSubError);
    }
    if (!sessionId) {
      getCurrentSubscription().then(onGetSubSuccess).catch(onGetSubError);
    }
  }, []);

  useEffect(() => {
    if (successPage.currentSubscription && successPage.invoice) {
      setSuccessPage((prevState) => {
        let newState = { ...prevState };
        newState.isLoaded = true;
        return newState;
      });
    }
  }, [successPage.currentSubscription, successPage.invoice]);

  const onGetInvoiceError = (err) => {
    _logger(err);
    notyf.error("Failed to retrive Invoice Information RELOAD");
  };
  const onGetSubError = (err) => {
    _logger(err);
    notyf.error("Failed to retrive Subscription Information");
    setTimeout(() => {
      navigate("/pricing");
    }, 2500);
  };

  const onGetSubSuccess = (res) => {
    const subscription = res.data.item;
    getCurrentUsersUpcomingInvoice()
      .then(onGetInvoiceSuccess)
      .catch(onGetInvoiceError);

    setSuccessPage((prevState) => {
      let newState = { ...prevState };
      newState.currentSubscription = subscription;
      return newState;
    });
  };

  const onAddSubSuccess = (res) => {
    const subId = res.data.item;
    getCurrentSubscription().then(onGetSubSuccess).catch(onGetSubError);
    getInvoiceFromSubscription(subId)
      .then(onGetInvoiceSuccess)
      .catch(onGetInvoiceError);
  };

  const onGetInvoiceSuccess = (res) => {
    const invoice = res.data.item;
    setSuccessPage((prevState) => {
      let newState = { ...prevState };
      newState.invoice = invoice;
      return newState;
    });

    notyf.success("Stripe Order Placed Successfully!");
  };

  const onAddSubError = (err) => {
    _logger(err);
    getSubscriptionBySesssionId(sessionId)
      .then(onGetSubSuccess)
      .catch(onGetSubError);
  };

  const moneyToDecimal = (moneyStr) => {
    moneyStr = moneyStr.toString();
    let decimal = moneyStr.length - 2;
    let newMoneyStr =
      "$" + moneyStr.slice(0, decimal) + "." + moneyStr.slice(-2);
    return newMoneyStr;
  };

  return successPage.isLoaded ? (
    <>
      <Container className="py-5 d-flex justify-content-center">
        <Card className="xl-col-8 lg-col-8 md-col-10 sm-col-11">
          <Card.Body className="mx-4">
            <Container>
              <p className="my-5 h1 text-center">Thank for your purchase</p>
              <Row>
                <div className="d-block mb-2">
                  <span className="text-black d-block">
                    {successPage.invoice.accountName}
                  </span>
                  <span className="text-black d-block">
                    Fairly User:{" "}
                    <span className="text-muted">
                      {successPage.currentSubscription.user.firstName +
                        " " +
                        successPage.currentSubscription.user.lastName}{" "}
                    </span>
                  </span>
                  <span className="text-black d-block">
                    Stripe Customer:{" "}
                    <span className="text-muted">
                      {successPage.invoice.customerName}
                    </span>
                  </span>
                  <span className="text-muted mt-1 d-block">
                    <span className="text-black">Invoice</span> #
                    {successPage.invoice.id}
                  </span>
                  <span className="text-black mt-1 d-block">
                    Status:{" "}
                    <span className="fw-bold">
                      {successPage.invoice.status}
                    </span>
                  </span>
                </div>
                {successPage.invoice.lines.map((line) => {
                  return (
                    <Row key={line.id}>
                      <hr />
                      <Col xl="10">
                        <p>{line.description}</p>
                      </Col>
                      <Col xl="2">
                        <p className="float-end">
                          {moneyToDecimal(line.amount)}
                        </p>
                      </Col>
                    </Row>
                  );
                })}
              </Row>
              <Row>
                <hr className="border border-dark" />
              </Row>
              <Row className="text-black">
                <Col xl="12">
                  <p className="float-end">
                    SubTotal: {moneyToDecimal(successPage.invoice.subtotal)}
                  </p>
                </Col>
                <Col xl="12">
                  <p className="float-end">
                    Tax:{" "}
                    {moneyToDecimal(
                      successPage.invoice.tax ? successPage.invoice.tax : "000"
                    )}
                  </p>
                </Col>
                <Col xl="12">
                  <p className="float-end fw-bold">
                    Total: {moneyToDecimal(successPage.invoice.total)}
                  </p>
                </Col>
                <hr className="border border-dark" />
                <Button className="mt-2" variant="outline">
                  <Link to={"/pricing"}>BACK</Link>
                </Button>
              </Row>
              <div className="text-center mt-5">
                <p>Fairly 2023 </p>
              </div>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </>
  ) : (
    <div className="container d-flex justify-content-center">
      <div className="col-6 mt-6">
        <h1>Processing Payment ...</h1>
        <ProgressBar animated now={100} />
      </div>
    </div>
  );
}

export default StripeOrderSuccessPage;

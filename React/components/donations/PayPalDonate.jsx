import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Container, Col, Row, Card, Button, Form } from "react-bootstrap";
import { getTypes } from "../../services/lookUpService";
import CurrencyInput from "react-currency-input-field";
import donationService from "../../services/donationService";
import toastr from "toastr";
import Swal from "sweetalert2";
const _logger = logger.extend("Donate");

const PayPalDonate = () => {
  const [pageData, setPageData] = useState({
    charitableFundId: "",
    customAmount: 0,
    funds: [],
    fundsComponent: [],
    payload: {
      charitableFundId: 0,
      OrderId: 0,
      UnitCost: 0,
    },
    units: {
      /*eslint camelcase: ["error", {properties: "never"}]*/
      purchase_units: [
        {
          amount: {
            value: 0,
          },
        },
      ],
    },
  });

  useEffect(() => {
    getTypes(["CharitableFunds"])
      .then(onGetFundsSuccess)
      .catch(onGetFundsError);
  }, []);

  const onGetFundsSuccess = (response) => {
    const funds = response.item.charitableFunds;
    setPageData((prevState) => {
      const update = { ...prevState };
      update.funds = funds;
      update.fundsComponent = funds.map(mapFunds);
      update.payload.charitableFundId = funds[0].id;
      return update;
    });
  };

  const mapFunds = (fund) => {
    return (
      <option value={fund.id} key={fund.name}>
        {fund.name}
      </option>
    );
  };

  const onGetFundsError = () => {
    toastr.error("There was an error getting the Funds", "Please Refresh");
  };

  const createOrder = (data, actions) => {
    return actions.order.create(pageData.units);
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(captureDetails);
  };

  const captureDetails = (details) => {
    const payload = pageData.payload;
    payload.OrderId = details.id;
    payload.UnitCost = parseInt(details.purchase_units[0].amount.value);
    donationService
      .createDonation(payload)
      .then(onCreateDonationSuccess)
      .catch(onCreateDonationError);
  };

  const onCreateDonationSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Donation Recieved!",
      text: "Thank you for the Donation!",
    });
  };

  const onCreateDonationError = (error) => {
    toastr.error("There was an error");
    _logger(error);
  };

  const onChange = (value) => {
    setPageData((prevState) => {
      const update = { ...prevState };
      update.customAmount = value;
      update.units.purchase_units[0].amount.value = value;
      return update;
    });
  };

  const onFundChange = (e) => {
    const value = e.target.value;
    setPageData((prevState) => {
      const update = { ...prevState };
      update.payload.charitableFundId = value;
      return update;
    });
  };

  const onValueClicked = (e) => {
    const amount = e.target.id;
    setPageData((prevState) => {
      const update = { ...prevState };
      update.units.purchase_units[0].amount.value = amount;
      return update;
    });
  };

  return (
    <Container className="mt-1">
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={8} md={8} className="py-8 py-xl-0">
          <Card>
            <Card.Header>
              <Card.Title>
                <h1 className="text-primary">Donations</h1>
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="d-flex justify-content-center">
                <Form.Group as={Col} className="m-3">
                  <Form.Label>Choose where to help!</Form.Label>
                  <Form.Select onChange={onFundChange}>
                    {pageData.fundsComponent}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row>
                <Col className="d-grid gap-1">
                  <Button
                    id="1"
                    variant={
                      pageData.units.purchase_units[0].amount.value === "1"
                        ? "primary"
                        : "outline-primary"
                    }
                    size="lg"
                    className="m-3"
                    onClick={onValueClicked}
                  >
                    1 $
                  </Button>
                  <Button
                    id="10"
                    variant={
                      pageData.units.purchase_units[0].amount.value === "10"
                        ? "primary"
                        : "outline-primary"
                    }
                    size="lg"
                    className="m-3"
                    onClick={onValueClicked}
                  >
                    10 $
                  </Button>
                  <Button
                    id="50"
                    variant={
                      pageData.units.purchase_units[0].amount.value === "50"
                        ? "primary"
                        : "outline-primary"
                    }
                    size="lg"
                    className="m-3"
                    onClick={onValueClicked}
                  >
                    50 $
                  </Button>
                </Col>
                <Col className="d-grid gap-2">
                  <Button
                    id="5"
                    variant={
                      pageData.units.purchase_units[0].amount.value === "5"
                        ? "primary"
                        : "outline-primary"
                    }
                    size="lg"
                    className="m-3"
                    onClick={onValueClicked}
                  >
                    5 $
                  </Button>
                  <Button
                    id="20"
                    variant={
                      pageData.units.purchase_units[0].amount.value === "20"
                        ? "primary"
                        : "outline-primary"
                    }
                    size="lg"
                    className="m-3"
                    onClick={onValueClicked}
                  >
                    20 $
                  </Button>
                  <Button
                    variant={
                      pageData.units.purchase_units[0].amount.value ===
                        pageData.customAmount &&
                      pageData.units.purchase_units[0].amount.value
                        ? "primary"
                        : "outline-primary"
                    }
                    size="lg"
                    className="m-3"
                  >
                    <CurrencyInput
                      id="customAmount"
                      name="customAmount"
                      className="form-control"
                      prefix="$"
                      placeholder="Enter a custom amount"
                      allowDecimals={false}
                      onValueChange={onChange}
                      allowNegativeValue={false}
                    />
                  </Button>
                </Col>
              </Row>
              <PayPalScriptProvider
                options={{
                  "client-id": process.env.REACT_APP_TEMP_PAYPAL_CLIENT_ID,
                }}
              >
                <PayPalButtons
                  style={{ shape: "pill" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                  disabled={
                    !pageData.units.purchase_units[0].amount.value ||
                    pageData.units.purchase_units[0].amount.value === "0"
                  }
                />
              </PayPalScriptProvider>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PayPalDonate;

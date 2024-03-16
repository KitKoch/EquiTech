import React, { useState, useEffect } from "react";
import { Badge, Card, Col, Container, Row, Tab } from "react-bootstrap";
import CheckOutButton from "../../components/stripe/CheckOutButton";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import {
  getSubscriptions,
  getCurrentSubscription,
} from "../../services/stripeService";
import essentialImage from "../../assets/img/subscriptionPlans/essential.png";
import standardImage from "../../assets/img/subscriptionPlans/standard.png";
import premiumImage from "../../assets/img/subscriptionPlans/premium.png";
const _logger = logger.extend("pricing");

const Pricing = () => {
  const notyf = new Notyf();

  const [pricingPage, setPricingPage] = useState({
    subscriptionPlans: null,
    planComponents: null,
    activePlan: null,
    planImages: {
      essential: essentialImage,
      standard: standardImage,
      premium: premiumImage,
    },
  });

  useEffect(() => {
    getSubscriptions().then(onGetSubsScuccess).catch(onGetSubsError);
    getCurrentSubscription()
      .then(ongetCurrentPlanSuccess)
      .catch(ongetCurrentPlanError);
  }, []);

  useEffect(() => {
    if (pricingPage.subscriptionPlans) {
      setPricingPage((prevState) => {
        let newState = { ...prevState };
        newState.planComponents = pricingPage.subscriptionPlans.map(
          subscriptionCardMapper
        );
        return newState;
      });
    }
  }, [pricingPage.subscriptionPlans, pricingPage.activePlan]);

  const ongetCurrentPlanSuccess = (res) => {
    const subscription = res.data.item;
    setPricingPage((prevState) => {
      let newState = { ...prevState };
      newState.activePlan = subscription;
      return newState;
    });
  };

  const ongetCurrentPlanError = (err) => {
    _logger(err);
    notyf.error("Current Plan Not Found");
  };

  const onGetSubsError = (err) => {
    _logger(err);
    notyf.error("Error: Failed to retrive Plan Data. RELOAD");
  };

  const onGetSubsScuccess = (res) => {
    const subscriptionsInfo = res.data.item;
    setPricingPage((prevState) => {
      let newState = { ...prevState };
      newState.subscriptionPlans = subscriptionsInfo;
      return newState;
    });
  };

  const subscriptionCardMapper = (planInfo) => {
    let isCurrentPlan =
      pricingPage.activePlan &&
      pricingPage.activePlan?.product?.name === planInfo.name;

    return (
      <Col key={planInfo.productId} sm="4" className="mb-3 mb-md-0">
        <Card
          className={
            isCurrentPlan
              ? "text-center h-100 border border-primary"
              : "text-center h-100"
          }
        >
          {isCurrentPlan ? (
            <span className="fw-bold h2 position-absolute">
              <Badge className="col-12 float-end">Subscribed</Badge>
            </span>
          ) : (
            ""
          )}

          <Card.Img
            className="p-6 pb-0 pt-3"
            src={pricingPage.planImages[planInfo.name.toLowerCase()]}
          ></Card.Img>
          <Card.Body className="d-flex flex-column">
            <div className="mb-4">
              <h5>{planInfo.name} Plan</h5>
              <span className="display-4">$ {planInfo.amount}</span>
              <span>/mo</span>
            </div>
            <h6>Includes:</h6>
            <ul className="list-unstyled">
              <li className="mb-2">1 Plan Perk</li>
              <li className="mb-2">5 Plan Perk</li>
              <li className="mb-2">5 GB Plan Perk</li>
            </ul>
            <div className="mt-auto">
              <CheckOutButton
                priceId={planInfo.priceId}
                text={
                  isCurrentPlan
                    ? "Subscribed"
                    : pricingPage.activePlan
                    ? "Update Plan"
                    : "Subscribe"
                }
                isActive={isCurrentPlan ? false : true}
                isUpdate={
                  isCurrentPlan || !pricingPage.activePlan ? false : true
                }
              />
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  return (
    <React.Fragment>
      <Container fluid className="p-0 mt-6">
        <Row>
          <Col md="10" xl="8" className="mx-auto">
            <h1 className="text-center">We have a plan for everyone</h1>
            <p className="lead text-center mb-4">
              Whether you are a business or an individual, we have a plan for
              you.
            </p>
            <h1 className="h3 mt-3">Plans & Pricing</h1>
            <Tab.Container id="pricing-tabs" activeKey={"monthly"}>
              <Tab.Content>
                <Tab.Pane eventKey="monthly">
                  <Row className="py-4">
                    {pricingPage.subscriptionPlans &&
                      pricingPage.planComponents}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>

            <hr />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Pricing;

import React from "react";
import {
  createSubscriptionSession,
  updateSubscription,
} from "../../services/stripeService";
import { loadStripe } from "@stripe/stripe-js";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const _logger = logger.extend("checkout");

const STRIPE_PUB_KEY = process.env.REACT_APP_TEMP_STRIPE_PK_TEST;
const stripePromise = loadStripe(STRIPE_PUB_KEY);

function CheckOutButton({ priceId, text, isActive, isUpdate }) {
  const notyf = new Notyf();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const payload = { priceId: priceId };
    let text1 = null;
    if (isUpdate) {
      text1 = "Do you want to update your subscription?";
    } else {
      text1 = "Do you want to start a subscription?";
    }
    Swal.fire({
      title: text1,
      text: "Confirm",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#B33A3A",
      confirmButtonText: "Yes",
    }).then((result) => {
      _logger(isUpdate);
      if (result.isConfirmed) {
        if (isUpdate) {
          updateSubscription(payload)
            .then(onUpdateSubscriptionSuccess)
            .catch(addSessionError);
        } else {
          createSubscriptionSession(payload)
            .then(addSessionSuccess)
            .catch(addSessionError);
        }
      }
    });
  };

  const onUpdateSubscriptionSuccess = () => {
    notyf.success("Subscription Udated!");
    setTimeout(() => {
      navigate("/order/success");
    }, 1500);
  };

  const addSessionSuccess = async (res) => {
    notyf.success("Stripe Session Success");
    const sessionId = res.data.item;
    const stripe = await stripePromise;
    const options = { sessionId: sessionId };
    stripe.redirectToCheckout(options);
  };

  const addSessionError = (err) => {
    _logger(err);
    notyf.error("Stripe Action Failed");
  };

  return isActive ? (
    <Button size="lg" variant="outline-primary" onClick={handleCheckout}>
      {text}
    </Button>
  ) : (
    <Button size="lg" variant="outline-primary" disabled>
      {text}
    </Button>
  );
}
CheckOutButton.propTypes = {
  priceId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isUpdate: PropTypes.bool.isRequired,
};

export default CheckOutButton;

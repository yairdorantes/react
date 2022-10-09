import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { helpHttp } from "../helpers/helpHttp";
const stripePromise = loadStripe(
  "pk_test_51KjBqNA9KCn8yVMOEG2TF4LAS9CZwMVfMuAIHu1opMaabVxmgUri9qkETyQ9Q7DGyB6g9bNxEg62zf6dsqQZGdij00t1hmBwwH"
);
const Stripe = () => {
  const handleSubmit = async () => {
    const stripe = await stripePromise;
    const session = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: "price_1Lnye9A9KCn8yVMOdR9IBuEE",
          quantity: "1",
        },
      ],
      mode: "payment",
      successUrl: "http://localhost:3000/menu",
    });
    console.log(session);
  };
  return (
    <>
      <form
        action="http://127.0.0.1:8000/api/checkout/"
        method="POST"
        // onSubmit={handleSubmit}
        className="card card-body"
      >
        <div className="form-group"></div>
        <input type="text" defaultValue={"yair"} />
        <button onClick={handleSubmit} className="btn btn-success">
          buy
        </button>
      </form>
    </>
  );
};

export default Stripe;

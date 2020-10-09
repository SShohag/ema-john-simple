import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardFrom from "./SimpleCardFrom";
import SplitCardFrom from "./SplitCardFrom";

const stripePromise = loadStripe("pk_test_51Ha424E7WxfT1ez3iutxV1oQNm7T9KMv0Ta6kilO08xQpUz00l4oaqxiSHUOcAcUBnwKM2bBjoJwETZGRfVMjvMf00LjNhxbRJ");

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardFrom handlePayment={handlePayment} ></SimpleCardFrom>
    </Elements>
  );
};

export default ProcessPayment;

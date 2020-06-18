import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobilePay from "./MobilePay";
import CardPayment from "./CardPayment";
import { Button } from "./Buttons";

export default function Payment(props) {
  const { orders, user, totalAmount } = props;
  const [paymentMethod, setpaymentMethod] = useState();

  function handleChange(event) {
    const { value } = event.target;
    setpaymentMethod(value);
  }
  function setPaymentOptionDisplay(paymentOption) {
    return paymentMethod === paymentOption ? "show" : "hide";
  }
  return (
    <div className="paymentWrapper">
      <h2 className="page-title">Payment method</h2>
      <form className="optionsForPayment">
        <input
          id="mobpay"
          type="radio"
          name="payment"
          value="Mobile Pay"
          checked={paymentMethod === "Mobile Pay"}
          onChange={handleChange}
        />
        <label htmlFor="mobpay" className=" mobpay">
          <img
            className="mobPay"
            src={require("../assets/payment/mobpayicon.png")}
            alt="Mobilepay"
          />
        </label>
        <input
          id="card"
          type="radio"
          name="payment"
          value="Card payment"
          checked={paymentMethod === "Card payment"}
          onChange={handleChange}
        />
        <label htmlFor="card" className="card">
          <img
            src={require("../assets/payment/mastercard.svg")}
            alt="Mastercard"
          />{" "}
          <img src={require("../assets/payment/visa.svg")} alt="Visa" />
        </label>
      </form>
      <div
        className={"mobile"}
        data-show={setPaymentOptionDisplay("Mobile Pay")}>
        <MobilePay totalAmount={totalAmount} />
      </div>
      <div
        className="carPayment"
        data-show={setPaymentOptionDisplay("Card payment")}>
        <CardPayment
          orders={orders}
          user={user}
          paymentMethod={paymentMethod}
          totalAmount={totalAmount}
          history={props.history}
        />
      </div>

      <div
        className="paymentBackBtn"
        style={{ display: !paymentMethod ? "flex" : "none" }}>
        <Link
          to={{
            pathname: `/details`,
            state: {
              orders: orders,
              user: user,
            },
          }}>
          <Button
            children={"Go back"}
            type={"button"}
            buttonStyle={"btn--secondary--solid"}
          />
        </Link>
      </div>

      <div
        className="payment-buttons NavigationButtons"
        style={{
          display:
            !paymentMethod || paymentMethod === "Card payment"
              ? "none"
              : "flex",
        }}>
        <Link
          to={{
            pathname: `/details`,
            state: {
              orders: orders,
              user: user,
            },
          }}>
          <Button
            type="button"
            buttonStyle="btn--secondary--solid"
            value="go back">
            Go Back
          </Button>
        </Link>
        <Link
          to={{
            pathname: `/confirmation`,
            state: {
              orders: orders,
              user: user,
              paymentMethod: paymentMethod,
              totalAmount: totalAmount,
            },
          }}>
          <Button
            type="button"
            buttonStyle="btn--primary--solid"
            value="Next"
            style={{
              display: paymentMethod === "Mobile Pay" ? "block" : "none",
            }}>
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
}

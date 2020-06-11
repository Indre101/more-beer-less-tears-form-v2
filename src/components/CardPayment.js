import React, { useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Payment from "payment";
import { Link } from "react-router-dom";
import { Button } from "./Buttons";
import gsap from "gsap";
export default function CardPayment(props) {
  const [cardDetail, setcardDetail] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focus: "",
    formData: null,
  });

  const [isFormValid, setisFormValid] = useState({
    number: false,
    name: false,
    expiry: false,
    cvc: false,
  });

  const cardFom = useRef();

  function handleInputFocus(event) {
    const { name } = event.target;
    setcardDetail((prevInputData) => ({
      ...prevInputData,
      focus: name,
    }));
  }

  //sets the form fields and formats the values in the input to look properly
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "number") {
      Payment.formatCardNumber(document.querySelector(".cardNumber"));
    } else if (name === "cvc") {
      //limits to 4 characters
      Payment.formatCardCVC(document.querySelector(".cvc"));
    }
    setcardDetail((prevInputData) => ({ ...prevInputData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formInputs = [...cardFom.current.children];

    formInputs.forEach((item) => {
      //check form regulat validation wheather the required fields are filled
      if (item.hasAttribute("value") && item.checkValidity()) {
        chechCustomValidation(item);
      } else if (item.hasAttribute("value") && !item.checkValidity()) {
        showInputErrors(item);
      }
    });
  }

  useEffect(() => {
    const sth = Object.values(isFormValid).every(
      (validationField) => validationField
    );

    if (sth) {
      props.history.push({
        pathname: `/confirmation`,
        state: {
          orders: props.orders,
          user: props.user,
          paymentMethod: props.paymentMethod,
          totalAmount: props.totalAmount,
        },
      });
    }
  }, [
    isFormValid,
    props.history,
    props.orders,
    props.paymentMethod,
    props.totalAmount,
    props.user,
  ]);

  function chechCustomValidation(item) {
    ///check the custom validation
    if (!Payment.fns.cardType(cardDetail.number) && item.id === "number") {
      //checks if the card is a visa or mastercard or ...
      showInputErrors(item);
    } else if (
      cardDetail.number.split(" ").join("").length < 16 &&
      item.id === "number"
    ) {
      showInputErrors(item);

      //checks the length of the card number
    } else if (
      !Payment.fns.validateCardCVC(cardDetail.cvc) &&
      item.id === "cvc"
    ) {
      //checks the CVC validation
      showInputErrors(item);
    } else if (
      !Payment.fns.validateCardExpiry(cardDetail.expiry) &&
      item.id === "expiry"
    ) {
      //checks the expiration date
      showInputErrors(item);
    } else {
      setisFormValid((prevInputData) => ({
        ...prevInputData,
        [item.name]: true,
      }));

      hideInputErrors(item);
    }
  }

  function showInputErrors(cardInput) {
    cardInput.nextSibling.dataset.borderchange = "showError";
    cardInput.dataset.borderchange = "showError";

    gsap.fromTo(cardInput.nextSibling, { y: -23 }, { y: -18, duration: 1 });
  }

  function hideInputErrors(cardInput) {
    cardInput.nextSibling.dataset.borderchange = "hideError";
    cardInput.dataset.borderchange = "hideError";

    // cardInput.style.borderColor = "black";
  }

  useEffect(() => {
    cardFom.current.noValidate = true;
  }, [cardFom]);

  return (
    <div id="PaymentForm">
      <Cards
        number={cardDetail.number}
        name={cardDetail.name}
        expiry={cardDetail.expiry}
        cvc={cardDetail.cvc}
        focused={cardDetail.focus}
      />

      <form
        autoComplete="on"
        className="cardForm"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        ref={cardFom}>
        <input
          id="number"
          className="cardNumber cc-number"
          type="tel"
          name="number"
          placeholder="Card Number"
          value={cardDetail.number}
          required
          onChange={handleChange}
          onFocus={handleInputFocus}
        />

        <div className="error">Please insert a valid Card number</div>

        <input
          id="name"
          type="text"
          name="name"
          placeholder="Full Name"
          pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
          value={cardDetail.name}
          onChange={handleChange}
          onFocus={handleInputFocus}
          required
        />

        <div className="error">Please insert a name</div>

        <input
          id="expiry"
          className="expiry"
          type="text"
          name="expiry"
          placeholder="MM/YY"
          value={cardDetail.expiry}
          required
          onChange={(event) => {
            const { value } = event.target;
            Payment.formatCardExpiry(document.querySelector(".expiry"));
            setcardDetail((prevInputData) => ({
              ...prevInputData,
              expiry: value.split("").join("").replace(/ /g, ""),
            }));
          }}
          onFocus={handleInputFocus}
        />
        <div className="error">Please insert valid date</div>

        <input
          id="cvc"
          type="tel"
          name="cvc"
          className="cvc"
          placeholder="CVC"
          value={cardDetail.cvc}
          onChange={handleChange}
          required
          onFocus={handleInputFocus}
        />
        <div className="error">Please insert valid CVC</div>

        <div style={{ display: "flex" }}>
          <Link
            to={{
              pathname: `/details`,
              state: {
                orders: props.orders,
                user: props.user,
              },
            }}>
            <Button
              children={"Go back"}
              type={"button"}
              buttonStyle={"btn--primary--solid"}
            />
          </Link>

          <Button
            children={"Next"}
            type={"submit"}
            buttonStyle={"btn--secondary--solid"}
            // onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

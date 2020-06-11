import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Buttons";

import "../App.scss";
import gsap from "gsap";

function Details(props) {
  const { orders, setuserInfo, userInfo } = props;
  const cardForm = useRef();
  function handleChange(event) {
    const { name, value } = event.target;
    setuserInfo((prevInputData) => ({ ...prevInputData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formInputs = [...cardForm.current.children];
    if (!cardForm.current.checkValidity()) {
      formInputs.forEach((item) => {
        //check form regulat validation wheather the required fields are filled
        if (item.hasAttribute("value") && !item.checkValidity()) {
          showInputErrors(item);
        } else {
          formInputs.forEach((item) => {
            if (item.hasAttribute("value") && item.checkValidity()) {
              hideInputErrors(item);
            }
          });
        }
      });
    } else {
      openPaymentPage();
    }
  }

  function showInputErrors(detailsInput) {
    detailsInput.nextSibling.dataset.borderchange = "showError";
    detailsInput.dataset.borderchange = "showError";

    gsap.fromTo(detailsInput.nextSibling, { y: -23 }, { y: -18, duration: 1 });
  }

  function hideInputErrors(detailsInput) {
    detailsInput.nextSibling.dataset.borderchange = "hideError";
    detailsInput.dataset.borderchange = "hideError";
  }

  useEffect(() => {
    cardForm.current.noValidate = true;
  }, []);

  function openPaymentPage() {
    props.history.push({
      pathname: `/payment`,
      state: {
        orders: props.orders,
        user: props.user,
        totalAmount: props.totalAmount,
      },
    });
  }

  return (
    <div className="main-wrapper">
      <>
        <form
          autoComplete="on"
          className="cardForm"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
          ref={cardForm}>
          <label>
            <h2>Name</h2>
          </label>
          <input
            id="name"
            className="nameInput"
            placeholder="John Smith"
            type="text"
            pattern="^[a-zA-Z]+( [a-zA-Z]+)*$"
            onChange={handleChange}
            autoComplete="name"
            name="name"
            value={props.userInfo.name}
            required
          />

          <div className="error">Please insert a name</div>
          <label>
            <h2>Phone number</h2>
          </label>
          <input
            id="phone"
            className="phoneInput"
            placeholder="+45 00 00 00 00"
            type="text"
            pattern="^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*.{6,}$"
            onChange={handleChange}
            name="phone"
            value={props.userInfo.phone}
            required
          />

          <div className="error">Please insert a phone number</div>
          <div style={{ display: "flex" }}>
            <Link
              to={{
                pathname: `/cart`,
                state: {
                  orders: orders,
                  user: userInfo,
                },
              }}>
              <Button
                className="btn btn--primary--solid"
                value="GO BACK"
                children={"Go back"}
                type={"button"}
                buttonStyle={"btn--primary--solid"}
              />
            </Link>
            <Button
              className="btn btn--secondary--solid"
              value="NEXT"
              children={"Next"}
              type={"submit"}
              buttonStyle={"btn--secondary--solid"}
            />
          </div>
        </form>
      </>
    </div>
  );
}

export default Details;

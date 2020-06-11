import React, { useEffect } from "react";
import "../App.scss";
import BeerItemInCart from "./BeerItemInCart";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Button } from "./Buttons";
function Cart(props) {
  const beerOrders = props.orders
    .filter((order) => order.amount !== 0)
    .map((order) => (
      <BeerItemInCart
        key={order.name}
        order={order}
        setorder={props.setorder}
        orders={props.orders}
      />
    ));

  useEffect(() => {
    gsap.to(".cartBeerSinlge", {
      duration: 1,
      y: 0,
      opacity: 1,
      stagger: 0.5,
    });
  });
  return (
    <div className="main-wrapper cart">
      <div
        className="no-order-message"
        style={{ display: props.orders.length === 0 ? "flex" : "none" }}>
        <h2 className="no-order-title">Please add some beers to your cart</h2>
      </div>

      <div
        className="orders"
        style={{ display: props.orders.length !== 0 ? "flex" : "none" }}>
        {beerOrders}
      </div>

      <div
        className="totalToPAy"
        style={{ display: props.orders.length !== 0 ? "flex" : "none" }}>
        <h2>TOTAL</h2>
        <h2>{props.totalAmount}kr </h2>
      </div>
      <Link
        to={{
          pathname: `/details`,
          state: { totalAmount: props.totalAmount },
        }}
        style={{ display: props.orders.length === 0 ? "none" : "flex" }}>
        <Button type="button" buttonStyle="btn--primary--solid">
          Checkout
        </Button>
      </Link>
    </div>
  );
}
export default Cart;

import React from "react";
import "../App.scss";
import { Link } from "react-router-dom";

function Nav(props) {
  const amountOfitems = props.orders
    .map((item) => item.amount)
    .reduce((prev, next) => prev + next, 0);

  function wibble() {
    if (amountOfitems === 0) {
      return;
    } else {
    }
  }

  wibble();

  return (
    <nav>
      <ul className="nav-links">
        <Link to="/">
          <li>Shop</li>
        </Link>
        <Link to="/cart">
          <li className="cart-li">
            <img
              className="cart-img"
              src={require("../assets/svg/cart.svg")}
              alt="Cart"
            />
            <div
              className={`item-count ${
                amountOfitems === 0 ? "none" : "cart-item-anim"
              }`}
              style={{ display: amountOfitems === 0 ? "none" : "flex" }}>
              <h4>{amountOfitems}</h4>
            </div>
          </li>
        </Link>
      </ul>
    </nav>
  );
}

Nav.defaultProps = {
  orders: [0, 0],
};

export default Nav;

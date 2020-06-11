import React from "react";

export default function MobilePay(props) {
  return (
    <div className="mobilePay">
      <div className="amount">
        <h2>{props.totalAmount}kr</h2>
      </div>
      <img src={require("../assets/svg/foobar_logo.svg")} alt="Logo" />
      <h4>Mobile-pay user</h4>
      <h3>FooBar</h3>
    </div>
  );
}

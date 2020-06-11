import React from "react";
import "../App.scss";

const styles = [
  "btn--primary--solid",
  "btn--primary--outline",
  "btn--secondary--solid",
  "btn--success--solid",
  "btn--counter--outline",
];

export const Button = ({ children, type, onClick, buttonStyle }) => {
  const checkButtonStyle = styles.includes(buttonStyle)
    ? buttonStyle
    : styles[0];

  return (
    <div>
      <button
        onClick={onClick}
        className={`btn ${checkButtonStyle}`}
        type={type}>
        {children}
      </button>
    </div>
  );
};

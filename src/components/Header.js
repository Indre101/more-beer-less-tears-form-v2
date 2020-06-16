import React, { useEffect } from "react";
import "../App.scss";
import gsap from "gsap";
import { Link } from "react-router-dom";

function Header() {
  useEffect(() => {
    gsap.from(".animFoam", { duration: 1, y: 30, opacity: 0, stagger: 0.8 });
  }, []);
  return (
    <div className="site-header">
      <div className="header-background animFoam">
        <Link to="/">
          <div className="logo-container">
            <img
              className="foobar-logo"
              src={require("../../src/assets/svg/foobar_logo.svg")}
              alt="Foobar logo"
            />
          </div>
        </Link>
      </div>
      <div className="cloud-top animFoam">
        <img
          className="cloud"
          src={require("../../src/assets/svg/cloud.svg")}
          alt="cloud"
        />
      </div>
    </div>
  );
}

export default Header;

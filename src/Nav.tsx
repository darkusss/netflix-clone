import React, { useEffect, useState } from "react";
import "./Nav.css";

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    const handleBackgroundOnScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };
    window.addEventListener("scroll", handleBackgroundOnScroll);

    return (): void => {
      console.log("listener is destroyed");
      window.removeEventListener("scroll", handleBackgroundOnScroll);
    };
  }, []);
  return (
    <div className={"nav " + (show && "nav__black")}>
      <img
        className="nav__logo"
        src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2017%2F05%2FNetflix-Logo.png&f=1&nofb=1"
        alt="Netflix logo"
      />
    </div>
  );
};

export default Nav;

import "./App.scss";
import React from "react";
import { ReactComponent as Logo } from "./theme.svg";

const Header = () => {
  const handleTheme = () => {
    const body = document.body;
    const wasDarkMode = localStorage.getItem("darkmode") === "true";

    localStorage.setItem("darkmode", !wasDarkMode);
    body.classList.toggle("darkmode", !wasDarkMode);
  };

  return (
    <header>
      <div className="container__header">
        <img src="../logo.svg" className="logo" alt="logo" />
        <button onClick={handleTheme} className="switch-theme">
          <Logo alt="theme" />
        </button>
      </div>
    </header>
  );
};

export default Header;

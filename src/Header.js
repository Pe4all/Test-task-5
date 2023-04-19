import "./App.scss";
import React from "react";
import { ReactComponent as Theme } from "./theme.svg";
import { ReactComponent as Logo } from "./logo.svg";

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
        <Logo alt="logo" />
        <button onClick={handleTheme} className="switch-theme">
          <Theme alt="theme" />
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import styles from "./Header.module.css";
import { useState, useContext } from "react";
import { ThemeContext } from "./../contexts/ThemeContext";

function Header() {
  const [isDark, setIsDark] = useContext(ThemeContext);


  function handleThemeChange() {
    setIsDark(!isDark);
    localStorage.setItem("isDark", JSON.stringify(!isDark));
  }
  if (isDark) {
    document.querySelector("body").classList.add("dark");
  } else {
    document.querySelector("body").classList.remove("dark");
  }

  return (
    <>
      <header className={styles["header-container"]}>
        <div className={styles["header-content"]}>
          <a href="index.html" className={styles["logo"]}>
            Where in the world?
          </a>
          <p className={styles["mode-type"]} onClick={handleThemeChange}>
            <i className={`fa-solid fa-${isDark ? "sun" : "moon"}`}></i>
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </p>
        </div>
      </header>
    </>
  );
}

export default Header;

import { useState, useEffect } from "react";
import styles from "./Dropdown.module.css";

function Dropdown({ setFilterRegion, inputText }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("Filter by Region");

  function handleDropdownMenu() {
    setIsOpen(!isOpen);
  }

  console.log(inputText, "in dropdown");

  function handleOption(e) {
    setFilterRegion(e.currentTarget.innerText);

    setFilter(e.currentTarget.innerText);
    // setInputText("");

    console.log("i am filter");
  }

  useEffect(
    function () {
      console.log("working");
      setFilter("Filter by Region");
    },
    [inputText]
  );

  return (
    <>
      <div
        className={styles["dropdown-container"]}
        onClick={handleDropdownMenu}
      >
        <span className="filter">{filter}</span>
        <i className="fa-solid fa-chevron-down"></i>
        <ul
          className={
            isOpen ? styles["dropdown-menu-open"] : styles["dropdown-menu"]
          }
        >
          <li onClick={handleOption}>Asia</li>
          <li onClick={handleOption}>Europe</li>
          <li onClick={handleOption}>Africa</li>
          <li onClick={handleOption}>Oceania</li>
          <li onClick={handleOption}>Americas</li>
          <li onClick={handleOption}>Antarctic</li>
        </ul>
      </div>
    </>
  );
}

export default Dropdown;

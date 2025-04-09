import React from "react";
import styles from "./Search.module.css";
import { useState } from "react";

function Search({ handleCountriesData }) {
  const [input, setInput] = useState("");

  function handleInputChange(e) {
    e.currentTarget.value = e.currentTarget.value.trimStart();
    console.log(e.currentTarget.value);
    handleCountriesData(e.currentTarget.value);
  }
  return (
    <>
      <div className={styles["input-container"]}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for a country..."
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}

export default Search;

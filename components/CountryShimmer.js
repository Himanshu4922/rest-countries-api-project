import React from "react";
import styles from "./CountryShimmer.module.css";

function CountryShimmer() {
  return (
    <>
      <div className={styles["part1"]}></div>
      <div className={styles["part2"]}>
        <h1 className={styles["heading"]}></h1>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </>
  );
}

export default CountryShimmer;

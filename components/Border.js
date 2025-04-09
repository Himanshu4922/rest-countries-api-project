import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import styles from "./Border.module.css";

function Border({ border }) {
  const [borderCountryData, setBorderCountryData] = useState(null);

  useEffect(function () {
    fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      .then(function (response) {
        return response.json();
      })
      .then(function ([country]) {
        setBorderCountryData(country);
        console.log(country);
      });
  }, []);

  return (
    <>
      {borderCountryData && (
        <Link className={styles["linktag"]} to={`/${encodeURIComponent(borderCountryData.name.official)}`}>
          {borderCountryData.name?.common}
        </Link>
      )}
    </>
  );
}

export default Border;

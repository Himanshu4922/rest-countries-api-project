import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import styles from "./Country.module.css";
import {
  useParams,
  useLocation,
  useOutletContext,
  useNavigate,
} from "react-router";
import Border from "./Border";
import CountryShimmer from "./CountryShimmer";
// import { ThemeContext } from "./../contexts/ThemeContext";
import { useThemeContext } from "./../hooks/useThemeContext";

function Country() {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const searchParams = new URLSearchParams(window.location.search);
  // const countryName = searchParams.get("name");
  const countryName = useParams();
  // const isDark = useOutletContext();

  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location);
  // const [isDark, setIsDark] = useContext(ThemeContext);
  const [isDark, setIsDark] = useThemeContext();

  useEffect(
    function () {
      if (location.state) {
        setCountryData(location.state);
        setLoading(false);
        window.scrollTo(0, 0);
      } else {
        fetch(
          `https://restcountries.com/v3.1/name/${countryName.country}?fullText=true`
        )
          .then(function (response) {
            if(!response.ok){
              throw new Error("Network Error")
            }
            return response.json();
          })
          .then(function ([country]) {
            setCountryData(country);
            setLoading(false);
          })
          .catch(function (error) {
            setLoading(false);
            console.log(Error);
            navigate("/");
          });
        window.scrollTo(0, 0);
      }
    },
    [countryName.country, location.state]
  );

  if (loading) {
    return (
      <>
        <main className={`${isDark ? "dark" : ""}`}>
          <div className={styles["details-and-btn-container"]}>
            <p className={styles["back-btn"]} onClick={() => history.back()}>
              <i className="fa-solid fa-arrow-left-long"></i>Back
            </p>
            <div className={styles["details-and-img-container"]}>
              <CountryShimmer />
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    countryData && (
      <>
        <main className={`${isDark ? "dark" : ""}`}>
          <div className={styles["details-and-btn-container"]}>
            <p className={styles["back-btn"]} onClick={() => history.back()}>
              <i className="fa-solid fa-arrow-left-long"></i>Back
            </p>
            <div className={styles["details-and-img-container"]}>
              <img
                src={countryData.flags?.svg}
                alt={countryData.name?.common}
              />
              <div className={styles["details"]}>
                <h2>{countryData.name?.common}</h2>
                <div className={styles["normal-details"]}>
                  <p>
                    Native Name:{" "}
                    <span className={styles["native-name"]}>
                      {countryData.name?.common}
                    </span>
                  </p>
                  <p>
                    Population:{" "}
                    <span className={styles["population"]}>
                      {countryData.population?.toLocaleString("en-In")}
                    </span>
                  </p>
                  <p>
                    Region:{" "}
                    <span className={styles["region"]}>
                      {countryData?.region}
                    </span>
                  </p>
                  <p>
                    Sub Region:{" "}
                    <span className={styles["sub-region"]}>
                      {countryData?.subregion}
                    </span>
                  </p>
                  <p>
                    Capital:{" "}
                    <span className={styles["capital"]}>
                      {countryData?.capital?.join(", ")}
                    </span>
                  </p>
                </div>
                <div className={styles["more-details"]}>
                  <p>
                    Top Level Domains:{" "}
                    <span className={styles["tld"]}>
                      {countryData.tld?.join(", ")}
                    </span>
                  </p>
                  <p>
                    Currencies:{" "}
                    <span className={styles["currencies"]}>
                      {Object.keys(
                        countryData?.currencies === undefined
                          ? {}
                          : countryData.currencies
                      )?.join(", ")}
                    </span>
                  </p>
                  <p>
                    Languages:{" "}
                    <span className={styles["languages"]}>
                      {Object.values(
                        countryData?.languages === undefined
                          ? {}
                          : countryData.languages
                      )?.join(", ")}
                    </span>
                  </p>
                </div>
                {countryData?.borders?.length !== undefined && (
                  <p className={styles["border-countries"]}>
                    Border Countries:{" "}
                    {countryData.borders.map(function (border) {
                      fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                        .then((resp) => resp.json())
                        .then((data) => data);
                      return <Border border={border} key={border} />;
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  );
}

export default Country;

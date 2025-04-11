import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import styles from "./Country.module.css";
import { useParams, useLocation, useNavigate } from "react-router";
import Border from "./Border";
import CountryShimmer from "./CountryShimmer";
import { useThemeContext } from "./../hooks/useThemeContext";

function Country() {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const countryName = useParams();
  const location = useLocation();
  const [isDark, setIsDark] = useThemeContext();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(false);

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
            if (!response.ok) {
              throw new Error("Network Error");
            }
            return response.json();
          })
          .then(function ([country]) {
            setCountryData(country);
            setLoading(false);
          })
          .catch(function (error) {
            setLoading(false);
            setError(true);
          });
        window.scrollTo(0, 0);
      }
    },
    [countryName.country, location.state, retryTrigger]
  );

  if (loading) {
    return (
      <>
        <main>
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

  if (error) {
    return (
      <>
        <main>
          <div className={styles["details-and-btn-container"]}>
            <p className={styles["back-btn"]} onClick={() => history.back()}>
              <i className="fa-solid fa-arrow-left-long"></i>Back
            </p>
            <div className={styles["details-and-img-container"]}>
              <div className={styles["error-box"]}>
                <h2 className={styles["error-title"]}>
                  Oops! Something went wrong.
                </h2>
                <p className={styles["error-message"]}>
                  We couldn’t load the country data. Please check your
                  connection or try again later.
                </p>
                <button
                  className={styles["retry-button"]}
                  onClick={() => {
                    setRetryTrigger((prev) => !prev);
                    setError(false);
                  }}
                >
                  Retry
                </button>
                <button>Go to Home</button>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    countryData && (
      <>
        <main>
          <div className={styles["details-and-btn-container"]}>
            <p className={styles["back-btn"]} onClick={() => history.back()}>
              <i className="fa-solid fa-arrow-left-long"></i>Back
            </p>
            <div className={styles["details-and-img-container"]}>
              <div className={styles["flag-container"]}>
                <img
                  src={countryData.flags?.svg}
                  alt={countryData.name?.common}
                />
              </div>
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

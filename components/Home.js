import React from "react";
import { useState, useEffect, useContext } from "react";
import styles from "./Home.module.css";
import Card from "./Card";
import Search from "./Search";
import Dropdown from "./Dropdown";
import { Link, useOutletContext, useNavigate } from "react-router";
import CountriesShimmer from "./CountriesShimmer";
import { useThemeContext } from "./../hooks/useThemeContext";

function Home() {
  const [inputText, setInputText] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRegion, setFilterRegion] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [error, setError] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(false);

  function handleCountriesData(input) {
    setInputText(input);
  }

  const [isDark, setIsDark] = useThemeContext();

  useEffect(
    function () {
      fetch("https://restcountries.com/v3.1/all")
        .then(function (resp) {
          if (!resp.ok) {
            throw new Error("Network error");
          }
          return resp.json();
        })
        .then(function (data) {
          setCountries(
            data.filter(function (country) {
              return (
                country.name.common
                  .toLowerCase()
                  .includes(inputText.toLowerCase()) ||
                country.region.toLowerCase().includes(inputText.toLowerCase())
              );
            })
          );
          setAllCountries(data);

          setLoading(false);
          window.scrollTo(0, 0);
        })
        .catch(function (error) {
          console.log("Error in fetching data", error);
          setLoading(false);
          setError(true);
        });
    },
    [inputText, retryTrigger]
  );

  useEffect(
    function () {
      setCountries(
        allCountries.filter(function (country) {
          console.log("country");
          return country.region
            .toLowerCase()
            .includes(filterRegion.toLowerCase());
        })
      );
    },
    [filterRegion]
  );

  if (loading) {
    return (
      <>
        <main className={styles["home-main"]}>
          <div className={styles["search-field"]}>
            <Search handleCountriesData={handleCountriesData} />
            <Dropdown />
          </div>

          <div className={styles["countries-container"]}>
            <CountriesShimmer />
          </div>
        </main>
      </>
    );
  }
  console.log("rendering");

  if (error) {
    return (
      <main className={styles["home-main"]}>
        <div className={styles["search-field"]}>
          <Search handleCountriesData={handleCountriesData} />
          <Dropdown />
        </div>

        <div className={styles["countries-container"]}>
          <div className={styles["error-box"]}>
            <h2 className={styles["error-title"]}>
              Oops! Something went wrong.
            </h2>
            <p className={styles["error-message"]}>
              We couldn’t load the country data. Please check your connection or
              try again later.
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
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className={styles["home-main"]}>
        <div className={styles["search-field"]}>
          <Search handleCountriesData={handleCountriesData} />
          <Dropdown setFilterRegion={setFilterRegion} inputText={inputText} />
        </div>
        <div className={styles["countries-container"]}>
          {countries.map(function (country) {
            return (
              <Card
                img={country.flags.svg}
                key={country.flags.svg}
                name={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital}
                official={country.name.official}
                data={country}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Home;

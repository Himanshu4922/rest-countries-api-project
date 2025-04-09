import React from "react";
import { useState, useEffect, useContext } from "react";
import styles from "./Home.module.css";
import Card from "./Card";
import Search from "./Search";
import Dropdown from "./Dropdown";
import { Link, useOutletContext, useNavigate } from "react-router";
import CountriesShimmer from "./CountriesShimmer";
// import { ThemeContext } from "./../contexts/ThemeContext";
import { useWindowSize } from "./../hooks/useWindowSize";
import { useThemeContext } from "./../hooks/useThemeContext";

function Home() {
  const [inputText, setInputText] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRegion, setFilterRegion] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  const navigate = useNavigate();
  console.log(filterRegion);
  // const isDark = useOutletContext();

  // console.log(isDark)
  // console.log(useOutletContext);
  function handleCountriesData(input) {
    setInputText(input);
  }

  console.log(inputText, "from home");
  // const windowSize = useWindowSize();
  // console.log(ThemeContext)

  // const [isDark, setIsDark] = useContext(ThemeContext);
  const [isDark, setIsDark] = useThemeContext();
  // console.log(a);

  useEffect(
    function () {
      fetch("https://restcountries.com/v3.1/all")
        .then(function (resp) {
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
          // console.log("running");
          window.scrollTo(0, 0);
        })
        .catch(function (error) {
          console.log("Error in fetching data", error);
          setLoading(false);
          // navigate("/")
        });
    },
    [inputText]
  );

  useEffect(
    function () {
      console.log("heehe");
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
        <main>
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

  return (
    <>
      <main>
        <div className={styles["search-field"]}>
          <Search handleCountriesData={handleCountriesData} />
          <Dropdown setFilterRegion={setFilterRegion} inputText={inputText} />
        </div>
        <div
          className={
            countries.length === 0
              ? styles["countries-container-empty"]
              : styles["countries-container"]
          }
        >
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

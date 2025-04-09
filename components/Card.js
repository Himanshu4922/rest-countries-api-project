import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router";

function Card({ img, name, population, region, capital, official, data }) {
  return (
    <>
      <Link
        state={data}
        className={styles["card"]}
        to={`/${encodeURIComponent(official)}`}
      >
        <img src={img} alt={name} />
        <div className={styles["card-text-content"]}>
          <h3>{name}</h3>
          <p>
            Population: <span>{population.toLocaleString("en-IN")}</span>
          </p>
          <p>
            Region: <span>{region}</span>
          </p>
          <p>
            Capital: <span>{capital?.[0]}</span>
          </p>
        </div>
      </Link>
    </>
  );
}

export default Card;

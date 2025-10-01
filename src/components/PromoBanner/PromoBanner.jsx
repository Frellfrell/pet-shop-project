import React from "react";
import { Link } from "react-router-dom";
import styles from "./PromoBanner.module.css";
import promoImage from "../../assets/promo-banner.png";
import { button } from "../../constants/styles";

const PromoBanner = () => {
  return (
    <section
      className={styles.banner}
      style={{ backgroundImage: `url(${promoImage})` }}
    >
      <div className={styles.contentBox}>
        <h1 className={styles.title} >
          Amazing discounts <br /> on pants products
        </h1>
        <Link
          to="/discounts"
          className={styles.button}
          style={button}
        >
          Check Out
        </Link>
      </div>
    </section>
  );
};

export default PromoBanner;



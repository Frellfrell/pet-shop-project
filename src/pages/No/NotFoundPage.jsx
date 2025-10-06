import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import { colors, spacing, button } from "../../constants/styles";
import tierKind from "../../assets/tierKind.png"; 

const NotFoundPage = () => {
  return (
    <div
      className={styles.container}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: spacing.xl,
      }}
    >
      <div className={styles.codeBox} style={{ marginBottom: spacing.xl }}>
        <span className={styles.digit} style={{ color: colors.primary }}>
          4
        </span>

        <img src={tierKind} alt="Tier illustration" className={styles.image} />

        <span className={styles.digit} style={{ color: colors.primary }}>
          4
        </span>
      </div>

      {/* Блок с текстом */}
      <div className={styles.textBox}>
        <h1 className={styles.title} style={{ color: colors.secondary }}>
          Page Not Found
        </h1>
        <p className={styles.subtitle} style={{ color: colors.txtGrey }}>
          We’re sorry, the page you requested could not be found.
          <br />
          Please go back to the homepage.
        </p>

        <Link
          to="/"
          className={styles.homeButton}
          style={{
            ...button,
            textAlign: "center",
          }}
        >
          Go Home
        </Link>
      </div>
    </div>
  );

};

export default NotFoundPage;
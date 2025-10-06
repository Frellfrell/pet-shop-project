import React from "react";
import { Link } from "react-router-dom";
import { colors, spacing, button } from "../../constants/styles";
import styles from "./NotFoundPage.module.css";
import tierKind from "../../assets/tierKind.png"; // путь к твоей картинке (замени при необходимости)

const NotFoundPage = () => {
  return (
    <div className={styles.container}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: spacing.xl,
      }}>
        {/* Верхний бокс с цифрами 4 0 4 */}
      <div className={styles.codeBox} style={{ gap: spacing.lg }}>
        <span className={styles.digit} style={{ color: colors.primary }}>4</span>
        <img src={tierKind} alt="0" className={styles.image} />
        <span className={styles.digit} style={{ color: colors.primary }}>4</span>
      </div>

      {/* Блок с текстом */}
      <div className={styles.textBox}>
        <h1 className={styles.title} style={{ color: colors.secondary }}>Page Not Found</h1>
        <p className={styles.subtitle} style={{ color: colors.txtGrey }}>
          We’re sorry, the page you requested could not be found. <br />
          Please go back to the homepage.
        </p>

        <Link to="/" className={styles.homeButton } style={{
          ...button,
          textAlign: 'center',
        }}>
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

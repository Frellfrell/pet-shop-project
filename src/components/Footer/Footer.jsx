import React from "react";
import styles from "./Footer.module.css";
import phoneIcon from "../../assets/ic-whatsapp.svg"; 
import instagramIcon from "../../assets/ic-instagram.svg"; 
import PageTitle from "../PageTitle/PageTitle";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Левая колонка */}
        <div className={styles.leftColumn}>
          <PageTitle text="Contact" />
        </div>

        {/* Основной блок с карточками */}
        <div className={styles.cardsGrid}>
          {/* Верхний ряд */}
          <div className={styles.card}>
            <h3>Phone</h3>
            <p>+49 30 915-88492</p>
          </div>

          <div className={styles.card}>
            <h3>Socials</h3>
            <div className={styles.socialIcons}>
              <img src={instagramIcon} alt="Instagram" />
              <img src={phoneIcon} alt="Phone" />
            </div>
          </div>

          {/* Нижний ряд */}
          <div className={styles.card}>
            <h3>Address</h3>
            <p>Wallstraße 9-13, 10179 Berlin, Germany</p>
          </div>

          <div className={styles.card}>
            <h3>Working Hours</h3>
            <p>24 hours a day</p>
          </div>
        </div>

        {/* Карта */}
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.558090744685!2d13.401460215886247!3d52.511268079811474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851c28e3a77b9%3A0x9d5eb344c0f3b1f4!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1591054871324!5m2!1sen!2sus"
            width="100%"
            /*height="400"*/
            style={{ border: 0, borderRadius: 8 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps Location"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
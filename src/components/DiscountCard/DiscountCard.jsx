import React from "react";
import styles from "./DiscountCard.module.css";
import { colors } from "../../constants/styles";


const DiscountCard = ({ price, discont_price }) => {
  if (!discont_price) return null;

  const discount = Math.round(((price - discont_price) / price) * 100);

  if (discount <= 0) return null;

  return (
        <div
          className={styles.discountCard}
          style={{

            backgroundColor: colors.primary, // берём из constants
            color: colors.background,
            fontWeight: "600",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          -{discount}%
        </div> 
  );
};

export default DiscountCard;

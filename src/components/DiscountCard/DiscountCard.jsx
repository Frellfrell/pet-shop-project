import React from "react";
import styles from "./DiscountCard.module.css";
import { colors } from "../../constants/styles";


const DiscountCard = ({ price, discont_price }) => {
  
console.log('DiscountCard props:', { price, discont_price });
 const priceNum = Number(price);
const discontPriceNum = Number(discont_price);
const discont = Math.round(((priceNum - discontPriceNum) / priceNum) * 100);
  

  if (discont <= 0) return null;

  return (
        <div
          className={styles.discountCard}
          style={{

            backgroundColor: colors.primary, 
            color: colors.background,
            fontWeight: "600",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          -{discont}%
        </div> 
  );
};

export default DiscountCard;

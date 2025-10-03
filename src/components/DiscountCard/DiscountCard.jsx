import React from "react";
import styles from "./ProductCard.module.css";
import { colors } from "../../constants/styles";

const ProductCard = ({ title, image, price, discont_price }) => {
  const discount = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null;

  return (
    <div className={styles.card}>
      {/* бейдж скидки */}
      {discount > 0 && (
        <div
          className={styles.discountBadge}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "68px",
            height: "34px",
            backgroundColor: colors.sale, // берём из constants
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
      )}

      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>

      {/* цены */}
      <div className={styles.prices}>
        {discont_price ? (
          <>
            <span className={styles.oldPrice}>{price} $</span>
            <span className={styles.newPrice}>{discont_price} $</span>
          </>
        ) : (
          <span className={styles.price}>{price} $</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

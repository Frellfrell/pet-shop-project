import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import DiscountCard from "../DiscountCard/DiscountCard";
import { BASE_URL } from "../../constants";

const ProductCard = ({ id, title, price, discont_price, image }) => {
  return (
    <Link to={`/products/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        {/* Изображение продукта */}
        <div className={styles.imageWrapper}>
          <img
            src={`${BASE_URL}${image}`}
            alt={title}
            className={styles.cardImage}
          />
          {/* ДискаунтCard */}
          {discont_price && (
            <DiscountCard price={price} discount_price={discont_price} />
          )}
          {/* Hover кнопка Add to Cart */}
          <button className={styles.addToCartBtn}>Add to Cart</button>
        </div>

        {/* Информация о продукте */}
        <div className={styles.cardInfo}>
          <p className={styles.cardTitle}>{title}</p>
          <div className={styles.priceBox}>
            <span className={styles.price}>{price}$</span>
            {discont_price && (
              <span className={styles.discountPrice}>{discont_price}$</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

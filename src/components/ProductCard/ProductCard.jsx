import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { colors, spacing, radii, borders } from "../../constants/styles";
import DiscountCard from "../DiscountCard/DiscountCard";
import { BASE_URL } from "../../constants";
import { addToCart } from "../../services/cartHelper";
import { useDispatch } from "react-redux";


const ProductCard = ({ id, title, price, discont_price, image, product }) => {
  const dispatch = useDispatch()
   const validDiscount =
    discont_price != null &&                   // не null и не undefined
    discont_price !== "None" &&               // не строка "None"
    !Number.isNaN(Number(discont_price)) &&   // не NaN
    Number(discont_price) > 0 &&              // больше нуля
    Number(price) > 0;                         // цена > 0

  console.log('DiscountCard price:', price, 'discountPrice:', discont_price);
  return (
    <Link to={`/product/${id}`} className={styles.cardLink}>
      <div className={styles.card}
        style={{
          border: borders.grayDivider,
          borderRadius: radii.small,
          padding: spacing.sm,
          backgroundColor: colors.background,
        }}>
        {/* Изображение продукта */}
        <div className={styles.imageWrapper}>
          <img
            src={`${BASE_URL}${image}`}
            alt={title}
            className={styles.cardImage}
          />
          {/* ДискаунтCard */}
          {validDiscount && ( 
            <DiscountCard price={price} discont_price={discont_price} />
          )}
          {/* Hover кнопка Add to Cart */}
          <button onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            addToCart(product, dispatch)
          }} className={styles.addToCartBtn}
          >Add to Cart</button>
        </div>

        {/* Информация о продукте */}
        <div className={styles.cardInfo}>
          <p className={styles.cardTitle}>{title}</p>
          <div className={styles.priceBox}>
            <span className={styles.price}>${product.discont_price ? `${product.discont_price}` : `${product.price}`}</span>
            {product.discont_price && (
              <span className={styles.discountPrice}>${product.price}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/actions/products";
import styles from "./Sales.module.css";
import { Link } from "react-router-dom";
import { colors, spacing, radii, typography, borders } from "../../constants/styles";
import { BASE_URL } from "../../constants/index";
import DiscountCard from "../DiscountCard/DiscountCard";
import PageTitle from "../PageTitle/PageTitle";

const Sales = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchAllProducts()); // при монтировании подгружаем товары
  }, [dispatch]);

  const discountedProducts = (products || [])
    .filter((p) => p.discont_price) // берём только товары со скидкой
    .slice(0, 4); // первые 4 товара

  return (
    <section className={styles.SalesSection}
      style={{ padding: `${spacing.xl} ${spacing.xl}` }}>
      {/* Заголовок и кнопка All Categories */}
      <div className={styles.header} style={{ marginBottom: spacing.xl, gap: spacing.md, }}>
        <PageTitle text="Sale" />

        <div className={styles.dividerWrapper} style={{ position: "relative", display: "flex", alignItems: "center" }}>

          {/* Divider */}
          <div style={{ position: "relative",display: "flex", alignItems: "center" }}></div>
          <div className={styles.divider}
            style={{
              backgroundColor: colors.grayDivider,
              
            }}
          />
          <Link to="/discounts" className={styles.allBtn}
            style={{

              color: colors.txtGrey,
              textDecoration: "none",
              fontWeight: 500,
              padding: spacing.sm,
              borderRadius: radii.small,
              border: `1px solid ${colors.txtGrey}`,
              paddingBottom: spacing.xs,
            }}
          >
            All Sales
          </Link>
        </div>
      </div>
      {/* Сетка карточек категорий */}
      <div className={styles.cardsContainer} 
      >
        {loading ? (
          <p style={{ ...typography.TGrey }}>Загрузка...</p>
        ) : error ? (
          <p style={{ ...typography.TGrey }}>Ошибка: {error}</p>
        ) : discountedProducts.length > 0 ? (
          discountedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={styles.cardLink}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.card}
                style={{
                  border: borders.grayDivider,
                  gap: spacing.sm,
                  padding: spacing.sm,
                  backgroundColor: colors.background,
                }}
              >


                <img src={`${BASE_URL}${product.image}`}
                  alt={product.title}
                  className={styles.cardImage}
                />
                <DiscountCard
                  price={product.price}
                  discont_price={product.discont_price}
                />
                <div className={styles.cardBox}>

                  {<p className={styles.cardTitle} style={typography.TBlack}>
                    {product.title}
                  </p>}
                  {/* Блок с ценой */}
                  <div
                    className={styles.priceBox}
                    style={{
                      display: "flex",
                      gap: spacing.md,
                      justifyContent: "flex-start", // чтобы цена была слева
                      alignItems: "flex-end",
                      width: "100%",
                    }}
                  >
                    <span
                      className={styles.price}
                      style={{
                        ...typography.TBlack,
                        
                        color: colors.secondary,
                      }}
                    >
                       ${product.discont_price ? `${product.discont_price}` : `${product.price}`}
                    </span>
                    {product.discont_price && (
                    <span className={styles.priceOld}>
                      ${product.price}
                    </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p style={{ ...typography.TGrey, fontSize: "18px" }}>No categories available.</p>
        )}
      </div>
    </section>
  );
};
export default Sales;

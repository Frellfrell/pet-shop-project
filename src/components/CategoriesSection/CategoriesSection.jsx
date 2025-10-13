import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { fetchAllCategories } from "../../redux/actions/categories";
import { Link } from "react-router-dom";
import styles from "./CategoriesSection.module.css";
import { colors, spacing, radii, typography } from "../../constants/styles";
import { BASE_URL } from "../../constants";
import PageTitle from "../PageTitle/PageTitle";

const selectCategories = createSelector(
  (state) => state.categories.categories,
  (categories) => categories ? [...categories] : []
);



const CategoriesSection = ({ hideAllCategories = false, limit = 4 }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  console.log("Categories from Redux:", categories);

  // Загрузка категорий при монтировании компонента
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const visibleCategories = limit ? categories.slice(0, limit) : categories;

  return (
    <section className={styles.categoriesSection}
      style={{ padding: `${spacing.xl}` }}>
      {/* Заголовок и кнопка All Categories */}
      <div className={styles.header} style={{ marginBottom: spacing.xl, gap: spacing.md }}>
        <PageTitle text="Categories" />
        {!hideAllCategories && (
          <div className={styles.dividerWrapper} style={{ position: "relative", display: "flex", alignItems: "center" }}>
            {/* Divider  />*/}
            <div className={styles.divider}
              style={{
               
                backgroundColor: colors.grayDivider,
              }}
            />


            <Link to="/categories" className={styles.allBtn}
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
              All Categories
            </Link>
          </div>
        )}
      </div>
      {/* Сетка карточек категорий */}
      <div className={styles.cardsContainer} style={{
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {visibleCategories.length > 0 ? (
          visibleCategories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className={styles.cardLink}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.card}
                style={{
                  borderRadius: radii.small,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.sm,
                  backgroundColor: colors.background,
                }}
              >
                <img src={`${BASE_URL}${category.image}`}
                  alt={category.title}
                  className={styles.cardImage}
                />
                {<p className={styles.cardTitle} style={typography.TBlack}>
                  {category.title}
                </p>}
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

export default CategoriesSection;

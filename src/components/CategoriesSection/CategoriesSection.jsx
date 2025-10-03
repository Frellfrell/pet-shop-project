import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { fetchAllCategories } from "../../redux/actions/categories.action";
import { Link } from "react-router-dom";
import styles from "./CategoriesSection.module.css";
import { colors, spacing, radii, typography, borders } from "../../constants/styles";
import { BASE_URL } from "../../constants";


const selectCategories = createSelector(
  (state) => state.categories.categories,
  (categories) => categories ? [...categories] : []
);



const CategoriesSection = ({ hideAllCategories = false }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  console.log("Categories from Redux:", categories);

  // Загрузка категорий при монтировании компонента
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <section className={styles.categoriesSection} 
    style={{ padding: `${spacing.xl} ${spacing.xl}` }}>
      {/* Заголовок и кнопка All Categories */}
      <div className={styles.header} style={{ marginBottom: spacing.xl,  gap: spacing.md  }}>
        <h2 className={styles.title} style={{ ...typography.TBlack, fontSize: "64px" }}>Categories</h2>
        {!hideAllCategories && (
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "832px",
              height: "1px",
              backgroundColor: colors.grayDivider,
            }}
          />
        
        {/* Divider 
        <div style={{  display: "flex", alignItems: "center" }}></div>
          <div
            style={{
               
              position: "absolute",
              
              width: "832px",
              height: "1px",
             
            }}
        />*/}
        
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
            
              height: "392px" }}>
        {categories.length > 0 ? (categories.slice(0, 4).map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className={styles.cardLink}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.card}
            style={{
                 height: "316px",
                border: borders.grayDivider,
                borderRadius: radii.small,
                 flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: spacing.sm,
                  padding: spacing.sm,
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

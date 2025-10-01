import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategories } from "../../redux/actions/categories.action";
import { Link } from "react-router-dom";
import styles from "./CategoriesSection.module.css";
import { colors, spacing, radii, typography, borders } from "../../constants/styles";


const CategoriesSection = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);


   useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <section className={styles.categoriesSection} style={{ padding: `${spacing.xl} ${spacing.xl}` }}>
      {/* Заголовок и кнопка All Categories */}
      <div className={styles.header} style={{ marginBottom: spacing.lg }}>
        <h2 className={styles.title} style={{ ...typography.TBlack, fontSize: "32px" }}>Categories</h2>
        <Link to="/categories" className={styles.allBtn}
        style={{
            color: colors.primary,
            borderBottom: borders.grayDivider,
            paddingBottom: spacing.xs,
          }}
          >
            All Categories
            </Link>
      </div>

      {/* Сетка карточек категорий */}
      <div className={styles.cardsContainer}>
        {categories.slice(0, 4).map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className={styles.cardLink}
          >
            <div className={styles.card}
            style={{
                border: borders.grayDivider,
                borderRadius: radii.small,
              }}
              >
              <img src={category.image} alt={category.name} className={styles.cardImage} />
              <p className={styles.cardTitle} style={typography.TBlack}>
                {category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;

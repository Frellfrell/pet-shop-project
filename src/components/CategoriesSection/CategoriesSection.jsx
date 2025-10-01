import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategories } from "../../redux/actions/categories";
import { Link } from "react-router-dom";
import styles from "./CategoriesSection.module.css";



const CategoriesSection = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);


   useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <section className={styles.categoriesSection}>
      {/* Заголовок и кнопка All Categories */}
      <div className={styles.header}>
        <h2 className={styles.title}>Categories</h2>
        <Link to="/categories" className={styles.allBtn}>All Categories</Link>
      </div>

      {/* Сетка карточек категорий */}
      <div className={styles.cardsContainer}>
        {categories.slice(0, 4).map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className={styles.cardLink}
          >
            <div className={styles.card}>
              <img src={category.image} alt={category.name} />
              <p className={styles.cardTitle}>{category.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;

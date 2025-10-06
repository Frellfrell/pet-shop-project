import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import FilterSet from "../../components/Filter/FilterSet";
import DiscountCard from "../../components/DiscountCard/DiscountCard";
import { fetchAllProducts } from "../../redux/actions/products";
import styles from "./DiscountsPage.module.css";

const DiscountsPage = () => {
  const dispatch = useDispatch();
  useScrollToTop();

  // получаем товары из Redux
  const { products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Загружаем товары при первом рендере
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch]);

  // Берём только товары со скидками
  useEffect(() => {
    if (Array.isArray(products)) {
    const discounted = products.filter((p) => p.discont_price);
    setFilteredProducts(discounted);
    }
  }, [products]);

  // Ограничиваем вывод до 8 товаров (2 ряда × 4 карточки)
  const productsToShow = filteredProducts.slice(0, 8);

  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "All Sales", path: "/discounts" },
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Хлебные крошки и фильтр всегда видны */}
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <h1 className={styles.pageTitle}>Discounted items</h1>

      <div className={styles.filterContainer}>
        <FilterSet
          products={products.filter((p) => p.discont_price)}
          setFilteredProducts={setFilteredProducts}
          isDiscountPage={true}
        />
      </div>

      {/* Состояния загрузки / ошибки / карточки */}
      {loading && <p className={styles.loading}>Loading discounted products...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      {!loading && !error && (
        <div className={styles.cardsContainer}>
          {productsToShow.length > 0 ? (
            productsToShow.map((product) => (
              <DiscountCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                discont_price={product.discont_price}
                image={product.image}
              />
            ))
          ) : (
            <p className={styles.noProducts}>No discounted products available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscountsPage;
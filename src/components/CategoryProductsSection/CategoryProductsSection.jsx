 import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import FilterSet from "../Filter/FilterSet";
import styles from "./CategoryProductsSection.module.css";

const CategoryProductsSection = ({ products, isDiscountPage = false }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Инициализация фильтрованных продуктов
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  return (
    <section className={styles.productsSection}>
      {/* Фильтры */}
      <div className={styles.filters}>
        <FilterSet
          products={products}
          setFilteredProducts={setFilteredProducts}
          isDiscountPage={isDiscountPage}
        />
      </div>

      {/* Сетка карточек продуктов */}
      <div className={styles.cardsContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              discont_price={product.discont_price}
              image={product.image}
            />
          ))
        ) : (
          <p className={styles.noProducts}>No products available.</p>
        )}
      </div>
    </section>
  );
};

export default CategoryProductsSection;

 import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import FilterSet from "../Filter/FilterSet";
import styles from "./CategoryProductsSection.module.css";
import { getProducts } from "../../services/api";


const CategoryProductsSection = ({ categoryId, isDiscountPage = false }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    // Получаем все продукты и фильтруем по categoryId
    getProducts()
      .then((data) => {
        const categoryProducts = data.filter((p) => p.categoryId == categoryId);
        setProducts(categoryProducts);
        setFilteredProducts(categoryProducts);
      })
      .catch((error) => console.error("Ошибка при загрузке продуктов:", error));
  }, [categoryId]);


  return (
    <section className={styles.productsSection}>
      <div className={styles.filters}>
        <FilterSet
          products={products}
          setFilteredProducts={setFilteredProducts}
          isDiscountPage={isDiscountPage}
        />
      </div>
      <div className={styles.cardsContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
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
 import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import FilterSet from "../Filter/FilterSet";
import styles from "./CategoryProductsSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/actions/products";

const CategoryProductsSection = ({ categoryId, isDiscountPage = false }) => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
 useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const categoryProducts = products.filter(
      (product) => product.categoryId === Number(categoryId)
    );
    setFilteredProducts(categoryProducts);
  }, [products, categoryId]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products: {error}</p>;




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

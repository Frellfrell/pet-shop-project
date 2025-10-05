import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import FilterSet from "../../components/Filter/FilterSet";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchAllProducts } from "../../redux/actions/products";
import styles from "./ProductsPage.module.css";


const ProductsPage = () => {
  const dispatch = useDispatch();
  useScrollToTop();

  // Получаем данные из редюсера
  const { products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const [filteredProducts, setFilteredProducts] = useState([]);


   useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "All Products", path: "/products" },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <div className={styles.pageWrapper}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <h1 className={styles.pageTitle}>All Products</h1>

      <div className={styles.filterContainer}>
        <FilterSet
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
      </div>

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
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import FilterSet from "../../components/Filter/FilterSet";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchAllProducts } from "../../redux/actions/products";
import styles from "./ProductsPage.module.css";


const ProductsPage = () => {

   useScrollToTop();
  
   const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "All Products", path: "/products" },
  ];
  const dispatch = useDispatch();
 

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

 

  

  const productsToShow = filteredProducts.slice(0, 12);

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
       {/* Если идет загрузка или ошибка */}
      {loading && <p className={styles.loading}>Loading products...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      {/* Карточки продуктов */}
      {!loading && !error && (
        <div className={styles.cardsContainer}>
          {productsToShow.length > 0 ? (
            productsToShow.map((product) => (
               product.discont_price ? (
        <DiscountCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          discont_price={product.discont_price}
          image={product.image}
        />
      ) : (
              <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          )
            ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
       
      )}
    </div>
  );
};

export default ProductsPage;

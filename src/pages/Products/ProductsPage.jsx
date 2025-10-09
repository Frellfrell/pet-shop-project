import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import FilterSet from "../../components/Filter/FilterSet";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchAllProducts } from "../../redux/actions/products";
import styles from "./ProductsPage.module.css";
import { Typography } from "@mui/material";


const ProductsPage = ({ isDiscount }) => {

  useScrollToTop();
 const dispatch = useDispatch();

  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "All Products", path: "/products" },
  ];
 


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Получаем данные из редюсера
  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const [filteredProducts, setFilteredProducts] = useState([products]);

  // useEffect(() => {
  //   setFilteredProducts(products);
  // }, [products]);


  // const productsToShow = filteredProducts.slice(0, 12);

  return (
    <div className={styles.pageWrapper}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      {isDiscount ? <Typography sx={{ fontWeight: 700, margin: "40px 0px 40px 0", color: "rgb(40, 40, 40)", fontSize: "64px" }}>Discounted items</Typography> : <Typography sx={{ fontWeight: 700, margin: "40px 0px 40px 0", color: "rgb(40, 40, 40)", fontSize: "64px" }}>All Products</Typography>}


      <div className={styles.filterContainer}>
        <FilterSet
          products={products}
          setFilteredProducts={setFilteredProducts}
          isDiscountPage={isDiscount}
        />
      </div>
      {/* Если идет загрузка или ошибка */}
      {loading && <p className={styles.loading}>Loading products...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      {/* Карточки продуктов */}
      {!loading && !error && (
        <div className={styles.cardsContainer}>
          {filteredProducts.map((product) => (
            // product.discont_price ? (
            //   <DiscountCard
            //     key={product.id}
            //     id={product.id}
            //     title={product.title}
            //     price={product.price}
            //     discont_price={product.discont_price}
            //     image={product.image}
            //   />
            // ) : (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              discont_price={product.discont_price}
              image={product.image}
              product={product}
            />

          ))
          }
        </div>

      )}
    </div>
  );
};

export default ProductsPage;

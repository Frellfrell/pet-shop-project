import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import FilterSet from "../../components/Filter/FilterSet";
import ProductCard from "../../components/ProductCard/ProductCard";
import { fetchAllProducts } from "../../redux/actions/products";
import styles from "./ProductsPage.module.css";
import PageTitle from "../../components/PageTitle/PageTitle";


const ProductsPage = ({ isDiscount }) => {

  useScrollToTop();
 const dispatch = useDispatch();

  // Получаем данные из редюсера
  const { products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const [filteredProducts, setFilteredProducts] = useState([]);
 const hasFetched = useRef(false); // флаг, чтобы не загружать повторно


  //useEffect(() => {
    //dispatch(fetchAllProducts());
  //}, [dispatch]);

  //  Загружаем продукты только один раз (при первой загрузке)
  useEffect(() => {
    if (!hasFetched.current && (!products || products.length === 0)) {
      dispatch(fetchAllProducts());
      hasFetched.current = true;
    }
  }, [dispatch, products]);

  //  Обновляем состояние фильтра только при изменении списка продуктов
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "All Products", path: "/products" },
  ];

  // useEffect(() => {
  //   setFilteredProducts(products);
  // }, [products]);


  const filteredShowProducts = filteredProducts.slice(0, 12);

  return (
    <div className={styles.pageWrapper}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <PageTitle text={isDiscount ? "Discounted items" : "All Products"} />
        
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
          {filteredShowProducts.length > 0 ? (filteredShowProducts.map((product) => (
            
            <ProductCard
              key={product.i || product.title}
              id={product.id}
              title={product.title}
              price={product.price}
              discont_price={product.discont_price}
              image={product.image}
              product={product}
            />

          ))
        ): (
      <p>No products found.</p>
    )}
        </div>

      )}
    </div>
  );
};

export default ProductsPage;

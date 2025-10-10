import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import FilterSet from "../../components/Filter/FilterSet";
import { fetchAllProducts } from "../../redux/actions/products";
import styles from "./DiscountsPage.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageTitle from "../../components/PageTitle/PageTitle";

const DiscountsPage = () => {

  useScrollToTop();

  const dispatch = useDispatch();

  // получаем товары из Redux
  const { products = [], loading, error } = useSelector(
    (state) => state.products
  );

  const [filteredProducts, setFilteredProducts] = useState([]);
 const hasFetched = useRef(false); // флаг, чтобы не загружать повторно

  // Загружаем товары при первом рендере
 // useEffect(() => {
   // if (!products || products.length === 0) {
 //     dispatch(fetchAllProducts());
   // }
  //}, [dispatch]);
      // Загружаем продукты только один раз
  useEffect(() => {
   
    if (!hasFetched.current ) {
      dispatch(fetchAllProducts());
      hasFetched.current = true;
    }
  }, [dispatch]);
  // Берём только товары со скидками
    useEffect(() => {
     
    if (Array.isArray(products) && products.length > 0) {
     const discounted = products.filter((p) => p.discont_price);
     console.log(discounted);
      setFilteredProducts(discounted);
    }
      }, [products]);
  // Отбираем только товары со скидками, когда продукты обновились
  //useEffect(() => {
    //if (products.length > 0) {
      //const discounted = products.filter((p) => p.discont_price && p.discont_price < p.price);
      //setFilteredProducts(discounted);
    //}
  //}, [products]);

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
     <PageTitle text="Discounted items" />
      {/*<h1 className={styles.pageTitle}>Discounted items</h1>*/}

      <div className={styles.filterContainer}>
        <FilterSet
        products={filteredProducts}
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
            productsToShow.map((product, index) => (
              <ProductCard
                key={product.id || `discount-${index}`}
                id={product.id}
                title={product.title}
                price={product.price}
                discont_price={product.discont_price}
                image={product.image}
                product={product}
              />
            ))
          ) : (
            <p className={styles.noProducts}>No discounted products available.</p>
          )}
        </div>
      )}
    </div>
)
};

export default DiscountsPage;
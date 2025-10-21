import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import DiscountCard from "../../components/DiscountCard/DiscountCard";
import { fetchProductById } from "../../redux/actions/products";
import styles from "./ProductPage.module.css";
import { BASE_URL } from "../../constants";
import { fetchProductsByCategory } from "../../redux/actions/categories";
import { addToCart } from "../../services/cartHelper";
import { button } from "../../constants/styles";
import PageTitle from "../../components/PageTitle/PageTitle";



const ProductPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  useScrollToTop();

  const [count, setCount] = useState(1);
 const [isExpanded, setIsExpanded] = useState(false);
 const [added, setAdded] = useState(false);
 const [hover, setHover] = useState(false);

  // Загружаем продукты и категории при монтировании
  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchProductsByCategory());
  }, [dispatch]);

  const product = useSelector((state) => state.products.currentProduct);
  const category = useSelector((state) => state.categories.currentCategory);

  

  if (!product) {
    return (
      <div style={{ padding: 40 }}>
        <BreadCrumbs breadCrumbs={breadCrumbs} />
        <p>Product not found.</p>
      </div>
    );
  }



  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: category ? category.title : "Category", path: `/categories/${category?.id ?? ""}` },
    { name: product ? product.title : "Product", path: `/product/${id}` },
  ];



  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));



  return (
    <div className={styles.container}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className={styles.productWrapper}>
        <div className={styles.leftImageColumn}>
          {/* Левая часть */}
          <div className={styles.leftColumn}>
           
            <div className={styles.leftImageWrapper}>
              <img
                src={`${BASE_URL}${product.image}`}
                alt={product.title}
                className={styles.leftImage} />
              <img
                src={`${BASE_URL}${product.image}`}
                alt={product.title}
                className={styles.leftImage} />
              <img
                src={`${BASE_URL}${product.image}`}
                alt={product.title}
                className={styles.leftImage} />
            </div>
          </div>
          <div className={styles.mainImageWrapper}>
            <img
              src={`${BASE_URL}${product.image}`}
              alt={product.title}
              className={styles.mainImage}
            />
          </div>
        </div>


        {/* Правая часть */}
        <div className={styles.rightColumnDescription}>
          <div className={styles.rightColumn}>
           <PageTitle text={product.title} variant="small" />

            <div className={styles.priceBox}>
             <div className={styles.priceRow}>
    {/* новая цена (если есть скидка — показываем скидочную) */}
    <span className={styles.currentPrice}>
      ${product.discont_price ? `${product.discont_price}` : `${product.price}`}
    </span>

    {/* старая цена (если есть скидка) */}
    {product.discont_price && (
      <span className={styles.oldPrice}>${product.price}</span>
    )}

    {/* дисконтная карта */}
    {product.discont_price && (
     <div className={styles.discountBox}>
        <DiscountCard
          price={product.price}
          discont_price={product.discont_price}
        />
      </div>
    )}
              </div>
            </div>


            <div className={styles.buyBox}>
              <div className={styles.counter}>
                <button onClick={handleDecrease}>−</button>
                <span>{count}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
              <button className={styles.addBtn} style={{
        ...button, // базовые размеры и шрифт из Style.js
        backgroundColor: added
          ? "#ffffff"
          : hover
          ? "#000000"
          : button.backgroundColor,
        color: added ? "rgba(13,80,255,1)" : "rgba(255,255,255,1)",
        border: added ? `1px solid #0d50ff` : "none",
      }} onClick={() => {
        addToCart(product, dispatch, count);
        setAdded(true);
      }}
      disabled={added}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {added ? "Added" : "Add to Cart"}</button>
            </div>
            <div className={styles.descriptionWrapper}>
              <h3>Description</h3>
      <p className={`${styles.description} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        {product.description}
      </p>

      {product.description && product.description.length > 200 && (
        <button
          className={styles.readMoreBtn}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "Read more"}
        </button>
      )}
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import DiscountCard from "../../components/DiscountCard/DiscountCard";
import { fetchAllProducts } from "../../redux/actions/products.action";
import { fetchAllCategories } from "../../redux/actions/categories.action";
import styles from "./ProductPage.module.css";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants";

// Селектор для продукта по id
const selectProductById = (state, id) => {
  return state.products.products.find((p) => String(p.id) === String(id));
};

// Селектор для категории по id
const selectCategoryById = (state, id) => {
  return state.categories.categories.find((c) => String(c.id) === String(id));
};


const ProductPage = () => {

const { id } = useParams();

useScrollToTop();

const dispatch = useDispatch();

  const [count, setCount] = useState(1);

// Загружаем продукты и категории при монтировании
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

const product = useSelector((state) => selectProductById(state, id));
  const category = useSelector((state) =>
    product ? selectCategoryById(state, product.categoryId) : null
  );


  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: category ? category.title : "Category", path: `/categories/${category?.id ?? ""}` },
    { name: product ? product.title : "Product", path: `/product/${id}` },
  ];

  

  if (!product) {
    return (
      <div style={{ padding: 40 }}>
        <BreadCrumbs breadCrumbs={breadCrumbs} />
        <p>Product not found.</p>
      </div>
    );
  }

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const relatedImages = useSelector((state) =>
    state.products.products
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 3)
  );

  return (
    <div className={styles.container}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className={styles.productWrapper}>
        {/* Левая часть */}
        <div className={styles.leftColumn}>
          <div className={styles.relatedImages}>
            {relatedImages.map((img) => (
         <img
                key={img.id}
                src={`${BASE_URL}${img.image}`}
                alt={img.title}
                className={styles.relatedImg}
              />
            ))}
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
        <div className={styles.rightColumn}>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.priceBox}>
            <span className={styles.price}>{product.price}$</span>
            {product.discont_price && (
              <DiscountCard
                price={product.price}
                discount_price={product.discont_price}
              />
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

        <div className={styles.buyBox}>
            <div className={styles.counter}>
              <button onClick={handleDecrease}>−</button>
              <span>{count}</span>
              <button onClick={handleIncrease}>+</button>
            </div>
            <Link to="/cart" className={styles.button}>Add to Cart</Link>
          </div>

          <div className={styles.categoryInfo}>
             <p>{product.details ?? "No additional info"}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;
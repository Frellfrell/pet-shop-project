import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
/*import DiscountCard from "../../components/DiscountCard/DiscountCard";*/
import { fetchProductById } from "../../redux/actions/products";
import styles from "./ProductPage.module.css";
import { BASE_URL } from "../../constants";
import { fetchProductsByCategory } from "../../redux/actions/categories";
import { addToCart } from "../../services/cartHelper";
import { button } from "../../constants/styles";

// // Селектор для продукта по id
// const selectProductById = (state, id) =>
//   state.products.items?.find((p) => String(p.id) === String(id));


// // Селектор для категории по id
// const selectCategoryById = (state, id) =>
//   state.categories.categories?.find((c) => String(c.id) === String(id));



const ProductPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  useScrollToTop();

  const [count, setCount] = useState(1);

  // Загружаем продукты и категории при монтировании
  useEffect(() => {
    dispatch(fetchProductById(id));
    dispatch(fetchProductsByCategory());
  }, [dispatch]);

  const product = useSelector((state) => state.products.currentProduct);
  const category = useSelector((state) => state.categories.currentCategory);

  // const category = useSelector((state) =>
  //   product ? selectCategoryById(state, product.categoryId) : null
  // );
  // const relatedImages = useSelector((state) =>
  //   state.products.products
  //     .filter((p) => p.categoryId === product?.categoryId && p.id !== product?.id)
  //     .slice(0, 3) || []
  // );

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
            {/* <div className={styles.relatedImages}>
            {relatedImages.map((img) => (
              <img
                key={img.id}
                src={`${BASE_URL}${img.image}`}
                alt={img.title}
                className={styles.relatedImg}
              />
            ))}
          </div> */}
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
            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.priceBox}>
             <div className={styles.priceRow}>
    {/* новая цена (если есть скидка — показываем скидочную) */}
    <span className={styles.currentPrice}>
      {product.discont_price ? `${product.discont_price}$` : `${product.price}$`}
    </span>

    {/* старая цена (если есть скидка) */}
    {product.discont_price && (
      <span className={styles.oldPrice}>{product.price}$</span>
    )}

    {/* дисконтная карта */}
    {product.discont_price && (
      <DiscountCard
        price={product.price}
        discont_price={product.discont_price}
      />
    )}
  </div>
            </div>


            <div className={styles.buyBox}>
              <div className={styles.counter}>
                <button onClick={handleDecrease}>−</button>
                <span>{count}</span>
                <button onClick={handleIncrease}>+</button>
              </div>
              <button className={styles.addBtn} style={button} onClick={() => addToCart(product, dispatch, count)}>Add to Cart</button>
            </div>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.categoryInfo}>
              <p>{product.details ?? "Read more"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
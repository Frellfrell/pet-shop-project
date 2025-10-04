import React from "react";
import { useParams, Link } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import { BASE_URL, ENDPOINTS } from "../../constants";
import styles from "./ProductPage.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../service/api"; 
import DiscountCard from "../../components/DiscountCard/DiscountCard";



const ProductPage = () => {

const { id } = useParams();

useScrollToTop();

const [product, setProduct] = useState(null);
const [category, setCategory] = useState(null);
const [relatedImages, setRelatedImages] = useState([]);
 const [loading, setLoading] = useState(true);
 const [count, setCount] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);

      try {
        // Загружаем все продукты и ищем нужный
        const allProducts = await getProducts();
        const foundProduct = allProducts.find(
          (p) => String(p.id) === String(id)
        );

        if (!foundProduct) {
          setProduct(null);
          setLoading(false);
          return;
        }

        setProduct(foundProduct);

        // Загружаем категорию продукта
        const catId =
          foundProduct.categoryId ??
          foundProduct.category ??
          foundProduct.category_id;

        if (catId) {
          const res = await fetch(`${BASE_URL}/categories/${catId}`);
          if (res.ok) {
            const catData = await res.json();
            setCategory(catData);
          }
          const related = allProducts
            .filter((p) => p.category_id === catId && p.id !== foundProduct.id)
            .slice(0, 3);
          setRelatedImages(related);
        }
      } catch (err) {
        console.warn("Ошибка при загрузке продукта:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: category ? category.title : "Category", path: `/categories/${category?.id ?? ""}` },
    { name: product ? product.title : "Product", path: `/product/${id}` },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

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
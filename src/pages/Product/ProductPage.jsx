import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import { BASE_URL } from "../../constants";
import styles from "./ProductPage.module.css";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductPage = () => {
useScrollToTop();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Product", path: `/products/${id}` },
  ];

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className={styles.productPage}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className={styles.productContainer}>
        <div className={styles.imageWrapper}>
          <img
            src={`${BASE_URL}${product.image}`}
            alt={product.title}
            className={styles.image}
          />
        </div>

        <div className={styles.details}>
          <h1 className={styles.title}>{product.title}</h1>

          <div className={styles.prices}>
            {product.discont_price ? (
              <>
                <span className={styles.discountPrice}>${product.discont_price}</span>
                <span className={styles.oldPrice}>${product.price}</span>
              </>
            ) : (
              <span className={styles.price}>${product.price}</span>
            )}
          </div>

          <button className={styles.addBtn}>Add to cart</button>

          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
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
 const [loading, setLoading] = useState(true);

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

  return (
    <div style={{ padding: "40px" }}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />

      <div className={styles.productContainer}>
        <div className={styles.imageContainer}>
          <img src={`${BASE_URL}${product.image}`} alt={product.title} className={styles.productImage} />
          {product.discont_price && (
            <DiscountCard price={product.price} discount_price={product.discont_price} />
          )}
        </div>

        <div className={styles.infoWrapper}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.priceBox}>
            <span className={styles.price}>{product.price}$</span>
            {product.discont_price && <span className={styles.discountPrice}>{product.discont_price}$</span>}
          </div>
          <p className={styles.description}>{product.description}</p>
        <div className={styles.additionalInfo}></div>
        <Link to="/cart" className={styles.button}>Add to Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
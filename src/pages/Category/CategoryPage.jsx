import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import CategoryProductsSection from "../../components/CategoryProductsSection/CategoryProductsSection";
import { BASE_URL } from "../../constants";
import { getCategories } from "../../services/api";

const CategoryPage = () => {

  useScrollToTop();
  const { id } = useParams();
  const [category, setCategory] = useState(null);
const [loading, setLoading] = useState(true);

  // Загрузка категории
  useEffect(() => {
    getCategories()
      .then((categories) => {
        const foundCategory = categories.find((c) => String(c.id) === String(id));
        setCategory(foundCategory || null);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке категории:", err);
        setCategory(null);
      })
      .finally(() => setLoading(false));
  }, [id]);


  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "Categories", path: "/categories" },
     { name: category ? category.title : "Category", path: `/categories/${id}` },
  ];
 
  
 if (loading) return <p>Loading...</p>;
  if (!category)

  return (
     <div style={{ padding: "40px" }}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <CategoryProductsSection categoryId={id} />
      
    </div>
  );
};

export default CategoryPage;

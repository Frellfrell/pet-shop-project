import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import CategoryProductsSection from "../../components/CategoryProductsSection/CategoryProductsSection";
import { fetchAllCategories } from "../../redux/actions/categories.action";

const selectCategories = createSelector(
  (state) => state.categories.categories,
  (categories) => categories ?? []
);

const CategoryPage = () => {
  useScrollToTop();
  const { id } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  


  // Загрузка категории
 useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Находим текущую категорию по id
  useEffect(() => {
    if (categories.length === 0) return;
    const foundCategory = categories.find(c => String(c.id) === String(id));
    setCategory(foundCategory || null);
    setLoading(false);
  }, [categories, id]);


  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "Categories", path: "/categories" },
     { name: category ? category.title : "Category", path: `/categories/${id}` },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!category) {
    return <p>Category not found.</p>;
  }

  return (
     <div style={{ padding: "40px" }}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      {/* Раздел с фильтром */}
      <CategoryProductsSection categoryId={id} />
    </div>
  );
};

export default CategoryPage;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import CategoryProductsSection from "../../components/CategoryProductsSection/CategoryProductsSection";
import { fetchProductsByCategory } from "../../redux/actions/categories";


const CategoryPage = () => {
  useScrollToTop();

  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsByCategory(id))
  }, [dispatch, id]);

  const category = useSelector((state) => state.categories.currentCategory);
  console.log(category)
  const categoryProducts = useSelector((state) => state.categories.categoryProducts);
  console.log(categoryProducts)
  const loading = useSelector((state) => state.categories.isLoading);
 

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
      <CategoryProductsSection products={categoryProducts} category={category} />
    </div>
  );
};

export default CategoryPage;

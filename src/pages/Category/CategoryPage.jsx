import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../../components/hooks/useScrollToTop";
import CategoryProductsSection from "../../components/CategoryProductsSection/CategoryProductsSection";




const CategoryPage = () => {

  useScrollToTop();
  const { id } = useParams();

  const breadCrumbs = [
    { name: "Main Page", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Category", path: `/categories/${id}` }
  ];

  
  return (
     <div style={{ padding: "40px" }}>
      <BreadCrumbs breadCrumbs={breadCrumbs} />
      <CategoryProductsSection categoryId={id} />
    </div>
  );
};

export default CategoryPage;

import React, { useEffect} from "react";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import useScrollToTop from "../components/hooks/useScrollToTop";

const CategoriesPage = () => {
  useScrollToTop();

   const breadCrumbsData = [
    { name: "Main Page", path: "/" },
    { name: "Categories", path: "/categories" },
  ];

   useEffect(() => {
    window.scrollTo(0, 0); // Scroll-to-top при загрузке страницы
  }, []);

  return (
    <div style={{ padding: '0 24px' }}>
      <BreadCrumbs breadCrumbs={breadCrumbsData} />
       <CategoriesSection hideAllCategories={true} />
    </div>
  );
};

export default CategoriesPage;

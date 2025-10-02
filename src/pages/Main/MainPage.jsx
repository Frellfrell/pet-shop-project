import React from "react";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import DiscountOffer from "../../components/DiscountOffer/DiscountOffer";

const MainPage = () => {
  return (
    <div>
      <PromoBanner />
      <CategoriesSection />
      <DiscountOffer />
    </div>
  );
};

export default MainPage;

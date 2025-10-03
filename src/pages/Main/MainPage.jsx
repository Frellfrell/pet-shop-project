import React from "react";
import PromoBanner from "../../components/PromoBanner/PromoBanner";
import CategoriesSection from "../../components/CategoriesSection/CategoriesSection";
import DiscountOffer from "../../components/DiscountOffer/DiscountOffer";
import Sales from "../../components/Sales/Sales";

const MainPage = () => {
  return (
    <div>
      <PromoBanner />
      <CategoriesSection limit={4} />
      <DiscountOffer />
      <Sales />
    </div>
  );
};

export default MainPage;

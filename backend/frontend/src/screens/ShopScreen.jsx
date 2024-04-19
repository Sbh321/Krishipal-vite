import React from "react";
import Category from "../components/Category";
import Hero from "../components/Hero";
import FeatureSectionSeeds from "../components/FeatureSectionSeeds";
import Blogs from "../components/Blogs";
import Services from "../components/Services";

const ShopScreen = () => {
  return (
    <>
      <Category />
      <Hero />
      <FeatureSectionSeeds />
      <Blogs />
      <Services />
    </>
  );
};

export default ShopScreen;

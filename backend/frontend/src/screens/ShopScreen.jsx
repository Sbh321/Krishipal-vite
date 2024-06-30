import React from "react";
import { useEffect } from "react";
import Category from "../components/Category";
import Hero from "../components/Hero";
import FeatureSectionSeeds from "../components/FeatureSectionSeeds";
import Blogs from "../components/Blogs";
import Services from "../components/Services";
import OnScrollCartIcon from "../components/OnScrollCartIcon";

const ShopScreen = () => {
  useEffect(() => {
    document.title = "Krishipal | Shop";
  }, []);
  return (
    <>
      <OnScrollCartIcon />
      <Hero />
      <Category />
      <FeatureSectionSeeds />
      <Blogs />
      <Services />
    </>
  );
};

export default ShopScreen;

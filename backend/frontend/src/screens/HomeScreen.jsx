import React from "react";
import "./HomeScreen.css";
import About from "../components/About";
import LatestProducts from "../components/LatestProducts";
import SignupCard from "../components/SignupCard";
import ExploreBtn from "../components/ExploreBtn";

const HomeScreen = () => {
  return (
    <>
      <About />
      <SignupCard />
      <LatestProducts />
      <ExploreBtn />
    </>
  );
};

export default HomeScreen;

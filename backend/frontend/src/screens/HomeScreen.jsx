import React from "react";
import "./HomeScreen.css";
import About from "../components/About";
import LatestProducts from "../components/LatestProducts";
import SignupCard from "../components/SignupCard";
import ExploreBtn from "../components/ExploreBtn";
import OnScrollCartIcon from "../components/OnScrollCartIcon";

const HomeScreen = () => {
  return (
    <>
      <OnScrollCartIcon />
      <About />
      <SignupCard />
      <LatestProducts />
      <ExploreBtn />
    </>
  );
};

export default HomeScreen;

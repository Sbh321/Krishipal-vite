import React from "react";
import "./HomeScreen.css";
import { useEffect } from "react";
import About from "../components/About";
import LatestProducts from "../components/LatestProducts";
import SignupCard from "../components/SignupCard";
import ExploreBtn from "../components/ExploreBtn";
import OnScrollCartIcon from "../components/OnScrollCartIcon";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  useEffect(() => {
    document.title = "Welcome to Krishipal";
  }, []);

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <OnScrollCartIcon />
      <About />
      {!userInfo && <SignupCard />}
      <LatestProducts />
      <ExploreBtn />
    </>
  );
};

export default HomeScreen;

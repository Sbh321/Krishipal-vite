import React from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { useGetProdQuery } from "../slices/productsApiSlice.js";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const FeatureSectionSeeds = () => {
  const { data: products, isLoading, error } = useGetProdQuery();

  if (isLoading) {
    return (
      <div className="container pt-16 text-center">
        <CircularProgress size={64} style={{ color: "#718096" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container pt-16 text-center">
        <Alert severity="error">
          Error fetching products. Please try again later.
        </Alert>
      </div>
    );
  }

  return (
    <div className="container pt-16">
      <div className="lg:flex justify-between items-center">
        <div>
          <h3 className="font-bold text-2xl">Featured Products</h3>
          <p className="text-gray-600 mt-2">
            Experience agriculture goodness online! Explore our selection of
            fruits and vegetables seeds and chemicals at the best prices. Shop
            now!
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
        <div>
          <img
            src="images/Seeds_Banner.jpg"
            alt="img"
            className="w-full h-full object-cover"
          />
        </div>
        {products
          .filter((product) => product.category === "Seed")
          .slice(0, 4)
          .map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
        <div>
          <img
            src="images/chemicals.png"
            alt="img"
            className="w-full h-full object-cover"
          />
        </div>
        {products
          .filter((product) => product.category === "Chemical")
          .slice(0, 4)
          .map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>

      <div className="container w-full flex justify-center mt-6">
        <Link to="/shop/products">
          <div className="bg-accent hover:bg-accentDark text-white rounded-full flex items-center gap-4 px-4 py-2 text-sm sm:text-base cursor-pointer">
            View All Products <BsArrowRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeatureSectionSeeds;

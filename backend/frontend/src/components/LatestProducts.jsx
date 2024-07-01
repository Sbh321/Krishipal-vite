import ProductCard from "./ProductCard";
import { Link, useParams } from "react-router-dom";
import { useGetLatestProductQuery } from "../slices/productsApiSlice.js";

import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const LatestProducts = () => {
  const { data: products, isLoading, error } = useGetLatestProductQuery();

  return (
    <div className="sm:container mx-5 pt-16">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <CircularProgress size={64} style={{ color: "#718096" }} />
          <span className="text-gray-600">Loading ...</span>
        </div>
      ) : error ? (
        <Alert severity="error">Error! Please Reload the page</Alert>
      ) : (
        <div className="px-5">
          <div className="lg:flex justify-between items-center">
            <div>
              <h3 className="font-medium text-2xl">Latest Products</h3>
              <p className="text-gray-600 mt-2">Buy our latest product</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 pt-8 gap-4">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestProducts;

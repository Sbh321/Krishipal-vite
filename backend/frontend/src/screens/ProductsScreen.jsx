import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import ProductCard from "../components/ProductCard";
import Paginate from "../components/Paginate";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import OnScrollCartIcon from "../components/OnScrollCartIcon";
import { useParams } from "react-router-dom";

const ProductsScreen = () => {
  useEffect(() => {
    document.title = "All Products - Krishipal";
  }, []);

  const { pageNumber } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({ pageNumber });

  return (
    <div className="p-4 sm:container mx-5">
      <OnScrollCartIcon />
      <h1 className="text-4xl text-accent">All Products</h1>
      <form className="mb-4">
        <input
          type="text"
          placeholder="Search Products..."
          className=" px-4 py-2 rounded-lg text-2xl border border-gray-500 text-green-800 focus:outline-none focus:ring focus:border-green-400 m-auto w-80 mt-3"
        />
      </form>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 mt-[10px]">
          <CircularProgress size={64} style={{ color: "#718096" }} />
          <span className="text-gray-600">Loading ...</span>
        </div>
      ) : isError ? (
        <Alert severity="error" className="mt-[10px]">
          Error! Please Reload the page
        </Alert>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <Paginate pages={data.pages} page={data.page} />
        </>
      )}
    </div>
  );
};

export default ProductsScreen;

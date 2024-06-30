import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import ProductCard from "../components/ProductCard";
import Paginate from "../components/Paginate";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import OnScrollCartIcon from "../components/OnScrollCartIcon";

const ProductsScreen = () => {
  useEffect(() => {
    document.title = "All Products - Krishipal";
  }, []);

  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [keyword, setKeyword] = useState(queryParams.get("keyword") || "");
  const [pageNumber, setPageNumber] = useState(
    Number(queryParams.get("page")) || 1
  );

  const { data, isLoading, isError } = useGetProductsQuery({
    keyword: keyword || undefined,
    pageNumber: pageNumber,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/products?keyword=${keyword}&page=1`;
  };

  const handlePageChange = (page) => {
    setPageNumber(page);
    window.location.href = `/products?keyword=${keyword}&page=${page}`;
  };

  return (
    <div className="p-4 container">
      <OnScrollCartIcon />
      <h1 className="text-4xl text-accent">All Products</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search Products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
          <Paginate
            pages={data.totalPages}
            page={pageNumber}
            onPageChange={handlePageChange}
            keyword={keyword}
          />
        </>
      )}
    </div>
  );
};

export default ProductsScreen;

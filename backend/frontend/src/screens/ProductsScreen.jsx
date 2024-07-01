import { useEffect, useState } from "react";
import {
  useGetProductsQuery,
  useGetCategoryProductsQuery,
} from "../slices/productsApiSlice";
import { useGetCategoriesQuery } from "../slices/categoryApiSlice";
import ProductCard from "../components/ProductCard";
import Paginate from "../components/Paginate";
import PaginateCat from "../components/PaginateCat";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import OnScrollCartIcon from "../components/OnScrollCartIcon";
import { useParams, useNavigate, Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const ProductsScreen = () => {
  useEffect(() => {
    document.title = "All Products - Krishipal";
  }, []);

  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  const {
    data: categoriesData,
    isLoading: categoryLoading,
    refetch,
  } = useGetCategoriesQuery();

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    } else {
      refetch();
    }
  }, [categoriesData, refetch]);

  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const { category: categoryParam } = useParams();

  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [categoryParam]);

  const [urlKeyword, setUrlKeyword] = useState("");

  const {
    data: allProductsData,
    isLoading,
    isError,
  } = useGetProductsQuery({
    keyword: urlKeyword,
    pageNumber,
  });

  const { data: categoryWiseData, isLoading: categoryLoadingData } =
    useGetCategoryProductsQuery({
      category,
      pageNumber,
    });

  const submitHandler = (e) => {
    e.preventDefault();
    setCategory("all");

    if (urlKeyword.trim()) {
      navigate(`/shop/products/search/${urlKeyword}`);
    } else {
      navigate(`/shop/products`);
    }
  };

  return (
    <div className="p-4 sm:container mx-auto">
      <OnScrollCartIcon />
      <h1 className="text-4xl text-accent mb-4">All Products</h1>
      <form className={`mb-4 flex justify-center`} onSubmit={submitHandler}>
        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search Products..."
              onChange={(e) => setUrlKeyword(e.target.value)}
              value={urlKeyword}
              className="
                    px-4 py-2
                    sm:px-3 sm:py-2
                    md:px-4 md:py-2
                    lg:px-5 lg:py-3
                    rounded-lg text-xl sm:text-lg md:text-xl lg:text-2xl
                    border border-gray-500
                    text-green-800
                    focus:outline-none focus:ring focus:border-green-400
                    w-full sm:w-60 md:w-80 lg:w-96
                  "
            />

            <button
              type="submit"
              className="px-4 py-2 bg-accent text-white rounded-lg"
            >
              <span className="hidden sm:block">Search</span>
              <IoSearch className="text-2xl sm:hidden" />
            </button>
            {urlKeyword && (
              <Link to="/shop/products">
                <button
                  className="px-4 py-2 bg-accent text-white rounded-lg"
                  onClick={() => setUrlKeyword("")}
                >
                  Clear
                </button>
              </Link>
            )}
          </div>

          <div className="flex gap-6 items-center">
            <label
              className="hidden text-gray-700 mb-2 w-1/4 sm:block"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                navigate(`/shop/products/category/${e.target.value}`);
                setUrlKeyword("");
              }}
              className="w-3/4 p-2 border border-gray-300 rounded text-gray-700"
            >
              <option value="all">All</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
      {isLoading || categoryLoadingData ? (
        <div className="flex items-center justify-center gap-2 mt-10">
          <CircularProgress size={64} style={{ color: "#718096" }} />
          <span className="text-gray-600">Loading ...</span>
        </div>
      ) : isError ? (
        <Alert severity="error" className="mt-10">
          Error! Please Reload the page
        </Alert>
      ) : (
        <>
          {category === "all" ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 pt-8 gap-4">
                {allProductsData.products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <Paginate
                pages={allProductsData.pages}
                page={allProductsData.page}
                keyword={urlKeyword ? urlKeyword : ""}
              />
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 pt-8 gap-4">
                {categoryWiseData.products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
              <PaginateCat
                pages={categoryWiseData.pages}
                page={categoryWiseData.page}
                category={category}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsScreen;

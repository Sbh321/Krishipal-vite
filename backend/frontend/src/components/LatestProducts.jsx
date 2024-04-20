import ProductCard from "./ProductCard";
import { Link, useParams } from "react-router-dom";
import { useGetLatestProductQuery } from "../slices/productsApiSlice.js";

// import Loader from "../components/Loader.jsx";
// import Message from "../components/Message.jsx";

const LatestProducts = () => {
  const { data: products, isLoading, error } = useGetLatestProductQuery();
  console.log(products);

  return (
    <div className="container pt-16">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          <div className="lg:flex justify-between items-center">
            <div>
              <h3 className="font-medium text-2xl">Latest Products</h3>
              <p className="text-gray-600 mt-2">Buy our latest product</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
            {products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LatestProducts;

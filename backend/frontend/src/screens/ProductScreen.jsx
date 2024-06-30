import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice.js";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { addToCart } from "../slices/cartSlice.js";
import OnScrollCartIcon from "../components/OnScrollCartIcon";
import { useEffect } from "react";

const ProductScreen = () => {
  useEffect(() => {
    document.title = "Krishipal | Product Details";
  }, []);

  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    if (product.countInStock === 0) {
      toast.error("Product out of stock");
    } else {
      dispatch(addToCart({ ...product, qty }));
      toast.success("Product added to cart");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div>
      <OnScrollCartIcon />
      <div className="container my-3">
        <div className="flex px-3">
          <Link to="/">
            <button className="text-white font-medium lg:w-[100px] lg:h-[40px] w-[60px] h-[30px] bg-accent border hover:border-slate-600 hover:border-2 hover:bg-white transition-all hover:text-slate-600 rounded-full">
              Back
            </button>
          </Link>

          {/* {userInfo?.isAdmin && (
          <div className="flex justify-end w-full">
            <div className="flex gap-3">
              <button className="text-white font-medium lg:w-[100px] lg:h-[40px] w-[60px] h-[30px] bg-accent border hover:border-slate-600 hover:border-2 hover:bg-white transition-all hover:text-slate-600 rounded-l-full">
                Edit
              </button>

              <button className="text-white font-medium lg:w-[100px] lg:h-[40px] w-[60px] h-[30px] bg-accent border hover:border-slate-600 hover:border-2 hover:bg-white transition-all hover:text-slate-600 rounded-r-full">
                Delete
              </button>
            </div>
          </div>
        )} */}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 mt-[10px]">
            <CircularProgress size={64} style={{ color: "#718096" }} />
            <span className="text-gray-600">Loading ...</span>
          </div>
        ) : error ? (
          <Alert severity="error" className="mt-[10px]">
            Error! Please Reload the page
          </Alert>
        ) : (
          <>
            <div className="md:flex md:gap-2 mt-[10px]">
              <div className="lg:w-3/6 lg:pr-[30px]">
                <img
                  src={`http://localhost:10000${product.image}`}
                  alt={product.name}
                  className="w-[100%]  h-[90%] object-cover rounded-xl"
                />
              </div>

              <div className="lg:w-2/6 pr-8">
                <div className="bg-white">
                  <div className="px-4 py-2 border-b border-gray-300">
                    <p className="text-3xl">{product.name}</p>
                  </div>
                  <div className="px-4 py-2 lg:flex gap-2 border-b border-gray-300">
                    <div className="text-yellow-400 flex gap-[2px] text-[20px]">
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>
                  </div>
                  <div className="px-4 py-2 border-b border-gray-300">
                    <p>Price: Rs. {product.price}</p>
                  </div>
                  <div className="px-4 py-2">
                    <p>Description: {product.description}</p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/6 lg:mt-0 mt-8">
                <div className="border border-gray-300 rounded-md">
                  <div className="flex py-2 px-4 border-b border-gray-300">
                    <p>Price:</p>
                    <div className="flex items-center justify-center flex-grow">
                      <strong>Rs. {product.price}</strong>
                    </div>
                  </div>

                  <div className="flex py-2 px-4 border-b border-gray-300">
                    <p>Status:</p>
                    <div className="flex items-center justify-center flex-grow">
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </div>
                  </div>

                  <div className="py-2 px-4 border-b border-gray-300">
                    {product.countInStock > 0 && (
                      <div className="flex">
                        <label htmlFor="quantity">Quantity:</label>
                        <div className="flex items-center justify-center flex-grow">
                          <select
                            id="quantity"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400 bg-white"
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="py-2 px-4">
                    <button
                      className="bg-accent hover:bg-accentDark text-white px-4 py-2 mt-2 rounded cursor-pointer"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="review mt-8 lg:mt-0">
              <p className="text-3xl font-bold mb-4">Review</p>

              <div className="md:flex gap-5">
                <div className="md:w-1/2">
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-2xl mb-4">Latest reviews</p>
                  </div>
                  {product.reviews.length === 0 && (
                    <Alert severity="error" className="my-[10px]">
                      Be first to review this product
                    </Alert>
                  )}
                  {product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-gray-100 p-4 rounded-lg mb-4"
                    >
                      <p className="font-semibold">{review.name}</p>
                      <div className="flex items-center">
                        <div className="text-yellow-400 flex gap-[2px] text-[20px]">
                          <Rating value={product.rating} />
                        </div>
                        <p className="text-gray-600 ml-2">
                          {review.createdAt.substring(0, 10)}
                        </p>
                      </div>
                      <p className="mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <div className="md:w-1/2">
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <p className="text-2xl mb-4">Write a Customer Review</p>
                    {loadingProductReview && (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-700"></div>
                        <span className="text-gray-600">Loading ...</span>
                      </div>
                    )}
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <div className="my-4">
                          <label htmlFor="rating" className="block">
                            Rating
                          </label>
                          <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </select>
                        </div>
                        <div className="my-4">
                          <label htmlFor="comment" className="block">
                            Comment
                          </label>
                          <textarea
                            id="comment"
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:border-blue-500"
                          ></textarea>
                        </div>
                        <button
                          className="bg-accent hover:bg-accentDark text-white px-6 py-3 rounded"
                          type="submit"
                        >
                          Submit
                        </button>
                      </form>
                    ) : (
                      <p className="mt-4">
                        Please{" "}
                        <a
                          href="/login"
                          className="text-blue-500 hover:underline"
                        >
                          sign in
                        </a>{" "}
                        to write a review
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductScreen;

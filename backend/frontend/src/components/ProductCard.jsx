import { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "./ProductCard.css";
import { addToCart } from "../slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (product.countInStock === 0) {
      toast.error("Product out of stock");
    } else {
      const qty = 1;
      dispatch(addToCart({ ...product, qty }));
      toast.success("Product added to cart");
    }
  };

  return (
    <div className="border border-gray-200 hover:border-gray-300 hover:scale-105 transition-transform rounded-lg relative">
      <Link to={`/product/${product._id}`}>
        <img
          src={`http://localhost:8000${product.image}`}
          alt="img"
          className="rounded-lg cursor-pointer"
        />
      </Link>

      <div className="space-y-2 relative p-4">
        <div className="text-yellow-400 flex gap-[2px] text-[20px]">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        <Link to={`/product/${product._id}`}>
          <h3 className="font-medium hover:underline">{product.name}</h3>
        </Link>

        <h3 className="text-2xl font-medium text-red-600">
          Rs {product.price}
        </h3>

        {product.countInStock > 0 && (
          <div
            onClick={() => setIsClicked(true)}
            onAnimationEnd={() => setIsClicked(false)}
          >
            <button
              className={`absolute top-2 right-2 ☐ bg-accent hover:bg-accentDark text-white text-[28px] w-[50px] h-[50px] rounded-full grid place-items-center cursor-pointer ${
                isClicked && "animate-swing"
              }`}
              onClick={addToCartHandler}
            >
              <AiOutlineShopping />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

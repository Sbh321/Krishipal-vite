// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="border border-gray-200 hover:border-gray-300 hover:scale-105 transition-transform rounded-lg relative">
      <Link to={`/product/${product._id}`}>
        <img
          // src={product.image}
          // src="/uploads\image-1713608103969.jpeg"
          // src="http://localhost:8000/uploads\image-1713608103969.jpeg"
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
        <button
          className={`absolute top-0 right-2 ☐ bg-accent hover:bg-accentDark text-white text-[28px] w-[50px] h-[50px] rounded-full grid place-items-center cursor-pointer ${
            isClicked && "animate-swing"
          }`}
          onClick={() => setIsClicked(true)}
          onAnimationEnd={() => setIsClicked(false)}
        >
          <AiOutlineShopping className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

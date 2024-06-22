import { AiFillStar, AiOutlineStar, AiOutlineShopping } from "react-icons/ai";
import toast from "react-hot-toast";

const ProductCardSample = ({ img, name, price }) => {
  const addProductToCart = () => {
    toast.success("Added to Cart!");
    console.log("Product added to cart");
    addToCart({ img, name, price });
  };

  return (
    <div className="border border-gray-200 hover:border-gray-300 hover:scale-105 transition-transform rounded-lg relative">
      <img
        src={img}
        alt={name}
        className="w-full h-100 object-cover rounded-t-lg cursor-pointer"
      />
      <div className="space-y-2 relative p-4">
        <div className="text-yellow-400 flex gap-[2px] text-[20px]">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>
        <h3 className="font-medium">{name}</h3>

        <h3 className="text-2xl font-medium text-red-600">{price}</h3>
        <button className="absolute top-0 right-2 ☐ bg-accent text-white text-[28px] w-[50px] h-[50px] rounded-full grid place-items-center cursor-pointer">
          <AiOutlineShopping />
        </button>
      </div>
    </div>
  );
};

export default ProductCardSample;

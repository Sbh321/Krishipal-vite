import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="container">
      <div className="grid xl:grid-cols-3 xl:grid-rows-2 gap-8">
        <div className="xl:col-span-2 xl:row-start-1 xl:row-end-[-1] relative">
          <img
            // src="https://thebravecoders-ecommerce-website-react-tailwind.vercel.app/hero__1.webp"
            src="images/CabbageSeed.jpg"
            alt="img"
            className="w-full max-h-[600px] object-cover rounded-lg"
          />

          <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[50%] -translate-y-[50%] sm:space-y-4">
            <p className="text-2xl hidden sm:block">100% Organic</p>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold">
              Cabbage Seed
            </h2>
            <p className="text-gray-500 text-xl pt-4 sm:pt-8">Starting At</p>
            <div className="font-medium text-red-600 text-2xl sm:text-4xl pb-4 sm:pb-8">
              Rs. 150
            </div>
            <Link to="/product/667652175ca24cee605a8f6f">
              <div
                className="bg-accent hover:bg-accentDark text-white rounded-full w-fit flex items-center
gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3 cursor-pointer"
              >
                Shop Now <BsArrowRight />
              </div>
            </Link>
          </div>
        </div>

        <div className="relative">
          <img
            className="h-full w-full object-cover rounded-lg"
            // src="https://thebravecoders-ecommerce-website-react-tailwind.vercel.app/hero__2.webp"
            src="images/BitterGroudSeed.png"
            alt="img"
          />

          <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[50%] -translate-y-[50%] sm:space-y-4">
            <h2 className="text-xl md:text-3xl font-bold">Bitter Gourd Seed</h2>
            <p className="text-gray-500 text-xl pt-4 sm:pt-8">Starting At</p>
            <div className="font-medium text-red-600 text-2xl sm:text-4xl pb-4 sm:pb-8">
              Rs 200
            </div>
            <Link to="/product/6676f366b391a0d4b9e65217">
              <div
                className="bg-accent hover:bg-accentDark text-white rounded-full w-fit flex items-center
gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3 cursor-pointer"
              >
                Shop Now <BsArrowRight />
              </div>
            </Link>
          </div>
        </div>

        <div
          className="relative container rounded-lg"
          style={{ backgroundColor: "#F8DE95" }}
        >
          {/* <img
            className="h-full w-full object-cover rounded-lg"
            src="https://thebravecoders-ecommerce-website-react-tailwind.vercel.app/hero__3.webp"
            alt="img"
          /> */}

          <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[50%] -translate-y-[50%] sm:space-y-4">
            <Link to={"/shop/products"}>
              <div
                className="bg-accent hover:bg-accentDark text-white rounded-full w-fit flex items-center
gap-4 px-4 py-2 text-[14px] sm:px-6 sm:py-3 cursor-pointer"
              >
                View All Products <BsArrowRight />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

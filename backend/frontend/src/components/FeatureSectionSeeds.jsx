import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const FeatureSectionSeeds = () => {
  const data = [
    {
      id: 0,
      img: "images/img_image_0.jpeg",
      name: "Luffa Gourd Seed",
      price: "Rs 150",
    },
    {
      id: 1,
      img: "images/img_image_1.jpeg",
      name: "Cabbage Seed",
      price: "Rs 130",
    },
    {
      id: 2,
      img: "images/img_image_2.jpeg",
      name: "Tomato Seed",
      price: "Rs 170",
    },
    {
      id: 4,
      img: "images/img_image_3.jpeg",
      name: "Cucumber Seed",
      price: "Rs 210",
    },
  ];

  return (
    <div className="container pt-16">
      <div className="lg:flex justify-between items-center">
        <div>
          <h3 className="font-medium text-2xl">Featured products</h3>
          <p className="text-gray-600 mt-2">
            Experience farm-fresh goodness online! Explore our selection of
            fruits and vegetables seeds at the best prices. Shop now!
          </p>
        </div>

        {/* <div className="space-x-4 mt-8 lg:mt-0">
          <button className="feature_btn">Fruits</button>
          <button className="text-gray-600 hover: text-accent">
            Vegetables
          </button>
          <button className="text-gray-600 hover: text-accent">
            Bread & Bakery
          </button>
        </div> */}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
        <div>
          <img
            src="images/Seeds_Banner.jpg"
            alt="img"
            className="w-full h-full object-cover"
          />
        </div>
        {data.map((el) => (
          <ProductCard
            key={el.id}
            img={el.img}
            name={el.name}
            price={el.price}
          />
        ))}
      </div>
      <div className="container w-full flex justify-center mt-[25px]">
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
  );
};

export default FeatureSectionSeeds;

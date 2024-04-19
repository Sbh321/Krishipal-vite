import ProductCard from "./ProductCard";

const LatestProducts = () => {
  const data = [
    {
      id: 0,
      img: "images/img_image_0.jpeg",
      name: "Luffa Gourd Seed",
      price: "Rs. 150",
    },
    {
      id: 1,
      img: "images/img_image_1.jpeg",
      name: "Cabbage Seed",
      price: "Rs. 130",
    },
    {
      id: 2,
      img: "images/img_image_2.jpeg",
      name: "Tomato Seed",
      price: "Rs. 110",
    },
    {
      id: 3,
      img: "images/img_image_3.jpeg",
      name: "Cucumber Seed",
      price: "Rs. 100",
    },
    {
      id: 4,
      img: "images/img_image_4.jpeg",
      name: "Cabbage Seed",
      price: "Rs. 130",
    },
    {
      id: 5,
      img: "images/img_image_5.jpeg",
      name: "Green Chilli Seed",
      price: "Rs. 210",
    },
    {
      id: 6,
      img: "images/img_image_6.jpeg",
      name: "Pumpkin Seed",
      price: "Rs. 180",
    },
    {
      id: 7,
      img: "images/img_image_7.jpeg",
      name: "Cauliflower Seed",
      price: "Rs. 170",
    },
    {
      id: 8,
      img: "images/img_image_0.jpeg",
      name: "Luffa Gourd Seed",
      price: "Rs. 150",
    },
    {
      id: 9,
      img: "images/img_image_1.jpeg",
      name: "Cabbage Seed",
      price: "Rs. 130",
    },
  ];

  return (
    <div className="container pt-16">
      <div className="lg:flex justify-between items-center">
        <div>
          <h3 className="font-medium text-2xl">Latest Products</h3>
          <p className="text-gray-600 mt-2">Buy our latest product</p>
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
        {/* <div>
          <img
            src="https://thebravecoders-ecommerce-website-react-tailwind.vercel.app/feature__1.webp"
            alt="img"
            className="w-full h-full object-cover"
          />
        </div> */}
        {data.map((el) => (
          <ProductCard
            key={el.id}
            img={el.img}
            name={el.name}
            price={el.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;

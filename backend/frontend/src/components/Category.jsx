import CategoryCard from "./CategoryCard";

const Category = () => {
  const data = [
    {
      id: 0,
      name: "seed",
      count: 10,
      img: "images/Seeds.jpg",
    },
    // {
    //   id: 2,
    //   name: "seed",
    //   count: 10,
    //   img: "https://thebravecoders-ecommerce-website-react-tailwind.vercel.app/category__1.webp",
    // },
    // {
    //   id: 3,
    //   name: "seed",
    //   count: 10,
    //   img: "https://thebravecoders-ecommerce-website-react-tailwind.vercel.app/category__1.webp",
    // },
    // {
    //   id: 4,
    //   name: "seed",
    //   count: 10,
    //   img: "https://thebravecoders-ecommerce-website-react-tailwind.vercel.app/category__1.webp",
    // },
  ];
  return (
    <div className="container my-7">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((el) => (
          <CategoryCard
            key={el.id}
            img={el.img}
            name={el.name}
            count={el.count}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;

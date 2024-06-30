import CategoryCard from "./CategoryCard";
import { useGetCategoriesQuery } from "../slices/categoryApiSlice";

const Category = () => {
  const { data = [], error, isLoading } = useGetCategoriesQuery();

  return (
    <div className="container my-7">
      <h3 className="font-bold text-2xl">Categories</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        {data.map((el) => (
          <CategoryCard
            key={el._id}
            img={el.image}
            name={el.name}
            // count={el.count}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;

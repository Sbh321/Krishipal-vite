import { Link } from "react-router-dom";

const PaginateCat = ({ pages, page, category }) => {
  // If there's only one page, don't show pagination
  if (pages <= 1) return null;

  return (
    <div className="mt-4 flex justify-center">
      {[...Array(pages).keys()].map((x) => (
        <Link
          key={x + 1}
          to={`/shop/products/category/${category}/page/${x + 1}`}
          className={`mx-1 px-3 py-1 rounded border transition duration-150 ${
            x + 1 === page
              ? "bg-accent text-white"
              : "bg-white text-accent hover:bg-green-200"
          }`}
        >
          {x + 1}
        </Link>
      ))}
    </div>
  );
};

export default PaginateCat;

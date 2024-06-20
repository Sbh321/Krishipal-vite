import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  if (pages <= 1) return null;

  return (
    <div className="mt-4 flex justify-center">
      {[...Array(pages).keys()].map((x) => {
        const pageNumber = x + 1;
        const link = !isAdmin
          ? keyword
            ? `/search/${keyword}/page/${pageNumber}`
            : `/page/${pageNumber}`
          : `/admin/productlist/${pageNumber}`;

        return (
          <Link
            key={pageNumber}
            to={link}
            className={`mx-1 px-3 py-1 rounded border transition duration-150 ${
              pageNumber === page
                ? "bg-accent text-white"
                : "bg-white text-accent hover:bg-green-200"
            }`}
          >
            {pageNumber}
          </Link>
        );
      })}
    </div>
  );
};

export default Paginate;

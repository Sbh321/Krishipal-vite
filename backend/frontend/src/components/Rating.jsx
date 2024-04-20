import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="rating items-center flex gap-3">
      <div className="flex gap-1">
        <span>
          {value >= 1 ? (
            <FaStar size={18} />
          ) : value >= 0.5 ? (
            <FaStarHalfAlt size={18} />
          ) : (
            <FaRegStar size={18} />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <FaStar size={18} />
          ) : value >= 1.5 ? (
            <FaStarHalfAlt size={18} />
          ) : (
            <FaRegStar size={18} />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <FaStar size={18} />
          ) : value >= 2.5 ? (
            <FaStarHalfAlt size={18} />
          ) : (
            <FaRegStar size={18} />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <FaStar size={18} />
          ) : value >= 3.5 ? (
            <FaStarHalfAlt size={18} />
          ) : (
            <FaRegStar size={18} />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <FaStar size={18} />
          ) : value >= 4.5 ? (
            <FaStarHalfAlt size={18} />
          ) : (
            <FaRegStar size={18} />
          )}
        </span>
      </div>

      <span className="rating-text text-[16px] font-semibold">
        {text && text}
      </span>
    </div>
  );
};

export default Rating;

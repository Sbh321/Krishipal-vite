import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ img, title, id, date, comments }) => {
  const commentLength = comments.length;

  return (
    <div className="space-y-4 cursor-pointer p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-lg transition-all duration-200">
      <Link to={`/blogs/${id}`}>
        <img
          className="rounded-lg hover:scale-105 transition-transform object-cover w-full h-64"
          src={`${import.meta.env.VITE_APP_API_URL}${img}`}
          alt="post"
        />
        <div className="text-accent font-medium mt-2 flex justify-between">
          <span>{date.substring(0, 10)}</span>
          {commentLength > 0 && (
            <span>
              {commentLength} {commentLength === 1 ? "Comment" : "Comments"}
            </span>
          )}
        </div>
        <h3 className="font-semibold text-xl mt-2 hover:underline">{title}</h3>
      </Link>
    </div>
  );
};

export default BlogCard;

import React from "react";
import { Link } from "react-router-dom";

// const BlogCard = ({ img, title, date, comment }) => {
const BlogCard = ({ img, title, id }) => {
  return (
    <div className="space-y-4 cursor-pointer">
      <Link to={`/blogs/${id}`}>
        <img
          className="rounded-lg hover:scale-105 transition-transform object-cover w-full h-64"
          src={`http://localhost:10000${img}`}
          alt="post"
        />
        <div className="text-accent font-medium">
          {/* <span>{date} / </span>
        <span>{comment} Comments</span> */}
        </div>
        <h3 className="font-bold text-xl">{title}</h3>
      </Link>
    </div>
  );
};

export default BlogCard;

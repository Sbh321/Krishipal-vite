import React from "react";
import BlogCard from "./BlogCard";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useGetLatestBlogQuery } from "../slices/blogsApiSlice.js";

const Blogs = () => {
  // Fetching the latest blogs
  const { data: blogs, isLoading, error } = useGetLatestBlogQuery();

  return (
    <div className="container pt-16">
      <h2 className="font-bold text-2xl">Latest News</h2>
      <p className="text-gray-500">
        Present posts in a best way to highlight interesting moments of your
        blog.
      </p>

      {/* Handle loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center mt-8">
          <CircularProgress size={64} style={{ color: "#718096" }} />
        </div>
      ) : error ? (
        /* Handle error state */
        <Alert severity="error" className="mt-8">
          Error fetching blogs: {error.message || "Unknown error"}
        </Alert>
      ) : (
        /* Display the blogs once loaded */
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 pt-8">
          {blogs?.length > 0 ? (
            blogs.map((el) => (
              <BlogCard
                key={el._id}
                id={el._id}
                img={el.image}
                title={el.title}
                // date={el.date}
                // comment={el.comment}
              />
            ))
          ) : (
            /* Handle case when there are no blogs */
            <p className="text-gray-500 text-center col-span-full">
              No blogs available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;

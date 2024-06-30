import BlogCard from "../components/BlogCard";
import { useGetBlogsQuery } from "../slices/blogsApiSlice";
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const BlogsScreen = () => {
  useEffect(() => {
    document.title = "Krishipal | Explore Blogs";
  }, []);

  const { data: blogs, isLoading, error } = useGetBlogsQuery();

  return (
    <div className="container pt-16">
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <CircularProgress size={64} style={{ color: "#718096" }} />
          <span className="text-gray-600">Loading ...</span>
        </div>
      ) : error ? (
        <Alert severity="error">Error! Please Reload the page</Alert>
      ) : (
        <div className="px-5">
          <div className="lg:flex justify-between items-center">
            <div>
              <h3 className="font-medium text-2xl">View interesting blogs</h3>
              <p className="text-gray-600 mt-2">Click to read them</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 pt-8 gap-4">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                id={blog._id}
                img={blog.image}
                title={blog.title}
                // date={el.date}
                // comment={el.comment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsScreen;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import {
  useGetBlogByIdQuery,
  useCreateCommentMutation,
} from "../slices/blogsApiSlice.js";

const BlogScreen = () => {
  const { id: blogId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  const { data: blog, isLoading, refetch, error } = useGetBlogByIdQuery(blogId);

  const [createComment, { isLoading: loadingComment }] =
    useCreateCommentMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createComment({ blogId, comment }).unwrap();
      refetch();
      toast.success("Comment Submitted");
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container my-3">
      <div className="flex px-3">
        <Link to="/blogs">
          <button className="text-white font-medium lg:w-[100px] lg:h-[40px] w-[60px] h-[30px] bg-accent border hover:border-slate-600 hover:border-2 hover:bg-white transition-all hover:text-slate-600 rounded-full">
            Back
          </button>
        </Link>

        {/* {userInfo?.isAdmin && (
          <div className="flex justify-end w-full">
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/edit-blog/${blogId}`)}
                className="text-white font-medium lg:w-[100px] lg:h-[40px] w-[60px] h-[30px] bg-accent border hover:border-slate-600 hover:border-2 hover:bg-white transition-all hover:text-slate-600 rounded-l-full"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to delete this blog?")
                  ) {
                    // Dispatch action to delete blog
                  }
                }}
                className="text-white font-medium lg:w-[100px] lg:h-[40px] w-[60px] h-[30px] bg-accent border hover:border-slate-600 hover:border-2 hover:bg-white transition-all hover:text-slate-600 rounded-r-full"
              >
                Delete
              </button>
            </div>
          </div>
        )} */}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 mt-[10px]">
          <CircularProgress size={64} style={{ color: "#718096" }} />
          <span className="text-gray-600">Loading ...</span>
        </div>
      ) : error ? (
        <Alert severity="error" className="mt-[10px]">
          Error! Please Reload the page
        </Alert>
      ) : (
        <>
          <div className="md:flex md:gap-2 mt-[10px]">
            <div className="lg:w-3/6 lg:pr-[30px]">
              <img
                src={`http://localhost:8000${blog.image}`}
                alt={blog.title}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>

            <div className="lg:w-3/6">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-3xl font-bold">{blog.title}</h1>
                <p className="text-gray-500 mt-2">
                  {blog.createdAt.substring(0, 10)}
                </p>
                <div className="mt-4">
                  <p>{blog.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="review mt-8 lg:mt-0">
            <h2 className="text-3xl font-bold mb-4">Comments</h2>

            <div className="md:flex gap-5">
              <div className="md:w-1/2">
                {blog.comments.length === 0 && (
                  <Alert severity="info" className="my-4">
                    No comments yet. Be the first to comment on this blog!
                  </Alert>
                )}
                {blog.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-gray-100 p-4 rounded-lg mb-4"
                  >
                    <p className="font-semibold">{comment.name}</p>
                    <p className="text-gray-600 mb-2">
                      {comment.createdAt.substring(0, 10)}
                    </p>
                    <p>{comment.comment}</p>
                  </div>
                ))}
              </div>

              <div className="md:w-1/2">
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h3 className="text-2xl mb-4">Write a Comment</h3>
                  {loadingComment && (
                    <div className="flex items-center justify-center gap-2">
                      <CircularProgress size={32} />
                      <span className="text-gray-600">Submitting ...</span>
                    </div>
                  )}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className="my-4">
                        <label htmlFor="comment" className="block">
                          Comment
                        </label>
                        <textarea
                          id="comment"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="border border-gray-300 rounded w-full px-4 py-2 focus:outline-none focus:border-blue-500"
                        ></textarea>
                      </div>
                      <button
                        className="bg-accent hover:bg-accentDark text-white px-6 py-3 rounded"
                        type="submit"
                      >
                        Submit
                      </button>
                    </form>
                  ) : (
                    <p className="mt-4">
                      Please{" "}
                      <Link
                        to="/login"
                        className="text-blue-500 hover:underline"
                      >
                        sign in
                      </Link>{" "}
                      to write a comment
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogScreen;

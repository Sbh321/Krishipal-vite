import { BLOGS_URL } from "../constants.js";
import { apiSlice } from "./apiSlice.js";

export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLatestBlog: builder.query({
      query: () => ({ url: `${BLOGS_URL}/latest` }),
      keepUnusedDataFor: 5,
    }),

    getBlogs: builder.query({
      query: () => ({ url: BLOGS_URL }),
      providesTags: ["Blogs"],
      keepUnusedDataFor: 5,
    }),

    getBlogById: builder.query({
      query: (blogId) => ({ url: `${BLOGS_URL}/${blogId}` }),
      providesTags: ["Blogs"],
      keepUnusedDataFor: 5,
    }),

    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: BLOGS_URL,
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blogs"],
    }),

    updateBlog: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),

    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),

    createComment: builder.mutation({
      query: (data) => ({
        url: `${BLOGS_URL}/${data.blogId}/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetLatestBlogQuery,
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useCreateCommentMutation,
} = blogsApiSlice;

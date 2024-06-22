import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants"; // Adjust the import according to your project structure

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to add a new category
    addCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: newCategory,
      }),
    }),
    // Mutation to update an existing category
    updateCategory: builder.mutation({
      query: (data) => {
        return {
          url: `${CATEGORIES_URL}/${data.categoryId}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Categories"],
    }),

    // Mutation to delete a category by ID
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    // Query to get all categories
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`,
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),
    // Query to get a single category by ID
    getCategoryById: builder.query({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery, // Export the query hook for fetching categories
  useGetCategoryByIdQuery, // Export the lazy query hook for fetching a single category
} = categoryApiSlice;

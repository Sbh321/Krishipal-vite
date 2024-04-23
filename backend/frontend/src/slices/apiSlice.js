import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants.js";

// Create a custom fetchBaseQuery with credentials set to "include"
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Products", "Order", "User"],
  endpoints: (builder) => ({}),
});

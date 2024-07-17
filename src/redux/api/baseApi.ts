import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  baseQuery: axiosBaseQuery({
    baseUrl: "https://portfolio-backend-ecru-two.vercel.app/api",
  }),
  endpoints: () => ({}),
  tagTypes: ["project", "skill", "blog"],
});

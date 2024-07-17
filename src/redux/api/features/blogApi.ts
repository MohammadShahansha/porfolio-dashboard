import { baseApi } from "../baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBlog: build.mutation({
      query: (data) => ({
        url: "/blog",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["blog"],
    }),

    getAllBlog: build.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["blog"],
    }),

    deleteBlog: build.mutation({
      query: (_id) => ({
        url: `/delete-blog/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: build.mutation({
      query: (arg) => ({
        url: `/update-blog/${arg?._id}`,
        method: "PUT",
        contentType: "application/json",
        data: arg,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;

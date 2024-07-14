import { baseApi } from "../baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation({
      query: (data) => ({
        url: "/project",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["project"],
    }),

    getAllProject: build.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["project"],
    }),

    deleteProject: build.mutation({
      query: (_id) => ({
        url: `/delete-project/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
    updateProject: build.mutation({
      query: (arg) => ({
        url: `/update-project/${arg?._id}`,
        method: "PUT",
        contentType: "application/json",
        data: arg,
      }),
      invalidatesTags: ["project"],
    }),
    // getSinglePets: build.query({
    //   query: (arg) => ({
    //     url: `/pets/${arg?.id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["pets"],
    // }),
    // availabelPets: build.query({
    //   query: () => ({
    //     url: "/availavle-pets",
    //     method: "GET",
    //   }),
    //   providesTags: ["pets"],
    // }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectQuery,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} = projectApi;

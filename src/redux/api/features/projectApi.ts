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

    // deletePet: build.mutation({
    //   query: (id) => ({
    //     url: `/pets/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["pets"],
    // }),
    // updatePet: build.mutation({
    //   query: (arg) => ({
    //     url: `/pets/${arg?.id}`,
    //     method: "PUT",
    //     data: arg,
    //   }),
    //   invalidatesTags: ["pets"],
    // }),
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

export const { useCreateProjectMutation, useGetAllProjectQuery } = projectApi;

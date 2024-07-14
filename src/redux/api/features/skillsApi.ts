import { baseApi } from "../baseApi";

const skillApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSkill: build.mutation({
      query: (data) => ({
        url: "/skill",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["skill"],
    }),

    getAllSkill: build.query({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
      providesTags: ["skill"],
    }),

    deleteSkill: build.mutation({
      query: (_id) => ({
        url: `/delete-skill/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["skill"],
    }),
    updateSkill: build.mutation({
      query: (arg) => ({
        url: `/update-skill/${arg?._id}`,
        method: "PUT",
        contentType: "application/json",
        data: arg,
      }),
      invalidatesTags: ["skill"],
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
  useCreateSkillMutation,
  useGetAllSkillQuery,
  useDeleteSkillMutation,
  useUpdateSkillMutation,
} = skillApi;

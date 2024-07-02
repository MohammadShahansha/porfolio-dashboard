import { baseApi } from "../../api/baseApi";

const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/login",
        method: "POST",
        contentType: "application/json",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;

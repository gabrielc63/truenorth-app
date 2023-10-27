import { apiSlice } from "../../app/api/apiSlice";

export const operationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postOperation: builder.mutation({
      query: (body) => ({
        url: "/api/v1/operations",
        method: "POST",
        body: { ...body },
      }),
    }),
  }),
});

export const { usePostOperationMutation } = operationsApiSlice;

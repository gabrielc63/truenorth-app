import { apiSlice } from "../../app/api/apiSlice";

export const getRecordsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecords: builder.query({
      query: (userId) => ({
        url: `/api/v1/users/${userId}/records`,
        method: "GET",
      }),
    }),
    deleteRecord: builder.mutation({
      query: (recordId) => ({
        url: `/api/v1/records/${recordId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetRecordsQuery, useDeleteRecordMutation } =
  getRecordsApiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSER_PURCHASE_API = "http://localhost:8000/api/v1/payment";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSER_PURCHASE_API,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    createCheckOutSession: builder.mutation({
      query: ({courseId}) => ({
        url: "",
        method: "POST",
        body: {courseId},
      }),
    }),
  }),
});

export const { useCreateCheckOutSessionMutation } = purchaseApi;

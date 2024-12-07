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

    getCourseDetailsWithStatus : builder.query({
        query : (courseId) =>({
            url : `/course/${courseId}/details-with-status`,
            method:"GET"
        })
    }),

    getPurchasesCourse : builder.query({
        query : () =>({
            url : '',
            method:"GET"
        })
    }),

  }),
});

export const { useCreateCheckOutSessionMutation, useGetCourseDetailsWithStatusQuery, useGetPurchasesCourseQuery } = purchaseApi;

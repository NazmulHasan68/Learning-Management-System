import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes:['Refetch_creator_course'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include", // Sends cookies with requests
  }),

  endpoints: (builder) => ({
    // Mutation for creating a course
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "/course", // Adjusted endpoint path
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags : ['Refetch_creator_course']
    }),

    // Query for fetching all courses created by the user
    getCreatorCourse: builder.query({
        query: () => ({
            url: "/course", 
            method: "GET",
          }),
        providesTags : ['Refetch_creator_course']
    })
      
  }),
});

// Export hooks for use in components
export const { useCreateCourseMutation, useGetCreatorCourseQuery } = courseApi;

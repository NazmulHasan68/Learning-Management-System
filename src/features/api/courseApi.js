import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_creator_course"],
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
      invalidatesTags: ["Refetch_creator_course"],
    }),

    // Query for fetching all courses created by the user
    getCreatorCourse: builder.query({
      query: () => ({
        url: "/course",
        method: "GET",
      }),
      providesTags: ["Refetch_creator_course"],
    }),

    editCourse: builder.mutation({
      query: ({formData, courseId}) => ({
        url: `/course/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_creator_course"],
    }),

    getCourseById : builder.query({
      query:(courseId)=>({
        url:`/course/${courseId}`,
        method:"GET",
      })
    }),


    createLecture: builder.mutation({
      query : ({lectureTitle, courseId})=>({
        url : `course/${courseId}/lecture`,
        method:"POST",
        body:{lectureTitle}
      })
    })
  }),
});

// Export hooks for use in components
export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation
} = courseApi;

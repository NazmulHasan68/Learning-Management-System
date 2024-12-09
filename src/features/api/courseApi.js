import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_creator_course", "Refech_Lecture"],
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


    getseachCourse : builder.query({
      query : ({searchQuery, categories, sortByPrice})=>{
        //build quire string
        let queryString = `/course/search?query=${encodeURIComponent(searchQuery)}`

        // append category
        if(categories && categories.length > 0){
          const categoriesString = categories.map(encodeURIComponent).json(",");
          queryString += `&categories=${encodeURIComponent(categoriesString)}`
        }

        // append sortByPrice if available
        if(sortByPrice){
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`
        }

        return {
          url : queryString,
          method : "GET",
        }
      }
    }),

    // Query for fetching all courses created by the user
    getCreatorCourse: builder.query({
      query: () => ({
        url: "/course",
        method: "GET",
      }),
      providesTags: ["Refetch_creator_course"],
    }),

    getPublichedCourse : builder.query({
      query:()=>({
        url:"/course/published-courses",
        method:"GET"      
      })
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
    }),

    getCourseLecture : builder.query({
      query : (courseId)=>({
        url : `course/${courseId}/lecture`,
        method : 'GET',
      }),
      providesTags:['Refech_Lecture']
    }),

    editeLecture : builder.mutation({
      query:({lectureTitle, videoInfo, isPreviewFree, courseId, lectureId})=>({
        url:`/course/${courseId}/lecture/${lectureId}`,
        method:"POST",
        body : {lectureTitle, videoInfo, isPreviewFree}
      })
    }),

    removeLecture : builder.mutation({
      query:(lectureId)=>({
        url:`/course/lecture/${lectureId}`,
        method:"DELETE",
      }),
      invalidatesTags:['Refech_Lecture']
    }),

    getLectureById : builder.query({
      query : (lectureId)=>({
        url : `/course/lecture/${lectureId}`,
        method: "GET"
      })
    }),
    publishCourse : builder.mutation({
      query : ({courseId, query}) =>({
        url : `/course/${courseId}?publish=${query}`,
        method : "PATCH"
      })
    })

  }),
});

// Export hooks for use in components
export const {
  useCreateCourseMutation,
  useGetseachCourseQuery,
  useGetCreatorCourseQuery,
  useGetPublichedCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditeLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
} = courseApi;

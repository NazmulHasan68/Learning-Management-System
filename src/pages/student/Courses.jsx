import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import Course from './Course'
import { useGetPublichedCourseQuery } from '@/features/api/courseApi'

export default function Courses() {
    const courses = [1, 2, 3, 4, 5, 6]

    const {data, isLoading, isError} = useGetPublichedCourseQuery()
    console.log(data);
  
    if(isError) return <h1>Some error while fetching courses.</h1>
  return (
    <div className='bg-gray-50'>
      <div className='max-w-7xl mx-auto p-6'>
        <h1 className='font-bold text-2xl md:text-3xl text-center mb-10'>Our courses</h1>
        <div className='grid grid-cols-l sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {
                isLoading? data?.courses.map((_, index)=>(
                <CourseSkeleton key={index}/>
                ))
                :(
                    data?.courses && data.courses.map((course, index)=>(
                        <Course key={index} course={course}/>
                    ) 
                ))
            }
        </div>
      </div>
    </div>
  )
}



const CourseSkeleton = () =>{
    return(
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden'>
            <Skeleton className='bg-slate-300 w-full h-36'/>
            <div className='px-5 py-1 mb-2 space-x-3'>
                <Skeleton className="h-6 w-3/4"/>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3 my-2'>
                        <Skeleton className='bg-slate-300 h-6 w-6 rounded-full'/>
                        <Skeleton className='bg-slate-300 h-4 w-20'/>
                    </div>
                    <Skeleton className='bg-slate-300 h-4 w-16 '/>
                </div>
                <Skeleton className='bg-slate-300 h-4 w-1/4'/>
            </div>
        </div>
    )
}

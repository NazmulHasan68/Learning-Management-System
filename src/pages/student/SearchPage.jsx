import React from 'react'
import Filter from './Filter'
import SearchResult from './SearchResult'
import { Skeleton } from '@/components/ui/skeleton'

export default function SearchPage() {
    const isLoading = false
    const isEmpty = false
  return (
    <div className='max-w-7xl mx-auto p-4 md:p-8'>
      <div className='my-8'>
        <h1>Result For "Html"</h1>
        <p>Showing result For {""}
            <span className='text-blue-600 italic font-semibold'>Frontend developer</span>
        </p>
      </div>
      <div className='flex flex-col md:flex-row gap-10'>
        <Filter/>
        <div className='flex-1'>
            {
                isLoading ? (Array.from(3).map((_, index)=>(
                    <CourseSkeleton key={index}/>
                ))) : isEmpty? (<CourseNotFound/>): 
                [1, 2, 3].map((course, index)=>(
                    <SearchResult course={course} key={index}/>
                ))
            }
        </div>
      </div>
    </div>
  )
}




const CourseSkeleton =()=>{
    return (
        <div>
            hello
        </div>
    )
}


const CourseNotFound = ()=>{
    return (
        <p>Course not found</p>
    )
}
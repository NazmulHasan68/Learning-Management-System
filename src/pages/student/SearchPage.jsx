import React, { useState } from 'react'
import Filter from './Filter'
import SearchResult from './SearchResult'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetseachCourseQuery } from '@/features/api/courseApi'
import { useSearchParams } from 'react-router-dom'

export default function SearchPage() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("query")
    const [selectedCategories, setSelectedCategories] = useState([])
    const [sortByPrice , setsortByPrice] = useState("")

    const {data, isLoading}= useGetseachCourseQuery({
        searchQuery:query,
        categories : selectedCategories,
        sortByPrice 
    })
    const isEmpty = !isLoading && data?.course?.length === 0

    const handleFilterChage = (categories, price) =>{
        setSelectedCategories(categories)
        setsortByPrice(price)
    }
  return (
    <div className='max-w-7xl mx-auto p-4 md:p-8 mt-4'>
      <div className='my-8'>
        <h1 className='font-bold text-xl md:text-lg'>Result For "{query}"</h1>
        <p>Showing result For {""}
            <span className='text-blue-600 italic font-semibold'>{query}</span>
        </p>
      </div>
      <div className='flex flex-col md:flex-row gap-10'>
        <Filter handleFilterChage={handleFilterChage}/>
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
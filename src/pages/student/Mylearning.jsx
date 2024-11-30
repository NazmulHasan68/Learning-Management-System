import React from 'react'
import Course from './Course'

export default function Mylearning() {
    const isloading = false
    const myLearningCourses =[1, 2, 3]
  return (
    <div className='max-w-4xl mx-auto my-24 px-4 md:px-0'>
      <h1 className='font-bold text-2xl'>My learning</h1>
      <div className='my-5'>
        {
            isloading?(
                <MylearningSkeleton/>
            ):myLearningCourses.length === 0 ? 
            (<p>Your are not enrolled in any course</p>)
            :(
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {
                      [1, 2, 3].map((course, index)=><Course key={index}/>)
                    }
                </div> 
            )
        }
      </div>
    </div>
  )
}



const MylearningSkeleton = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
          />
        ))}
      </div>
    );
  };
  
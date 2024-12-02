import { Button } from '@/components/ui/button'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import CourseTab from './CourseTab'

export default function EditCourse() {
  const params = useParams()
  const courseId = params.courseId
  return (
    <div className='flex-1 '>
      <div className='flex items-center justify-between mb-5'>
        <h1 className='font-bold text-xl'>Add detail information regarding course</h1>
        <Link to={'lecture'}>
            <Button className="hover:text-blue-600" variant='link'>
              <Link to={`/admin/course/${courseId}/lecture`}>Go to lecture Page</Link>
            </Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  )
}

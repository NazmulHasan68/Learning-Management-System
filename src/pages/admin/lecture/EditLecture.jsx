import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'

export default function EditLecture() {
    const params = useParams()
    const courseId = params.courseId
  return (
    <div>
        <div className='flex items-center justify-between mb-5'>
            <div className='flex items-center gap-2'>
                <Link to={`/admin/course/${courseId}/lecture`}>
                    <Button className="rounded-full w-10 h-10 bg-slate-200 hover:bg-slate-300">
                        <ArrowLeft size={16}/>
                    </Button>
                </Link>
                <h1 className='font-bold text-xl'>Update Your Lecture</h1>
            </div>
        </div>
        <LectureTab/>
    </div>
  )
}

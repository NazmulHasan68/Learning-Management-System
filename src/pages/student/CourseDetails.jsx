import { BadgeInfo } from 'lucide-react'
import React from 'react'

export default function CourseDetails() {
  return (
    <div className='mt-20'>
      <div className='bg-[#2D2F31] text-white'>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
            <h1 className='font-bold text-2xl md:text-3xl'>Course Title</h1>
            <p className='text-base md:text-lg '>Course Sub-Titile</p>
            <p>Created By {""} <span className='text-[#c0c4fc] underline italic'>Nazmul Hasan</span></p>
            <div className='flex items-center gap-2 text-sm '>
                <BadgeInfo size={16}/>
                <p>Last updated 11-11-2024</p>
            </div>
            <p> Student Entrolled: 10</p>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

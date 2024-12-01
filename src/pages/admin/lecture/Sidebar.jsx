import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className='hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r-gray-300  dark:border-r-gray-700  bg-[#f0f0f0] p-5 sticky top-0 h-screen'>
      <div className='space-y-4'>
        <Link>
            <ChartNoAxesColumn size={22}/>
            <h1>Dashboard</h1>
        </Link>
        <Link>
            <SquareLibrary size={22}/>
            <h1>Courses</h1>
        </Link>
      </div>
    </div>
  )
}

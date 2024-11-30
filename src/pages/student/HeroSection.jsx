import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function HeroSection() {
  return (
    <div className=' relative bg-gradient-to-r mt-5 md:mt-0 from-blue-500 bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-20 md:py-28 px-4 text-center'>
      <div className='max-w-3xl mx-auto flex flex-col  items-center'>
        <h1 className='text-white text-3xl md:text-4xl font-bold mb-4'>Find the Best Courser For You</h1>
        <p className='text-gray-200 text-sm dark:text-gray-400 mb-8'>Discover, Learn and Upskill with our wide range of courses</p>

        <form action='' className='flex justify-center items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden w-[80%] md:w-[60%] mb-6'>
            <Input 
                type="text"
                placeholder="search courses..."
                className="flex-grow border-none focus-visible:right-0 px-6 py-3 text-gray-800 dark:text-gray-10 placeholder-gray-400"
            />
            <Button className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 ">Search</Button>
        </form>
        <Button className='bg-white text-sm md:text-md dark:bg-gray-800 text-blue-500 rounded-full hover:bg-gray-200'>Explore Courses</Button>
      </div>
    </div>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import React from 'react'

export default function Course({course}) {

  return (
    <div>
      <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className=' relative'>
            <img 
                alt='course image'
                className='w-full h-36 object-cover rounded-t-lg'
                src={course.courseThumbnail}
            />
        </div>
        <CardContent className='px-5 py-2 space-y-1'>
            <h1 className=' line-clamp-1 hover:underline font-bold truncate py-1'>{course.courseTitle}</h1>
           <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src={course.creator.photourl ||"https://github.com/shadcn.png"}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h1 className='font-medium text-sm'>{course.creator.name}</h1>
                </div>
                <Badge className='bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-2 py-1 text-xs rounded-full'>
                    {course.courseLevel}
                </Badge>
           </div>
           <div className='text-lg font-bold'>
            <span>{course.coursePrice}৳</span>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}

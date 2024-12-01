import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@radix-ui/react-label'
import React from 'react'

export default function AddCourse() {
  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-xl'>Lets add Course , add some basic course details for your new course</h1>
        <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, facilis!</p>
      </div>
      <div className='space-y-4'>
        <div>
          <Label>Titile</Label>
          <Input type="text" name="courseTitle" placeholder="Your course name"/>
        </div>
        <div>
          <Label>Category</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Label } from '@radix-ui/react-label'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export default function AddCourse() {
  const [courseTitle, setCourseTitile] = useState('')
  const [category , setcategory] = useState("")
  const navigate = useNavigate()
  const [createCourse, {data , error , isSuccess , isLoading}] = useCreateCourseMutation()

  const getSelectedCategory = (value) =>{
    setcategory(value)
  }

  const createCoursehandler = async() =>{
    await createCourse({courseTitle, category});
  }
  // for displaying toast
  useEffect(()=>{
    if(isSuccess){
      toast.success(data?.message || "Course created!")
      navigate("/admin/course")
    }
  },[isSuccess, error])
  return (
    <div className='flex-1 mx-10'>
      <div className='mb-4'>
        <h1 className='font-bold text-xl'>Lets add Course , add some basic course details for your new course</h1>
        <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, facilis!</p>
      </div>
      <div className='space-y-4'>
        <div>
          <Label>Titile</Label>
          <Input type="text" name="courseTitle" value={courseTitle} onChange={(e)=>setCourseTitile(e.target.value)} placeholder="Your course name"/>
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[220px] mt-1">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className='bg-white'>
              <SelectItem value="nextjs">Nextjs</SelectItem>
              <SelectItem value="data">Data Science</SelectItem>
              <SelectItem value="frontend">Frontend Development</SelectItem>
              <SelectItem value="fullstact">Fullstact Development</SelectItem>
              <SelectItem value="mern">MERN stack Development</SelectItem>
              <SelectItem value="javascript">Javascript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="docker">Docker</SelectItem>
              <SelectItem value="mongodb">MongoDB</SelectItem>
              <SelectItem value="html">HTML</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
              <SelectItem value="boostrap">Boostrap</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex gap-2'>
          <Button onClick={()=>navigate("/admin/course")} className='bg-gray-800 hover:bg-slate-900 text-white rounded-xl px-6'>Back</Button>
          <Button disabled={isLoading} onClick={createCoursehandler} className='bg-gray-800 hover:bg-slate-900 text-white rounded-xl px-6'>
            {
              isLoading ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait
              </>
              ):(
                "Create"
              )
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

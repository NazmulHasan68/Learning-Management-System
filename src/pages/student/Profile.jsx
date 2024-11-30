import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React from 'react'
import Course from './Course'

export default function Profile() {
    const isLoading = false
    const enrolledCourses = [1, 2, ]
  return (
    <div className='max-w-4xl mx-auto px-4 my-24'>
      <h1 className='font-bold text-2xl text-center md:text-left'>PROFILE</h1>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-6 my-5'> 
        <div className='flex flex-col items-center'>
            <Avatar className="cursor-pointer w-24 h-24 md:h-32 md:w-32" >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
        <div>
            <div>
                <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                    Name : 
                    <span className='font-normal text-gray-700 dark:text-gray-300'>Nazmul Hasan</span>
                </h1>
                <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                    Email : 
                    <span className='font-normal text-gray-700 dark:text-gray-300 py-2'>NazmulHasan@gmail.com</span>
                </h1>
                <h1 className='font-semibold text-gray-900 dark:text-gray-100'>
                    Role : 
                    <span className='font-normal text-gray-700 dark:text-gray-300'>Instructor</span>
                </h1>  
            </div>
            <Dialog>
                <DialogTrigger className='bg-blue-500 px-4 py-1 rounded-full mt-5 hover:bg-blue-600 text-white'>Edit Profile</DialogTrigger>
                <DialogContent className='bg-white'>
                    <DialogHeader>
                    <DialogTitle>Male Changes to your profile here.</DialogTitle>
                    <DialogDescription>
                       <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label>Name</Label>
                                <Input type="text" placeholder="Name" className="col-span-3"/>
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label>Profile Photo</Label>
                                <Input type="file" accept="image/*" className="col-span-3"/>
                            </div>
                        </div>
                        <DialogFooter>
                          <Button className=" bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center">
                            {
                                isLoading ? <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin '/>Please wait 
                                </> : "Save Changes"
                            }
                          </Button>
                        </DialogFooter>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
      </div>
      <div>
        <h1 className='font-medium text-lg '>Courses you are enrilled in</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
            {
                enrolledCourses.length === 0 ? 
                <h1>You haven't enrolled yet</h1> :
                enrolledCourses.map((course, index)=><Course key={index}/>)
            }
        </div>
      </div>
    </div>
  )
}

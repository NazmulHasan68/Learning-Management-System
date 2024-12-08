import { Menu, School } from 'lucide-react'
import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from './ui/dropdown-menu'
import DarkMode from '@/DarkMode'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Link, useNavigate } from 'react-router-dom'
import { useLoadUserQuery, useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

export default function Navbar() {
    const [logoutUser , { isSuccess}] = useLogoutUserMutation()
    const navigate = useNavigate()

    useEffect(()=>{
        if(isSuccess){
            toast.success(data.message || "User logout")
            navigate('/login')
        }
    },[isSuccess])

    const { data, isLoading, refetch } = useLoadUserQuery();
    const user = data && data.user;

    const logoutHandler = async() =>{
        await logoutUser()
    }
 
  return (
    <div className='h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 right-0 left-0 duration-300 z-10'>
      {/* Desktop */}
      <div className=' mx-auto max-w-7xl hidden md:flex justify-between items-center gap-10 h-full'>
        <div className='flex items-center gap-2'>
            <School size={"30"}/>
            <h1 className='hidden md:block font-extrabold text-2xl'><Link to={'/'}>E-Learning</Link></h1>
        </div>
         {/* user icons and dark mode icons */}
        <div className='flex items-center gap-5'>
           {
            user? 
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarImage src={user.photourl || "https://github.com/shadcn.png"} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem ><Link to='/my-learning'>My learning</Link></DropdownMenuItem>
                        <DropdownMenuItem><Link to='/profile'>Edit Profile</Link></DropdownMenuItem>
                        <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                    </DropdownMenuGroup>
                   
                    {
                        user.role === 'instructor' && (
                            <>
                                 <DropdownMenuSeparator />
                                 <DropdownMenuItem><Link to='/admin/dashboard'>Dashboard</Link></DropdownMenuItem>
                            </>
                        )
                    }
                    
                </DropdownMenuContent>
            </DropdownMenu> 
          : <div className='flex items-center gap-2'>
                <Button variant='outline' onClick={()=>navigate('/login')}>Login</Button>
                <Button  onClick={()=>navigate('/signup')}>Signup</Button>
            </div>
           }
           <DarkMode/>
        </div>
      </div>

      <div className='flex md:hidden items-center justify-between px-4 h-full'>
        <h1 className='font-bold text-2xl'>E-Learning</h1>
        <MobileNavbar/>
      </div>
    </div>
  )
}




const MobileNavbar = () =>{
    const role = 'instructor'
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size='icon' className="rounded-full bg-gray-200 hover:bg-gary-200 ">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent className='bg-white flex flex-col '>
                <SheetHeader className='flex flex-row items-center justify-between mt-2'>
                    <SheetTitle>E-Learning</SheetTitle>
                    <DarkMode/>
                </SheetHeader>
                <nav className='flex flex-col space-y-4'>
                    <span>My Learning</span>
                    <span>Edit Learning</span>
                    <p>Lot out</p>
                </nav>
                {
                    role === 'instructor' && (
                        <SheetFooter >
                            <SheetClose asChild>
                                <Button className='bg-slate-700 text-white hover:bg-slate-600' type='submit'>Dashboard</Button>
                            </SheetClose>
                        </SheetFooter>
                    )
                }
                
            </SheetContent>
        </Sheet>
    )
}
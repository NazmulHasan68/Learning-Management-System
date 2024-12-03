import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery } from '@/features/api/courseApi'
import { Edit } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]

export default function CourseTable() {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetCreatorCourseQuery();
    
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error.message}</h1>;
    console.log(data);
    
 
  return (
    <div>
      <Button onClick={()=>navigate(`create`)} className="px-4  rounded-xl bg-slate-800 hover:bg-slate-950 text-white m-2">
        Create a new Course
      </Button>
      <Table>
        <TableCaption>A list of your recent Courses.</TableCaption>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[100px]">Peice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Titile</TableHead>
            <TableHead className="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data?.courses?.map((courese, index) => (
            <TableRow key={index} className="hover:bg-slate-100 cursor-pointer">
                <TableCell className="font-medium">{courese?.coursePrice || "NA"}</TableCell>
                <TableCell>{courese.isPublished ? <p className='bg-green-200 px-4 py-2 rounded-xl w-fit'>Publiched</p> : <p className='bg-red-200 px-4 py-2 rounded-xl w-fit'>Draft</p>} </TableCell>
                <TableCell>{courese.courseTitle}</TableCell>
                <TableCell className="text-right">
                    <Button onClick={()=>navigate(`/admin/course/${courese?._id}`)} className='bg-slate-700 hover:bg-slate-800 text-white'>
                      <Edit  size='sm'/>
                    </Button>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  )
}

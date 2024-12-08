import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { SelectItem } from '@radix-ui/react-select'
import React from 'react'

const category = [
    { id : "next js" , label : " Next js" },
    { id : "frontend development" , label : "rontend Development" },
    { id : "fullstact development" , label : " Fullstact Development" },
    { id : "python" , label : " Python" },
    { id : "docker" , label : " Docker" },
    { id : "mongodb" , label : "MongoDB" },
    { id : "html" , label : " HTML" },
    { id : "css" , label : " Css" },
    { id : 'boostrap', label : "Boostrap"}

]

const handlCategoryChange =(categoryId)=>{
    
}

export default function Filter() {
  return (
    <div className='w-full md:w-[20%]'>
      <div className='flex flex-col justify-between '>
        <h1 className='font-semibold text-lg md:text-xl'>Filter Options</h1>
        <Select>
            <SelectTrigger>
                <SelectValue placeholder="Sort by"/>
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    <SelectLabel className="font-bold">Sort By Price</SelectLabel>
                    <SelectItem value='low'>Low to hight</SelectItem>
                    <SelectItem className='hight'>Hight to Low</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
      </div>
      <Separator className="my-4"/>
        <div>
            <h1 className='font-semibold mb-2'>Category</h1>
            {
                category.map((category, index)=>(
                    <div key={index} className='flex items-center space-x-2 my-2'>
                        <Checkbox id={category.id} onCheckedChange={()=>handlCategoryChange(category.id)}/>
                        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {category.label}
                        </Label>
                    </div>    
                ))
            }
        </div>
    </div>
  )
}

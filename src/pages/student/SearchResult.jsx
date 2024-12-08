import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

export default function SearchResult({ course }) {

    const couserId = "sfsdfd"
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4 ">
      <Link
        to={`/course-details/${couserId}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx1VOKpty_y8Vu1QB7_BzKwh1g_lJ8lkZRqg&s' className="h-32 w-full md:w-56 object-cover rounded" alt="course thaimbnail"/>
        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg md:text-xl ">Course Titile</h1>
            <p className="text-sm text-gray-600 ">SubTitile</p>
            <p className="text-sm text-gray-700">Instructor : <span className="font-bold">Nazmul Hasan</span></p>
            <Badge className='w-fit mt-2 md:mt-0 bg-slate-700 hover:bg-slate-800 text-white '>Medium</Badge>
        </div>
      </Link>
    </div>
  );
}

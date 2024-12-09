import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

export default function SearchResult({ course }) {

  return (
    <div className="flex px-6 flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4 ">
      <Link
        to={`/course-details/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img src={course.courseThumbnail} className="h-32 w-full md:w-56 object-cover rounded" alt="course thaimbnail"/>
        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-lg md:text-xl line-clamp-1">{course.courseTitle}</h1>
            <p className="text-sm text-gray-600 line-clamp-1">{course.subTitle}</p>
            <p className="text-sm text-gray-700">Instructor : <span className="font-bold">{course?.creator.name}</span></p>
            <Badge className='w-fit mt-2 md:mt-0 bg-slate-700 rounded-xl hover:bg-slate-800 text-white '>{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl">{course.coursePrice}৳</h1>
      </div>
    </div>
  );
}

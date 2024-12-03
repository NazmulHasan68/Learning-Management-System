import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CourseTable() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCreatorCourseQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-lg font-semibold">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-lg font-semibold text-red-500">
          Error: {error.message || "Failed to load courses"}
        </h1>
      </div>
    );
  }


  return (
    <div className="p-4">
      <Button
        onClick={() => navigate(`create`)}
        className="px-4 rounded-xl bg-slate-800 hover:bg-slate-950 text-white mb-4"
      >
        Create a new Course
      </Button>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses?.map((course, index) => (
            <TableRow key={index} className="hover:bg-slate-100 cursor-pointer">
              <TableCell className="font-medium">
                {course?.coursePrice ? `$${course.coursePrice}` : "N/A"}
              </TableCell>
              <TableCell>
                {course.isPublished ? (
                  <p className="bg-green-200 px-4 py-2 rounded-xl w-fit">
                    Published
                  </p>
                ) : (
                  <p className="bg-red-200 px-4 py-2 rounded-xl w-fit">Draft</p>
                )}
              </TableCell>
              <TableCell>{course.courseTitle || "Untitled Course"}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => navigate(`/admin/course/${course?._id}`)}
                  className="bg-slate-700 hover:bg-slate-800 text-white"
                  aria-label={`Edit ${course.courseTitle}`}
                >
                  <Edit size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

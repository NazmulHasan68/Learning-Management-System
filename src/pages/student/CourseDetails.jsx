import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailsWithStatusQuery } from "@/features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

export default function CourseDetails() {
  const navigate = useNavigate()
  const params = useParams()
  const courseId = params.courseId;

  const {data, isLoading , isError,  error} = useGetCourseDetailsWithStatusQuery(courseId)

  if(isLoading) return <h1>Loading ....</h1>
  if(isError) return <h1>Faild to load course details </h1>

  const {course , purchased} = data
  console.log(purchased);


  const handleContinueCOurse = ()=>{
    if(purchased){
      navigate(`/course-progress/${courseId}`)
    }
  }

  return (
    <div className="mt-20">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">{course.courseTitle}</h1>
          <p className="text-base md:text-lg ">{course.subTitle}</p>
          <p>
            Created By {""}{" "}
            <span className="text-[#c0c4fc] underline italic">
              {course?.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm ">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt?.split("T")[0]}</p>
          </div>
          <p> Student Entrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5 ">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm" dangerouslySetInnerHTML={{__html:course?.description}}/>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription className="text-slate-500">
                {course.lectures.length} Lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={18} /> : <Lock size={18} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="flex flex-col p-4">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer width='100%' height="100%" url={course.lectures[0].vidoeUrl} controls={true}/>
              </div>
              <h1>Lecture titile</h1>
              <Separator className="border-b-2 py-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                Course Price : <span>{course?.coursePrice || "00"}</span>
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCOurse} className="bg-slate-800 w-full hover:bg-slate-900 text-white rounded-xl">
                  Continus course
                </Button>
              ) : (
              <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

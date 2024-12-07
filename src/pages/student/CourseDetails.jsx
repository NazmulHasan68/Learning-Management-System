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
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";

export default function CourseDetails() {
  const parchasedCourse = false;
  return (
    <div className="mt-20">
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">Course Title</h1>
          <p className="text-base md:text-lg ">Course Sub-Titile</p>
          <p>
            Created By {""}{" "}
            <span className="text-[#c0c4fc] underline italic">
              Nazmul Hasan
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm ">
            <BadgeInfo size={16} />
            <p>Last updated 11-11-2024</p>
          </div>
          <p> Student Entrolled: 10</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5 ">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p className="text-sm">
            This comprehensive course is designed for developers who wnat to
            learn how to build roubust, product-ready web applications using
            Nestjs you will master sarver-side roudering, static site
            generation, API routes , dynamic routing, and much more. BY the end
            for this course. you will be able to create SEO-friendly, scalable
            and fast for web applications with case hello
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription className="text-slate-500">
                4 Lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((lecture, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={18} /> : <Lock size={18} />}
                  </span>
                  <p>Lecture title</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="flex flex-col p-4">
              <div className="w-full aspect-video mb-4">Video</div>
              <h1>Lecture titile</h1>
              <Separator className="border-b-2 py-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                Course Price : <span>100$</span>
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {parchasedCourse ? (
                <Button className="bg-slate-800 w-full hover:bg-slate-900 text-white rounded-xl">
                  Continus course
                </Button>
              ) : (
              <BuyCourseButton />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

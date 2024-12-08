import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle2, CirclePlay } from "lucide-react";
import React from "react";

export default function CourseProgress() {
  const isCompleted = true;
  return (
    <div className="mt-14 max-w-7xl mx-auto p-4">
      {/* scourse pislay name */}
      <div className="flex justify-between mb-4">
        <h1 className="font-3xl font-bold ">Course Titile</h1>
        <Button className="bg-slate-800 rounded-xl hover:bg-slate-900 text-white">
          Complete
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* video section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-xl shadow-lg p-4">
          <div>
            {/* <video

            /> */}
            {/* Display current Lecture title */}
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-lg">Lecture -1 : Introduction</h3>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-300 md:pl-4pt-4 md:pt-0  p-2">
          <h2 className="font-semibold text-xl mb-4 ">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto ">
            {[1, 2, 3, 4].map((lecture, index) => (
              <Card
                key={index}
                className="mb-3 hover:cursor-pointer transition transform"
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isCompleted ? (
                      <CheckCircle2
                        size={24}
                        className="text-green-600 mlr-2"
                      />
                    ) : (
                      <CirclePlay size={24} className="text-gray-600 mlr-2" />
                    )}
                    <div>
                        <CardTitle className="text-lg font-medium px-2">
                            Introduction
                        </CardTitle>
                    </div>
                  </div>
                  <Badge className='bg-green-200 text-green-600'>
                    Completed
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLectureMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CreateLecture() {
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const params = useParams()
  const courseId = params.courseId

  const [createLecture, {data, isLoading, error, isSuccess}] = useCreateLectureMutation()
  const createLeactureHandler = async()=>{
    await createLecture({lectureTitle, courseId})
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message)
    }
    if(error){
      toast.error(error.data.message)
    }
  },[isSuccess, error])

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add Lecture, ad some basic details for your new course
        </h1>
        <p className="text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet,
          facilis!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Titile</Label>
          <Input
            type="text"
            name="courseTitle"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title name..."
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/admin/course/${courseId}`)}
            className="bg-gray-800 hover:bg-slate-900 text-white rounded-xl px-6"
          >
            Back to Course
          </Button>
          <Button
            disabled={isLoading}
            onClick={createLeactureHandler}
            className="bg-gray-800 hover:bg-slate-900 text-white rounded-xl px-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Leacture"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

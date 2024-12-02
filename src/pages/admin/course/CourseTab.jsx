import { RichTextEditor } from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditCourseMutation, useGetCourseByIdQuery } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CourseTab() {
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const params = useParams()
  const courseId = params.courseId
  const navigate = useNavigate();
  const [editCourse , {data, isLoading, isSuccess, error}] = useEditCourseMutation()
  const {data:courseByIdData, isLoading:courseByIdLoading} = useGetCourseByIdQuery(courseId)
  const [input, setinput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const course = courseByIdData?.course

  useEffect(()=>{
    if(course){
        setinput({
            courseTitle: course.courseTitle,
            subTitle: course.subTitle,
            description: course.description,
            category: course.category,
            courseLevel: course.courseLevel,
            coursePrice: course.coursePrice,
            courseThumbnail: '',
        })
    }
  },[course])

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  const SelectedCategory = (value) => {
    setinput((prev) => ({ ...prev, category: value }));
  };

  const seletectCourseLevel = (value) => {
    setinput((prev) => ({ ...prev, courseLevel: value }));
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setinput((prev) => ({ ...prev, courseThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const isPublished = true;

  const handleSubmit = async() => {
    const formData = new FormData();
    formData.append("courseTitile", input.courseTitle)
    formData.append("subTitle", input.subTitle)
    formData.append("description", input.description)
    formData.append("category", input.category)
    formData.append("courseLevel", input.courseLevel)
    formData.append("coursePrice", input.coursePrice)
    formData.append("courseThumbnail", input.courseThumbnail)

    await editCourse({formData, courseId})
  };

  useEffect(()=>{
    if(isSuccess){
        toast.success(data.message || "Course updated.")
    }
    if(error){
        toast.error(error.data.message || "Failed to updated course!")
    }
  },[])

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you are done.
          </CardDescription>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </div>

      <div className="space-y-4 mt-5">
        <div>
          <Label>Course Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={input.courseTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Fullstack developer"
          />
        </div>
        <div>
          <Label>SubTitle</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={changeEventHandler}
            placeholder="Ex. Become a fullstack developer in 6 months"
          />
        </div>
        <div>
          <Label>Description</Label>
          <RichTextEditor input={input} setinput={setinput} />
        </div>
        <div className="flex items-center gap-5">
          <div>
            <Label>Category</Label>
            <Select onValueChange={SelectedCategory}>
              <SelectTrigger className="w-[220px] mt-1">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="nextjs">Nextjs</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="fullstack">Fullstack Development</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Course Level</Label>
            <Select onValueChange={seletectCourseLevel}>
              <SelectTrigger className="w-[220px] mt-1">
                <SelectValue placeholder="Select a Level" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Course Price</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={changeEventHandler}
              placeholder="0.00"
              className="w-fit"
            />
          </div>
        </div>

        <div>
          <Label>Course Thumbnail</Label>
          <Input
            type="file"
            onChange={selectThumbnail}
            accept="image/*"
            className="w-fit"
          />
          {previewThumbnail && (
            <img
              src={previewThumbnail}
              className="w-64 my-2"
              alt="Course Thumbnail"
            />
          )}
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/admin/course")} variant="outline">
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="bg-slate-800 hover:bg-slate-900 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

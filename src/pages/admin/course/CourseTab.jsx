import { RichTextEditor } from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CourseTab() {
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();
  const { data: courseByIdData, isLoading: courseByIdLoading , refetch} =
    useGetCourseByIdQuery(courseId);

    const [publishCourse] = usePublishCourseMutation()

  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
    isPublished: false,
  });

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData.course;
      setInput({
        courseTitle: course?.courseTitle || "",
        subTitle: course?.subTitle || "",
        description: course?.description || "",
        category: course?.category || "",
        courseLevel: course?.courseLevel || "",
        coursePrice: course?.coursePrice || "",
        courseThumbnail: course?.courseThumbnail || "",
        isPublished: course?.isPublished || false,
      });

      if (course?.courseThumbnail) {
        setPreviewThumbnail(course.courseThumbnail);
      }
    }
  }, [courseByIdData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleCategoryChange = (value) => {
    setInput((prev) => ({ ...prev, category: value }));
  };

  const handleLevelChange = (value) => {
    setInput((prev) => ({ ...prev, courseLevel: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size must be under 2MB.");
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPEG and PNG formats are allowed.");
        return;
      }

      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!input.courseTitle || !input.description || !input.category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);

    if (input.courseThumbnail) {
      formData.append("courseThumbnail", input.courseThumbnail);
    }

    await editCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated.");
      navigate("/admin/course");
    }
    if (error) {
      const errorMessage =
        error?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
      console.error("Edit Course Error:", error);
    }
  }, [isSuccess, error, data, navigate]);

  if (courseByIdLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        Loading course data...
      </div>
    );
  }


  const publishstatusHandler = async(action)=>{
    try {
      const response = await publishCourse({courseId , query:action})
      if(response.data){
        refetch()
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to publish or unpblished")
    }
  }









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
          <Button
            variant="outline"
            disabled={courseByIdData?.course.lectures.length == 0}
            onClick={()=>publishstatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
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
            onChange={handleChange}
            placeholder="Ex. Fullstack Developer"
            disabled={courseByIdLoading}
          />
        </div>
        <div>
          <Label>SubTitle</Label>
          <Input
            type="text"
            name="subTitle"
            value={input.subTitle}
            onChange={handleChange}
            placeholder="Ex. Become a Fullstack Developer in 6 Months"
            disabled={courseByIdLoading}
          />
        </div>
        <div>
          <Label>Description</Label>
          <RichTextEditor
            value={input.description}
            onChange={(value) =>
              setInput((prev) => ({ ...prev, description: value }))
            }
          />
        </div>
        <div className="flex items-center gap-5">
          <div>
            <Label>Category</Label>
            <Select onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[220px] mt-1">
                <SelectValue>
                  {input.category || "Select a category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="nextjs">Next.js</SelectItem>
                <SelectItem value="data">Data Science</SelectItem>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="fullstack">Fullstack Development</SelectItem>
                <SelectItem value="mern">MERN Stack Development</SelectItem>
                <SelectItem value="javascript">Javascript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="docker">Docker</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="boostrap">Boostrap</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Course Level</Label>
            <Select onValueChange={handleLevelChange}>
              <SelectTrigger className="w-[220px] mt-1">
                <SelectValue>
                  {input.courseLevel || "Select a level"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="advance">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Course Price</Label>
            <Input
              type="number"
              name="coursePrice"
              value={input.coursePrice}
              onChange={handleChange}
              placeholder="0.00"
              className="w-fit"
            />
          </div>
        </div>

        <div>
          <Label>Course Thumbnail</Label>
          <Input
            type="file"
            onChange={handleThumbnailChange}
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

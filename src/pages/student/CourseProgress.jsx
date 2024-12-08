import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useIncompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/progressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CourseProgress() {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: CompletedSuccess },
  ] = useCompleteCourseMutation();
  const [
    incompleteCourse,
    { data: markINCompleteData, isSuccess: INCompletedSuccess },
  ] = useIncompleteCourseMutation();
  useEffect(() => {
    // Always call the effect, but the logic inside is conditional
    if (CompletedSuccess) {
      toast.success(markCompleteData?.message);
      refetch()
    }
    if (INCompletedSuccess) {
      toast.success(markINCompleteData?.message);
      refetch()
    }
  }, [CompletedSuccess, INCompletedSuccess, markCompleteData, markINCompleteData]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p>Loading ...</p>;
  if (isError) return <p>Failed to load course details</p>;

  const { courseDetails, process, completed } = data.data;
  const { courseTitle } = courseDetails;

  // Initialize the first lecture if currentLecture is not selected
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return process.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id)
  };


  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleIncompleteCourse = async () => {
    await incompleteCourse(courseId);
  };


  return (
    <div className="mt-14 max-w-7xl mx-auto p-4">
      {/* Course display name */}
      <div className="flex justify-between mb-4">
        <h1 className="font-3xl font-bold ">{courseTitle}</h1>
        <Button
          onClick={completed ? handleIncompleteCourse : handleCompleteCourse}
          className={`rounded-xl text-white ${
            completed
              ? "bg-green-200 hover:bg-green-300 text-white"
              : "bg-slate-800 hover:bg-slate-900"
          }`}
        >
          {completed ? (
            <div className="flex gap-2 items-center justify-between text-green-600 font-semibold">
              <CheckCircle size={24} />
              <span>Completed</span>
            </div>
          ) : (
            <div>Mark as completed</div>
          )}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Video section */}
        <div className="flex-1 md:w-3/5 h-fit rounded-xl shadow-lg p-4">
          <div>
            <video
              src={currentLecture?.vidoeUrl || initialLecture.vidoeUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                handleLectureProgress(currentLecture?._id || initialLecture?._id)
              }
            />
          </div>
          <div className="mt-2">
            <h3 className="font-medium text-lg">{`Lecture ${
              courseDetails.lectures.findIndex(
                (lec) =>
                  lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1
            }: ${
              currentLecture?.lectureTitle || initialLecture?.lectureTitle
            }`}</h3>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-300 md:pl-4pt-4 md:pt-0 p-2">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails?.lectures.map((lecture, index) => (
              <Card
                key={index}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200"
                    : "dark:bg-gray-800"
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2
                        size={24}
                        className="text-green-600 mlr-2"
                      />
                    ) : (
                      <CirclePlay size={24} className="text-gray-600 mlr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium px-2">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge className="bg-green-200 text-green-600">
                      {" "}
                      Completed{" "}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

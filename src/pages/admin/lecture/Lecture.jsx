import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Lecture({ lecture, index, courseId }) {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`/admin/course/${courseId}/lecture/${lecture._id}`);
  };
  return (
    <div className="flex items-center justify-between bg-[#e6e7e9] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2">
      <h1 className="text-slate-900 line-clamp-1">
        <span className="font-semibold">Lecture - {index + 1} : </span> {" "}
        {lecture.lectureTitle}
      </h1>
      <Edit
        courseId={courseId}
        onClick={goToUpdateLecture}
        className=" cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      />
    </div>
  );
}

export default Lecture;

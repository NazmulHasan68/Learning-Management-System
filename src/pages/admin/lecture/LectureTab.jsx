import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditeLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8000/api/v1/media";

export default function LectureTab() {
  const navigate = useNavigate()
  const [LectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadvideoInfo] = useState(null);
  const [isFree, setFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  const [editeLecture, { data, isLoading, error, isSuccess }] = useEditeLectureMutation();

  const fileChangehandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setMediaProgress(true);
    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        onUploadProgress: ({ loaded, total }) => {
          setUploadProgress(Math.round((loaded * 100) / total));
        },
      });
      if (res.data.success) {
        setUploadvideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.publicId,
        });
        setBtnDisable(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Video upload failed!");
    } finally {
      setMediaProgress(false);
    }
  };

  const editLectureHandler = async () => {
    if (!LectureTitle.trim() || !uploadVideoInfo) {
      toast.error("Please provide all required fields.");
      return;
    }

    await editeLecture({ LectureTitle, videoInfo:uploadVideoInfo, isPreviewFree:isFree, courseId, lectureId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error?.data?.message) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess, error: removeError }] = useRemoveLectureMutation();

  const RemoveLectureHandler = async () => {
    try {
      await removeLecture(lectureId).unwrap(); // Unwraps the promise to handle errors directly
    } catch (err) {
      console.error("Error removing lecture:", err);
      toast.error(err?.data?.message || "Failed to remove lecture.");
    }
  };
  
  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
      navigate(`/admin/course/${courseId}/lecture`)
    }
  }, [removeSuccess]);


  const {data:LectureData} = useGetLectureByIdQuery(lectureId)
  const lecture = LectureData?.lecture

  useEffect(()=>{
    if(lecture){
      setLectureTitle(lecture.lectureTitle)
      setFree(lecture.isPreviewFree)
      setUploadvideoInfo(lecture.vidoeUrl)
    }
  },[lecture])
  
  return (
    <Card>
      <CardHeader className="flex flex-col justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>Make changes and click save when done.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            disabled={removeLoading}
            onClick={RemoveLectureHandler}
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
          >
            {
              removeLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait</> : "Remove Lecture"
            }
            
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label>Title</Label>
          <Input
            type="text"
            value={LectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction to..."
          />
        </div>
        <div className="mb-4">
          <Label>
            Video <span className="text-red-700">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangehandler}
            placeholder="Select a video file"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            id="free"
            checked={isFree}
            onCheckedChange={(checked) => setFree(checked)}
            className={`w-12 h-6 rounded-full ${isFree ? "bg-green-500" : "bg-red-500"}`}
          />
          <Label htmlFor="free">Is this video free?</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} className="bg-blue-500" />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button
            onClick={editLectureHandler}
            className="bg-slate-800 hover:bg-slate-900 text-white rounded"
            disabled={ isLoading}
          >
            {isLoading ? "Updating..." : "Update Lecture"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

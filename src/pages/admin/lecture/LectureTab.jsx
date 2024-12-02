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
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const MEDIA_API = "http://localhost:8000/api/v1/media";

export default function LectureTab() {
  const [isChecked, setIsChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [uploadVideoInfo, setUploadvideoInfo] = useState(null);
  const [isFree, setFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const fileChangehandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      console.error("No file selected!");
      return;
    }
    if (file) {
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
        console.log(error);
        toast.error("Video Upload fail!");
      } finally {
        setMediaProgress(false);
      }
    }
  };
  return (
    <Card>
      <CardHeader className="flex flex-col justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make Changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
          >
            Remove Lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input type="text"  value="title" onChange={(e)=>setTitle(e.target.value)} placeholder="Ex. indtroduction to " />
        </div>
        <div>
          <Label>
            Video <span className="text-red-700">*</span>
          </Label>
          <Input
              type="file"
              accept="video/*"
              onChange={fileChangehandler} // Event handler for file selection
              placeholder="Select a video file"
              className="w-fit"
            />

        </div>
        <div className="flex items-center space-x-2 my-5 ">
          <Switch
            id="free"
            className={`w-12 h-6 rounded-full ${
              isChecked ? "bg-green-500 " : "bg-red-500"
            }`}
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(checked)}
          />
          <Label htmlFor="free">is this video Free</Label>
        </div>
        {mediaProgress && (
          <div className="my-4 ">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploade</p>
          </div>
        )}
        <div className="mt-4">
          <Button
  
            className="bg-slate-800 hover:bg-slate-900 text-white rounded"
          >
            Update Lecture
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

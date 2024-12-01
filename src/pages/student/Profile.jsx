import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

export default function Profile() {
  const [name, setname] = useState("");
  const [profilePhoto, setprofilePhoto] = useState("");
  const { data, isLoading , refetch} = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsloading,
      error: updateUserError,
      isSuccess,
      isError
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setprofilePhoto(file);
  };


  const updateUserHandler = async () => {
    if (!name && !profilePhoto) {
      console.log("No changes to update.");
      return;
    }
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
     
    
    try {
      const response = await updateUser(formData).unwrap(); 
      console.log("Update successful:", response);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "profile updated")
      refetch()
    } 
    
    if(isError) toast.error(data.message ||"porfile updated failed!")
  },[isError, updateUser, isSuccess])

  if (isLoading) return <h1>Profile loading...</h1>;

  const { user } = data;
  const enrolledCourses = [1, 2];
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="cursor-pointer w-24 h-24 md:h-32 md:w-32">
            <AvatarImage
              src={user.photourl || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name :
              <span className="font-normal text-gray-700 dark:text-gray-300">
                {" "}
                {user.name}
              </span>
            </h1>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email :
              <span className="font-normal text-gray-700 dark:text-gray-300 py-2">
                {" "}
                {user.email}
              </span>
            </h1>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role :
              <span className="font-normal text-gray-700 dark:text-gray-300">
                {" "}
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger className="bg-blue-500 px-4 py-1 rounded-full mt-5 hover:bg-blue-600 text-white">
              Edit Profile
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Male Changes to your profile here.</DialogTitle>
                <DialogDescription>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Name</Label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label>Profile Photo</Label>
                      <Input
                        type="file"
                        onChange={onChangeHandler}
                        accept="image/*"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={updateUserHandler}
                      disabled={updateUserIsloading}
                      className=" bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                    >
                      {updateUserIsloading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin " />
                          Please wait
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg ">Courses you are enrilled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user?.enrolledCourses?.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user?.enrolledCourses.map((course, index) => (
              <Course key={index} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

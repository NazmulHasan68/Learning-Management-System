import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    console.log(category, courseTitle);

    if (!courseTitle || !category) {
      return res.status(400).json({
        message: "Course title and category is required!",
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({
      success: true,
      course,
      message: "Course created!",
    });
  } catch (error) {
    return req.status(500).json("Fail to create course");
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses)
      return res.status(404).json({
        course: [],
        message: "Course not found!",
      });
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Fail to create course");
  }
};




export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevelm,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId); // delete old image
      }
      //upload a thumbnail on cloudinary
      courseThumbnail = await uploadMedia(thumbnail.path)
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevelm,
      coursePrice,
      courseThumbnail:courseThumbnail?.secure_url
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, {new:true})

    return res.status(200).json({
        course,
        message: "Course Updated successfully!"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update course!",
    });
  }
};


export const getCourseById = async(req, res)=>{
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                message: "Course not found!"
            })
        }
        return res.status(200).json({
            course
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
        message: "Failed to course by Id!",
        });
    }
}





export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    if (!lectureTitle) {
      return res.status(400).json({ message: "Lecture title is required." });
    }
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required." });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    const lecture = await Lecture.create({ lectureTitle });
    course.lectures.push(lecture._id);
    await course.save();

    return res.status(201).json({
      lecture,
      message: "Lecture created successfully!",
    });
  } catch (error) {
    console.error("Error creating lecture:", error);
    return res.status(500).json({
      message: "Failed to create lecture. Please try again later.",
    });
  }
};


export const getCourseLecture = async(req, res)=>{
  try {
    const {courseId} = req.params
    const course = await Course.findById(courseId).populate("lectures")
    if(!course){
      return res.status(404).json({
        message : "Course not found!"
      })
    }
    
    return res.status(200).json({
      lectures:course.lectures
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"Failed to get lectures!"
    })
  }
}




export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    // Validate input
    if (!lectureId || !courseId) {
      return res.status(400).json({ message: "Course ID and Lecture ID are required." });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found!" });
    }
    // Delete previous video from Cloudinary if exists
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    // Update lecture fields
    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo?.videoUrl) lecture.vidoeUrl = videoInfo.videoUrl;
    if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
    if (typeof isPreviewFree === 'boolean') lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    // Ensure course contains this lecture
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(200).json({
      lecture,
      message: "Lecture updated successfully!",
    });
  } catch (error) {
    console.error("Error updating lecture:", error);
    return res.status(500).json({
      message: "Failed to update lecture.",
      error: error.message || error,
    });
  }
};






export const removeLecture = async(req, res)=>{
  try {
    const {lectureId} = req.params
    const lecture = await Lecture.findByIdAndDelete(lectureId)

    if(!lecture){
      return res.status(404).json({
        message : "Lecture not found!"
      })
    }
    //delete lecture from cloudinary
    if(lecture.publicId){
      await deleteVideoFromCloudinary(lecture.publicId)
    }

    //Remove the lecture reference from the associated course
    await Course.updateOne(
      {lectures:lectureId} ,//find the course that contains the lecture
      {$pull : {lectures:lectureId}} // Remove the lecture id from the lecture array
    )

    return res.status(200).json({
      message: "Lecture removed successfully!"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Failed delete Lectures"
    })
  }
}


export const getLectureById = async(req, res)=>{
  try {
    const {lectureId} = req.params
    const lecture = await Lecture.findById(lectureId)
    if(!lecture){
      return res.status(404).json({
        message : "Lecture not found!"
      })
    }

    return res.status(200).json({
      lecture
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Failed to get Lectures by id"
    })
  }
}



//publish unpnlish xourse logic
export const togglePublishCourse = async(req, res)=>{
  try {
    const {courseId} = req.params
    const {publish} = req.query; // true or false

    const course = await Course.findById(courseId)

    if(!course){
      return res.status(404).json({
        message:"Course not found!"
      })
    }

    //publish status based on the query parameter
    course.isPublished = publish === 'true'
  
    await course.save()

    const statusMessage = course.isPublished ? "Publish" : "Unpublished";
    return res.status(200).json({
      message : `Course is ${statusMessage}`
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message : "Failed to publish and upblish"
    })
  }
}
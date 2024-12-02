import { Course } from "../models/course.model.js";
import { deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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
    return req.status(500).json("Fail to create course");
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
        await deleteVideoFromCloudinary(publicId); // delete old image
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

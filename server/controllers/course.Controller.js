import { Course } from "../models/course.model.js"

export const createCourse = async(req, res)=>{
    try {
        const {courseTitle , category} = req.body
        if(!courseTitle || !category){
            return res.status(400).json({
                message: "Course title and category is required!"
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator : req.id
        })

        return res.status(201).json({
            success:true,
            course, 
            message: "Course created!"
        })
    } catch (error) {
        return req.status(500).json("Fail to create course")
    }
}
import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
    lectureId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Lecture
        ref: "Lecture", 
    },
    viewed: {
        type: Boolean,
        default: false,
    },
});

const courseProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User
        ref: "User",
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Course
        ref: "Course",
    },
    completed: {
        type: Boolean,
        default: false,
    },
    lectureProgress: [lectureProgressSchema], // Embed lecture progress
});

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);

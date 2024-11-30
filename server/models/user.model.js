import mongoose from "mongoose"

const userSchema = new  mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:trusted,
    },
    role:{
        type:String,
        enum: ["instructor" , "student"],
        default : "student"
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }
    ],
    photourl:{
        type:String,
        default:""
    }
},{timestamps:true})

export const User = mongoose.model("User", userSchema)

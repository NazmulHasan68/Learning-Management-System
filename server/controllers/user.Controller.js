import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js"
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js"

export const register = async(req, res)=>{
    try {
        const {name , email , password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const user = await User.findOne({email})
        if(user){
            res.status(400).json({success:false , message:"User already exist with this email"})
        }

        const hashedPassword = await bcrypt.hash(password , 10)

        await User.create({
            name,
            email,
            password:hashedPassword
        })

        return res.status(201).json({
            success:false,
            message:"Account created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false , message:"Server faild!"}) 
    }
}



export const login = async(req, res)=>{
    try {
        const {email , password} = req.body
        
        if(!email ||!password){
            return res.status(400).json({
                success:false,
                message: "All fields are required!"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"incorrect email or password!"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password!"
            })
        }
        generateToken(res, user , `Welcome back ${user.name}`)
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false , message:"Server faild!"}) 
    }
}




export const logout = async(_, res)=>{
    try {
        return res.status(200).cookie('token', "", {maxAge:0}).json({
            message:"Logged out successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        })
    }
}


export const getUserProfile = async(req, res)=>{
    try {
        const userId = req.id
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(404).json({
                message:"Profile not found!",
                success:false
            })
        }
        return res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to get user profile"
        })
    }
}


export const updateProfile = async(req, res)=>{
    try {
        const userId = req.id
        const {name} = req.body

        const profilePhoto = req.file
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({
                message: "User not found!",
                success: false
            })
        }
        //delete old photo
        if(user.photourl) {
            const urlParts = user.photourl.split("/image/upload/");
            if (urlParts.length > 1) {
              const publicIdWithExtension = urlParts[1].split("/")[0]; 
              const publicId = publicIdWithExtension.split('.')[0]; 
              deleteMediaFromCloudinary(publicId); 
            }
          }

        //upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path)
  
        const photourl = cloudResponse.secure_url;
        const updatedData = {name , photourl}
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password")

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message: " profile Updated successfull!"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to update profile"
        }) 
    }
}
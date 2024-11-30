import mongoose from 'mongoose'

export const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Mongoodb is connected!");  
    } catch (error) {
        console.log("Mongoodb not Connected!");  
    }
}
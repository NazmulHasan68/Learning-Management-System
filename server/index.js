import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './Database/dbConnect.js'
dotenv.config()

const app = express()
const PORT = 8080 


app.listen(PORT , (req, res)=>{
    console.log(`server is running ${PORT}`);
    connectDB()
})
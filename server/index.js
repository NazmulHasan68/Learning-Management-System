import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './Database/dbConnect.js'
import userRoute from './routes/user.Route.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const PORT = 8000 

//apis
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http:localhost:8000',
    credentials:true
}))
app.use("/api/v1/user", userRoute)

app.get('/home', (req, res) => {
    res.status(200).json({ success: true, message: "Hello, I am coming from the backend" });
  });


app.listen(PORT , (req, res)=>{
    console.log(`server is running ${PORT}`);
    connectDB()
})
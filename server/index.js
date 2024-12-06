import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './Database/dbConnect.js';
import userRoute from './routes/user.Route.js';
import courseRoute from './routes/course.Route.js';
import mediaRoute from './routes/media.route.js';
import paymentRoute from './routes/sssl.commerz.Route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const PORT = 8000;

// Set up environment
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Include cookies if needed
}));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/payment", paymentRoute);

app.get('/home', (req, res) => {
    res.status(200).json({ success: true, message: "Hello from the backend!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

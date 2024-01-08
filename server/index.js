import express from 'express';
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import userRoute from './route/userRoute.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); // to accept json data

 app.use("/api/user", userRoute);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
app.listen(5000, console.log('Server is running'))
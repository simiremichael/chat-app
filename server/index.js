import express from 'express';
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import userRoute from './route/userRoute.js'
import chatRoute from './route/chatRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from'cors'

dotenv.config();

connectDB();

const app = express(); 
app.use(cors());
 
app.use(express.json()); // to accept json data 
   
 app.use("/api/user", userRoute);
 app.use("/api/chat", chatRoute);
// app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, console.log('Server is running'))
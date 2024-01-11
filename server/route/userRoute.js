import express from 'express';
import { login, register, getUsers } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRoute = express.Router();

userRoute.get('/', protect, getUsers);
userRoute.post('/login', login);
userRoute.post('/register', register);

export default userRoute;   

import express from 'express';
import { login, register } from '../controller/userController.js';

const userRoute = express.Router();

userRoute.post('/login', login);
userRoute.post('/register', register);

export default userRoute;   

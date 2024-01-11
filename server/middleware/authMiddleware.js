import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler';


export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
     try {
        token = req.headers.authorization.split(' ')[1]; 
        const decode = jwt.verify(token, 'test'); 

        req.user = await User.findById(decode.id).select("password");
    next();

    } catch (error) {
        res.status(401);
throw new Error("Not authorized, roken failed"); 
     }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});
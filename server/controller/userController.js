import User from "../model/userModel.js";
import asyncHandler from 'express-async-handler'
import generateToken from "../config/generateToken.js";
// import bcrypt from 'bcrypt';

export const login =  asyncHandler( async (req, res) => {

const {email, password} = req.body;

const existingUser = await User.findOne({email: email.toLowerCase()});
  if (!existingUser) {
    throw new Error("user not found");
  }
// const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//     if(!isPasswordCorrect ) {
//       throw new  Error("Invalid password.");
//     }

    if (existingUser && (await existingUser.matchPassword(password))) { 
      res.status(201).json({
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      pics: existingUser.pics,
      token: generateToken(existingUser._id)
      });
    }else {
      res.status(400);
      throw new Error('failed to create user');
    }
});




export const register = asyncHandler(async(req, res) => {

  const { email, password, name, pics} = req.body;

  if (!name || !email || !password) {
    res.status(404);
    throw new Error('all fields are required');
  }
const existingUser = await User.findOne({email: email.toLowerCase()});

 if (existingUser) {
throw new Error("User already exists")
 }

 const newUser = await User.create({
  name, email, password, pics
 }); 

 if (newUser) {
  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    pics: newUser.pics,
    token: generateToken(newUser.id)
  })
 } else {
  throw new Error('failed to create new user');
 }
});

export const getUsers = asyncHandler(async(req, res) => {
  const keyword = req.query.search
  ? {
    $or: [
      {name: {$regex: req.query.search, $options: 'i'}},
      {email: {$regex: req.query.search, $options: 'i'}},
    ],
  }: {};  

  const users =  await User.find(keyword).find({_id: {$ne: req.user._id}});   
res.send(users);
});
import User from "../model/userModel.js";
import asyncHandler from 'express-async-handler'
import generateToken from "../config/generateToken.js";
import bcrypt from 'bcrypt';

export const login =  asyncHandler( async (req, res) => {

const {email, password} = req.body;

const existingUser = await User.findOne({email: email.toLowerCase()});
  if (!existingUser) {
    throw new Error("user not found");
  }
const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect ) {
      throw new  Error("Invalid password.");
    }

    if (existingUser) {
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

// try{
//   const existingUser = await User.findOne({email: email.toLowerCase()});
  
//     if(!existingUser) return res.status(404).json({ message: "Invalid email! Please enter a valid email address or sign up."});
   
//     const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//     if(!isPasswordCorrect ) return res.status(404).json({ message: "Invalid password."});
    
//     const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.REACT_APP_TOKEN_KEY, { expiresIn: '3m' });
//     const refreshToken = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.REACT_APP_TOKEN_KEY, { expiresIn: '7d' });

//     res.cookie(process.env.REACT_APP_USER_COOKIE_KEY, refreshToken, 
//     { httpOnly: true, secure: true, sameSite: 'None',
//     maxAge: 7 * 24 * 60 * 60 * 1000 });
//     res.status(200).json({ result: existingUser, token});
// } catch(error) {
// res.status(500).json({ message: "Something went wrong."});
// }
});
// process.env.REACT_APP_TOKEN_KEY
// export const refresh = async (req, res) => {
//   //res.set({"Access-Control-Allow-Origin": "https://my-property-finder.vercel.app"});
//     const cookies = req.cookies;
//     if (!cookies?.Residencespotterjws) return res.status(401).json({message: 'Unauthorized'});
//     const refreshToken = cookies.Residencespotterjws;                                
//     // evaluate jwt 
//     jwt.verify(
//         refreshToken,
//         process.env.REACT_APP_TOKEN_KEY,
//         async (err, decoded) => {
//             if (err) return res.status(403).json({message: 'Forbidden'});
//             const foundUser = await User.findOne({email: decoded.email});
//             if (!foundUser) return res.status(401).json({message: 'Unauthorized'});
    
//             const token = jwt.sign({ email: foundUser.email, id: foundUser._id}, process.env.REACT_APP_TOKEN_KEY, { expiresIn: '7d' });
//             res.json({token})
//         })
//     }

    // export const logout = (req, res) => {
    //     const cookies = req.cookies;
    //     if (!cookies.Residencespotterjws) return res.status(204);
    //     res.clearCookie(process.env.REACT_APP_USER_COOKIE_KEY, { httpOnly: true, sameSite: 'None', secure: true});
    //    res.json({message: 'cookie cleared'});
    // };



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

const hashedPassword = await bcrypt.hash(password, 12);

 const newUser = await User.create({
  name, email, password: hashedPassword , pics
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
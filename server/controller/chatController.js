import asyncHandler from 'express-async-handler';
import Chat from '../model/chatModel.js'
import User from '../model/userModel.js';

export const postChat = asyncHandler( async (req, res) => {
   const { userId } = req.body;
   
   if(!userId) {
console.log('userId not sent with request');
return res.status(404);
   }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and:[
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: req.userId}}},
        ],
    })
    .populate('User', '-password')
    .populate('latestMessage');

    isChat = await User.populate(isChat, {
     path:'latestMessage.sender',
     select: 'name pics email',
    });

    if(isChat.length > 0) {
   res.send(isChat[0]);
    } else {
        var chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId],
        };
 try {
    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
        'users',
        '-password'
    );
    res.status(200).send(FullChat);
 } catch (error) {
    res.status(404);
    throw new Error(error.message);
 }
    }
});

export const getChats = asyncHandler( async (req, res) => {
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('lastMessage')
        .sort({ updatedAt: -1})
        .then(async (results) => {
            results = await User.populate(results, {
                path: 'latestMessage.sender',
                select: 'name pics email'
            });
            results.status(200).send(results);
        })
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const createGroup = asyncHandler( async (req, res) => {
    if (!req.body.users  || !req.body.name) {
        return res.status(400).send({ message: 'Please fill all the fileds'});
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
return res.status(400).send({ message: 'More than 2 users are required to form a group chat'});
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
        .populate('users', '-password')
        .populate('groupAdmin', '-password');

        res.status(200).json(fullGroupChat);
        
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const renameGroup = asyncHandler( async( req, res ) => {
const {chatId, chatName} =req.body;

const updatedChat = await Chat.findByIdAndUpdate(chatId, {chatName,}, {new: true})
.populate('users', '-password')
.populate('groupdAdmins', '-password');

if (!updatedChat) {
    res.status(404);
    throw new Error('chat not found');
}else {
    res.json(updatedChat);
}
});

export const addToGroup = asyncHandler( async(req, res) => {
const { chatId, userId } = req.body;

const added = await Chat.findByIdAndUpdate(chatId, {$push: {users: userId}}, {new: true})
.populate('users', '-password')
.populate('groupAdmin', '-password');

if (!added) {
res.status(404);
throw new Error('Chat not found');
}else {
    res.json(added);
}
}); 

export const removeFromGroup = asyncHandler( async(req, res) => {
const { chatId, userId } = req.body;

const remove = await Chat.findByIdAndUpdate(chatId, {$pull: {users: userId}}, {new: true})
.populate('users', '-password')
.populate('groupAdmin', '-password');

if (!remove) {
res.status(404);
throw new Error('Chat not found');
}else {
    res.json(remove);
}
}); 


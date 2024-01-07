import mongoose from 'mongoose';

const chatModel = mongoose.Schema({
    chatName: {type: string, trim: true},
    users: [
  {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    latestMessage: {type: mongoose.Schema.Types.ObjectId, ref: 'Message'},
    groupgAdmim: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},
 { timestamps: true }
);

const Chat = mongoose.model('Chat', chatModel);

module.exports = Chat;
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { postChat, getChats, createGroup, renameGroup, removeFromGroup, addToGroup } from '../controller/chatController.js';

const chatRoute = express.Router();

chatRoute.post('/create', protect, postChat);
chatRoute.get('/', protect, getChats);
chatRoute.post('/group', protect, createGroup);
chatRoute.put('/rename', protect, renameGroup);
chatRoute.put('/removefromgroup', protect, removeFromGroup);
chatRoute.put('/addtogroup', protect, addToGroup);

export default chatRoute;
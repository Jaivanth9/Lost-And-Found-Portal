import express from 'express';
import { signup,login,
    createItem,logout,
    displayLostItems,
    displayApprovedItems } from '../controller/userauth.js';

import userAuth from '../middleware/usermiddle.js';

const userroute=express.Router();

userroute.post('/signup',signup);
userroute.post('/login',login);
userroute.post('/logout',logout);
userroute.post('/createitem',userAuth,createItem);
userroute.get('/lostitems',userAuth,displayLostItems);
userroute.get('/approveditems',displayApprovedItems);

export default userroute;
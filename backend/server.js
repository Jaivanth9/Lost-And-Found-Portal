import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ConnectDB from './config/connect.js';
import userroute from './routes/user_routes.js';
import moderatorroute from './routes/moderator_routes.js';

const app=express();

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true })); 
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true
}));

app.set(dotenv.config());   

ConnectDB();

app.use('/api/user',userroute);
app.use('/api/moderator',moderatorroute);


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
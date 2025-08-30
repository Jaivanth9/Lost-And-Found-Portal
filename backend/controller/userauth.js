import Item from "../models/Items.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup=async(req,res)=>{
    const {email,name,password}=req.body;

    if(!name || !email || !password){
        return res.json({success: "false" ,message: "All fields are required" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token =jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        
        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV==='production',
            sameSite: process.env.NODE_ENV==='production'? 'none':'strict',
            maxAge: 7*24*60*60*1000
        });

        res.json({success:   "true" ,message: "User created successfully"});

    } catch (error) {
        res.json({success: "false" ,message: error.message });
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.json({success:false,message:"All fields are required"});
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({success:false,message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success:false,message: "Invalid password" });
        }

        const token =jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        
        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV==='production',
            sameSite: process.env.NODE_ENV==='production'? 'none':'strict',
            maxAge: 7*24*60*60*1000
        });
        
        res.json({success:true,message: "Login successful"});

    } catch (error) {
        res.json({success:false,message: error.message });
    }
}

const logout=async(req,res)=>{
    res.clearCookie("token");
    res.json({success:true,message:"Logout successful"});
}

const createItem=async(req,res)=>{
    const userId=req.userId;
    const {name,desc,photo}=req.body;

    if(!userId){
        return res.json({success:false,message:"User not authenticated"});
    }

    if(!name || !desc){
        return res.json({success:false,message:"All fields are required"});
    }

    try {
        const newItem = new Item({  
            name,
            desc,
            photo,
            claimantId: userId
        });

        await newItem.save();

        res.json({success:true,message:"Item created successfully"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

const displayLostItems = async (req, res) => {
    const userId=req.userId;
    console.log(userId);

    if(!userId){
        return res.json({success:false,message:"User not authenticated"});
    }

    try {
        const lostItems = await Item.find({ type: 'lost',claimantId:userId });

        if(!lostItems && lostItems.length === 0) {
            return res.json({ success: false, message: "No lost items found" });
        }
        console.log(lostItems.length);

        res.json({ success: true, lostItems });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const displayApprovedItems = async (req, res) => {
    try {
        const approvedItems = await Item.find({ status: 'approved'});

        if(!approvedItems || approvedItems.length === 0) {
            return res.json({ success: false, message: "No approved items found" });
        }

        res.json({ success: true, approvedItems });
        
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export {
    signup,
    login,
    createItem,
    displayLostItems,
    displayApprovedItems,logout
};
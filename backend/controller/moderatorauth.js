import Item from "../models/Items.js";
import Moderator from "../models/Moderator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup=async(req,res)=>{
    const {email,name,password,regno}=req.body;

    if(!name || !email || !password || !regno){
        return res.json({success: "false" ,message: "All fields are required" });
    }
    try {
        const existingUser = await Moderator.findOne({ email });
        if(existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new Moderator({ name,regno, email, password: hashedPassword });
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
    const {regno,password}=req.body;
    if(!regno || !password){
        return res.json({success:false,message:"All fields are required"});
    }

    try {
        const user = await Moderator.findOne({ regno });
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

const displayrequests=async(req,res)=>{
    try {
        const lostItems = await Item.find({ type: 'lost', status: 'pending' });

        if(!lostItems) {
            return res.json({ success: false, message: "No lost items found" });
        }

        res.json({ success: true, lostItems });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const approve=async(req,res)=>{
    const { itemId } = req.body;

    if(!itemId) {
        return res.json({ success: false, message: "Item ID is required" });
    }

    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.json({ success: false, message: "Item not found" });
        }

        item.status = 'approved';
        await item.save();

        res.json({ success: true, message: "Item approved successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
    
const reject=async(req,res)=>{
    const {itemId}=req.body;

    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.json({ success: false, message: "Item not found" });
        }

        item.status = 'rejected';
        await item.save();

        res.json({ success: true, message: "Item rejected successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}



export {
    signup,
    login,logout,
    displayrequests,
    approve,
    reject 
}
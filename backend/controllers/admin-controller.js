import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res, next) =>{
    const {email,password} = req.body;
    if(!email && email.trim() === "" && !password && password.trim() === ""){
        return res.status(422).json({message: "Invalid Inputs"})
    }
    let exsistingAdmin;
    try{
        exsistingAdmin = await  Admin.findOne({email});
    }
    catch(err){
        return console.log(err);
    }
    if(exsistingAdmin){
        return res.status(400).json({message:"Admin already exists"});
    }
    let admin;
    const hashedPassword = bcrypt.hashSync(password);
    try{
        admin = new Admin({email, password: hashedPassword});
        admin = await admin.save();
    }
    catch(err){
        return console.log(err);
    }
    if(!admin){
        return res.status(500).json({message:"Unable to store admin"});
    }
    return res.status(200).json({admin});
};

export const adminLogin = async(req,res,next)=>{
   const {email,password} = req.body;
    if(!email && email.trim()==="" && !password && password.trim()==="")
    {
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let exsistingAdmin;
    try{
        exsistingAdmin = await Admin.findOne({email});
    }
    catch(err){
        return console.error(err);
    }
    if(!exsistingAdmin){
        return res.status(400).json({message:"Admin not found"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password,exsistingAdmin.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password"});
    }
    const token = jwt.sign({id:exsistingAdmin._id},process.env.SECRET_KEY,{
        expiresIn: "7d"
    });
    return res.status(200).json({message:"Authentication completed successfully", token,id:exsistingAdmin._id})};

export const getAdmins = async(req,res,next)=>{
    let admins;
    try{
        admins = await Admin.find({});
    }
    catch(err){
        return console.log(err);
    }
    if(!admins){
        return res.status(500).json({message:"Internal Server Error"});
    }
    return res.status(200).json({admins});
}
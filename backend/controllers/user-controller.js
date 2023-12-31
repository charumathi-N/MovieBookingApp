import User from "../models/User.js";
import Booking from "../models/Booking.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) =>{
    let users;        
    try{
        users = await User.find();
    }
    catch(err){
        return console.log(err);
    }

    if(!users){
        return res.status(500).json({message: "Unexpeced Error Occured"})
    }
    return res.status(200).json({users});
}

export const addUser = async (req, res,next) =>{
    const {name,email,password } = req.body;
    if(
        !name && name.trim()==="" &&
        !email && email.trim()==="" && 
        !password && password.trim()===""
    )
    {
        return res.status(422).json({message:"Invalid Inputs"});
    }
    const hashedPassword = bcrypt.hashSync(password);
    let user;
    try{
     user = new User({name, email, password: hashedPassword}); 
     user = await user.save(); //To save document inside the collection
    }
    catch(err){
       return console.log(err);
    }
    if(!user){
        return res.status(500).json({message:"Unexpected error"});
    }
    return res.status(201).json({id: User._id});
}

export const updateUser = async (req, res, next)=>{
    const id = req.params.id; //to get from url
    const {name,email,password } = req.body;
    if(
        !name && name.trim()==="" &&
        !email && email.trim()==="" && 
        !password && password.trim()===""
    )
    {
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let user;
    try{
        user = await User.findByIdAndUpdate(id,{name,email,password});
    }
    catch(err) {
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({message: "User not found"});
    }
    res.status(200).json({message:"Updated successfully"});
};

export const deleteUser = async (req,res,next) =>{
    const id = req.params.id;
    let user;
    try{
        user = await User.findByIdAndDelete(id);
    }
    catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({message:"Something went wrong"});
    }
    return res.status(200).json({message:"Deleted Successfully"});
}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    if(!email && email.trim()=== "" && !password && password.trim()=== ""){
        return res.status(500).json({message:"Invalid email"});
    }
    let exsistingUser;
    try{
       exsistingUser = await User.findOne({email });
    }
    catch(err){
        return console.log(err);
    }
    
    if(!exsistingUser){
      return res.status(404).json({message:"Unable to find user from this ID"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, exsistingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect password"});
    }
    return res.status(200).json({message:"Login Successful"});
}

export const getBookingOfUser = async (req, res, next) =>{
    const id = req.params.id;
    let bookings;
    try{
        bookings = await Booking.find({user:id});
    }
    catch(err){
        return console.log(err);
    }
    if(!bookings){
        return res.status(500).json({message:"Unable to get Bookings"});
    }
    return res.status(200).json({bookings});
}
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

export const addAdmin = async (req, res, next) =>{
    console.log('sd')
    const {email,password} = req.body;
    
    return res.status(200).json();
};

export const adminLogin = async(req,res,next)=>{
    console.log("ds")
   const {email,password} = req.body;
   console.log(email,password);
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
        return res.status(422).json({message:"Admin not found"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password,exsistingAdmin.password);
    if(!isPasswordCorrect){
        return res.status(422).json({message:"Invalid Password"});
    }
    return res.status(200).json({message:"Authentication completed successfully"})
}
import { response } from "express";
import jwt from "jsonwebtoken"
import mongoose from 'mongoose';
import Movie from "../models/Movie.js";
import Admin from "../models/Admin.js";
export const  addMovie = async (req,res,next) =>{
    const extractedToken = req.headers.authorization.split(" ")[1]; //Bearer token
    if(!extractedToken && extractedToken.trim() === ""){
        return  res.status(404).json({message:"Token not found"});
    }
    let adminId;
    
    //verify token
    jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted)=>{
        if(err){
            return res.status(400).json({message: `${err.message}`});
        }
        else{
            adminId = decrypted.id;
            return;
        }
    });
 
    //create new movie

    const { title, description ,actors, releaseDate , posterUrl, featured} = req.body;
    if(!title && title.trim()=== "" && !description && description.trim()=== "" && !posterUrl && posterUrl.trim()=== "" && !featured && featured.trim()=== "")
    {
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let movie;
    try{
        movie = new Movie({
            title,
            description, 
            actors,
             releaseDate: new Date(`${releaseDate}`),
              featured, 
              admin: adminId,
              posterUrl
            });
    const session =  await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await movie.save({session});
    adminUser.addedMovies.push(movie);
    await adminUser.save({session});
    await session.commitTransaction();
    }
    catch(err){
        return console.log(err);
    }
    if(!movie){
        return res.status(500).json({message:"Request Failed"});
    }
    return res.status(201).json({movie});
}


export const getAllMovies = async (req, res) => {
    let movies;
    try{
      movies = await Movie.find({});
    }
    catch(err){
       return console.log(err);
    }
    if(!movies){
        return res.status(500).json({message:"Request Failed"});
    }
    return res.status(200).json({movies})
}


export const getAllMoviesById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    let movies;
    try{
      movies = await Movie.findById(id);
    }
    catch(err){
       return console.log(err);
    }
    if(!movies){
        return res.status(500).json({message:"Invalid Movie ID"});
    }
    return res.status(200).json({movies})
}
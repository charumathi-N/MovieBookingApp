import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true,
    },
    description:{
        type: String,
        required : false,
    },
    actors:[{type:String, required:true}],
    releaseDate:{
        type : Date,
       required : true,
    },
    posterUrl:{
        type : String,
        required : true,
    },
    featured:{
        type : Boolean,
    },
    bookings:[{type: mongoose.Types.ObjectId,ref:"Booking"}],
    admin:{
        type :mongoose.Types.ObjectId,
        ref: "Admin",
     required : false,
    },
});

export default mongoose.model("Movie",movieSchema)
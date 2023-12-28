//Creation of API with express.js
//Nodemon is used for automatic server rendering..
import express from "express"; //This is due to type:"module" in package.json, we can do ES6 imports
import mongoose from "mongoose";// helps for connecting our app to cloud mongodb
import dotenv from  "dotenv";//For hiding password
import userRouter from "./backend/routes/user-routers.js";
import adminRouter from "./backend/routes/admin-routes.js";
import movieRouter from "./backend/routes/movie-routes.js";
import bookingsRouter from "./backend/routes/booking-routes.js";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors()); // Place cors middleware before route definitions

//middleware
app.use(express.json()); //Post request should be json format
app.use("/user", userRouter);
app.use("/admin",adminRouter);
app.use("/movie",movieRouter);
app.use("/booking",bookingsRouter);

mongoose.connect(`mongodb+srv://Charumathi:${process.env.MONGODB_PASSWORD}@cluster0.yd0dfa5.mongodb.net/?retryWrites=true&w=majority` 
)
.then(console.log("Connected to cloud DB and server is running"))
.catch((e)=>console.log(e));

    app.use("/", (req,res,next)=>{
        res.send("Hi");
    });


//for opening my server port and listening on port
app.listen(5000,()=>{
    console.log(`connected to localhost port ${5000}`)
})







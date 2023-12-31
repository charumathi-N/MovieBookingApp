import express from "express";
import {signup,adminLogin,getAdmins} from "../controllers/admin-controller.js"

const adminRouter = express.Router();
adminRouter.post("/signup",signup);
adminRouter.post("/login",adminLogin);
adminRouter.get("/",getAdmins);

export default adminRouter;
import express from "express";
import {addAdmin} from "../controllers/admin-controller.js"
import {adminLogin} from "../controllers/admin-controller.js"

const adminRouter = express.Router();
adminRouter.post("/signup",addAdmin);
adminRouter.post("/login",adminLogin);

export default adminRouter;
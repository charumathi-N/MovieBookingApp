import express from "express";
import { getAllUsers } from "../controllers/user-controller.js";
import { addUser } from "../controllers/user-controller.js";
import { updateUser } from "../controllers/user-controller.js";
import { deleteUser } from "../controllers/user-controller.js";
import { login } from "../controllers/user-controller.js";

const userRouter = express.Router();
userRouter.get("/",getAllUsers);
userRouter.post("/signup",addUser);
userRouter.put("/:id",updateUser);
userRouter.delete("/:id",deleteUser);
userRouter.post("/login",login);
userRouter.get("/bookings/:id",login);


export default userRouter;
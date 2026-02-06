import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  getUserDetails
} from "../controllers/userController.js";

import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);

userRouter.get('/details', authUser, getUserDetails);

export default userRouter;

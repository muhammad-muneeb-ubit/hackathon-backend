import express from "express";
import {
  approveRequest,
  changeRole,
  deleteUser,
  getAllUsers,
  getPendingUsers,
  getSingleUser,
  rejectRequest,
  updateUserProfile,
} from "../controller/user.js";
import { protect } from "../midddleware/auth.js";

const userRouter = express.Router();

userRouter.use(protect) // only admin can access

userRouter.get("/", getAllUsers);
userRouter.get("/single/:id", getSingleUser);
userRouter.patch("/approve/:id", approveRequest);
userRouter.patch("/reject/:id", rejectRequest);
userRouter.get("/change-role/:id", changeRole)
userRouter.put("/:id", updateUserProfile);
userRouter.delete("/:id", deleteUser);
userRouter.get("/pending", getPendingUsers);

export default userRouter;
 
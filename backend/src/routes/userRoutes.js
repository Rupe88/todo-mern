import express from "express";
import {
  changePassword,
  forgotPassword,
  getUser,
  getUserProfileWithTodos,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
  userLoginStatus,
  verifyEmail,
  verifyUser,
} from "../controllers/auth/userController.js";
import {
  adminMiddleware,
  creatorMiddleware,
  protect,
} from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUsers,
} from "../controllers/auth/adminController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);
// Sample route to search users by email (example: /auth/search?email=someuser@gmail.com)

// admin route
router.delete("/admin/users/:id", protect, adminMiddleware , deleteUser);

// get all users
router.get("/admin/users", protect, creatorMiddleware, getAllUsers);

// login status
router.get("/login-status", userLoginStatus);

// email verification
router.post("/verify-email", protect, verifyEmail);

// veriify user --> email verification
router.post("/verify-user/:verificationToken", verifyUser);

// forgot password
router.post("/forgot-password", forgotPassword);

//reset password
router.post("/reset-password/:resetPasswordToken", resetPassword);

// change password ---> user must be logged in
router.patch("/change-password", protect, changePassword);

router.get("/:userId/profile", protect, getUserProfileWithTodos);


export default router;

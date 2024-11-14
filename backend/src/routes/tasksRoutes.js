// src/routes/tasksRoutes.js
import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/create", protect, upload.single("file"), createTask);

router.get("/tasks",protect, getTasks);
router.get("/:id", protect, getTask);
router.patch("/:id", protect, upload.single("file"), updateTask);
router.delete("/:id", protect, deleteTask);

export default router;

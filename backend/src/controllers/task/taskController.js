import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/TaskModel.js";
import upload from "../../middleware/multerMiddleware.js";
//create task for logged in user
export const createTask = asyncHandler(async (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { title, description, dueDate, priority, status } = req.body;
      const file = req.file ? req.file.filename : undefined;

      if (!title || title.trim() === "") {
        return res.status(400).json({ message: "Title is required!" });
      }

      const task = new TaskModel({
        title,
        description,
        dueDate,
        priority,
        status,
        user: req.user._id,
        file,
      });

      await task.save();
      res.status(201).json(task);
    } catch (error) {
      console.log("Error in createTask: ", error.message);
      res.status(500).json({ message: error.message });
    }
  });
});
export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      res.status(400).json({ message: "User not found!" });
    }

    const tasks = await TaskModel.find({ user: userId });

    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error in getTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log("Error in getTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});
//update
export const updateTask = asyncHandler(async (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const userId = req.user._id;
      const { id } = req.params;
      const { title, description, dueDate, priority, status, completed } = req.body;
      const file = req.file ? req.file.filename : undefined;

      const task = await TaskModel.findById(id);
      if (!task) return res.status(404).json({ message: "Task not found!" });
      if (!task.user.equals(userId)) return res.status(401).json({ message: "Not authorized!" });

      task.title = title || task.title;
      task.description = description || task.description;
      task.dueDate = dueDate || task.dueDate;
      task.priority = priority || task.priority;
      task.status = status || task.status;
      task.completed = completed || task.completed;
      if (file) task.file = file; // update file if a new one is uploaded

      await task.save();
      res.status(200).json(task);
    } catch (error) {
      console.log("Error in updateTask: ", error.message);
      res.status(500).json({ message: error.message });
    }
  });
});
//delete task s
export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    // check if the user is the owner of the task
    if (!task.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

/// Nuclear option for deleting all tasks
export const deleteAllTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await TaskModel.find({ user: userId });

    if (!tasks) {
      res.status(404).json({ message: "No tasks found!" });
    }

    // check if the user is the owner of the task
    if (!tasks.user.equals(userId)) {
      res.status(401).json({ message: "Not authorized!" });
    }

    await TaskModel.deleteMany({ user: userId });

    return res.status(200).json({ message: "All tasks deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteAllTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

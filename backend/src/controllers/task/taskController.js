import asyncHandler from 'express-async-handler';
import TaskModel from '../../models/tasks/TaskModel.js';

// Create task for logged-in user with optional file upload
export const createTask = asyncHandler(async (req, res) => {
  console.log('req.file:', req.file); // Should show file details
  console.log('req.body:', req.body); // Should show other fields

  if (!req.file) {
    return res.status(400).json({ message: 'File upload failed' });
  }
  try {
    const { title, description, dueDate, priority, status } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required!' });
    }

    const filePath = req.file
      ? `http://localhost:3000/uploads/${req.file.filename}`
      : null;

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
      file: filePath,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.log('Error in createTask: ', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get all tasks for logged-in user
export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await TaskModel.find({ user: userId });

    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log('Error in getTasks: ', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Get a specific task with pagination, filtering, and sorting
export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, priority, status } = req.query;

    const query = { user: userId };
    if (priority) query.priority = priority;
    if (status) query.status = status;

    const tasks = await TaskModel.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalTasks = await TaskModel.countDocuments(query);

    res.status(200).json({
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
      tasks,
    });
  } catch (error) {
    console.log('Error in getTask: ', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update task with optional file replacement
export const updateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } =
      req.body;

    const task = await TaskModel.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found!' });
    if (!task.user.equals(userId))
      return res.status(401).json({ message: 'Not authorized!' });

    // Update fields and add new file path if a new file is uploaded
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed !== undefined ? completed : task.completed;
    if (req.file) {
      task.file = `http://localhost:3000/uploads/${req.file.filename}`;
    }

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.log('Error in updateTask: ', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete a specific task
export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const task = await TaskModel.findById(id);
    if (!task) return res.status(404).json({ message: 'Task not found!' });
    if (!task.user.equals(userId))
      return res.status(401).json({ message: 'Not authorized!' });

    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted successfully!' });
  } catch (error) {
    console.log('Error in deleteTask: ', error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete all tasks for logged-in user
export const deleteAllTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await TaskModel.find({ user: userId });

    if (!tasks.length) {
      return res.status(404).json({ message: 'No tasks found!' });
    }

    await TaskModel.deleteMany({ user: userId });
    res.status(200).json({ message: 'All tasks deleted successfully!' });
  } catch (error) {
    console.log('Error in deleteAllTasks: ', error.message);
    res.status(500).json({ message: error.message });
  }
});

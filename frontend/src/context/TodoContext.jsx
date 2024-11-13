import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from '../config/axiosConfig';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks for the logged-in user
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/task/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Create a new task with file upload
  const createTask = async (taskData) => {
    const formData = new FormData();
    Object.keys(taskData).forEach((key) => formData.append(key, taskData[key]));

    try {
      const response = await axios.post('http://localhost:3000/task/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTasks([...tasks, response.data]);
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  // Update an existing task with file upload
  const updateTask = async (id, taskData) => {
    const formData = new FormData();
    Object.keys(taskData).forEach((key) => formData.append(key, taskData[key]));

    try {
      const response = await axios.patch(`http://localhost:3000/task/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      toast.success('Task updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  // Delete a single task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/task/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <TodoContext.Provider
      value={{
        tasks,
        loading,
        createTask,
        updateTask,
        deleteTask,
        fetchTasks,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

TodoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

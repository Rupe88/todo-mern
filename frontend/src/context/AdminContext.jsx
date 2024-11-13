import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from '../config/axiosConfig';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all users with optional search parameters
  const fetchUsers = async (searchParams = {}) => {
    try {
      setLoading(true);
      const query = new URLSearchParams(searchParams).toString();
      const response = await axios.get(`http://localhost:3000/auth/admin/users?${query}`);

      setUsers(response.data.users); // Assuming response structure { users: [...] }
      toast.success('Users loaded successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Delete a user by ID
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/auth/admin/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  // Fetch a specific user's profile along with their todos
const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/auth/${userId}/profile`);
    return response.data; // Returns user profile and todos
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch user profile');
    throw error; // Rethrow to handle in the component
  }
};


  return (
    <AdminContext.Provider value={{ users, loading, fetchUsers, deleteUser,fetchUserProfile }}>
      {children}
    </AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

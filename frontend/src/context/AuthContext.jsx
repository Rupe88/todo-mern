import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import axios from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Call checkLoginStatus only if user is undefined (to avoid extra calls)
    if (user === null) {
      checkLoginStatus();
    }
  }, []);

  const registerUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData, {withCredentials:true});
      setUser(response.data);
      toast.success('Registered successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  const loginUser = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', userData, {withCredentials:true});
      setUser(response.data);
      toast.success('Logged in successfully!');
      navigate('/todo');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post('http://localhost:3000/auth/logout',{withCredentials:true});
      setUser(null);
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
        console.log(error)
      toast.error('Logout failed');
    }
  };



  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/login-status', {
        withCredentials:true
      });
      if (response.data.user) { // Ensure we have user data from response
        setUser(response.data.user);
      }
      // setUser(response.data);
    } catch (error) {
        console.log(error)
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  

  const forgotPassword = async (email) => {
    try {
      await axios.post('http://localhost:3000/auth/forgot-password', { email }, {withCredentials:true});
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    }
  };

  const resetPassword = async (resetToken, password) => {
    try {
      await axios.post(`http://localhost:3000/auth/reset-password/${resetToken}`, { password }, {withCredentials:true});
      toast.success('Password reset successfully!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password reset failed');
    }
  };

  const changePassword = async (passwords) => {
    try {
      await axios.post('http://localhost:3000/auth/change-password', passwords, {withCredentials:true});
      toast.success('Password changed successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };



  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        logoutUser,
        forgotPassword,
        resetPassword,
        changePassword,
      }}
    >
      {children}
      
    </AuthContext.Provider>
  );
};

// Add PropTypes for children validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

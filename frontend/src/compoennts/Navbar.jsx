import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, CheckSquare, User, LogIn, LogOut, List, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // for dropdown menu
  const { user, logoutUser } = useContext(AuthContext); // Access user and logout function

  return (
    <nav className="bg-[#E81C4F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2">
              <CheckSquare className="h-8 w-8" />
              <span className="font-bold text-2xl" style={{ fontFamily: 'Arial' }}>मेरो Task</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200 transition-colors duration-200">Home</Link>
            

            <div className="flex items-center space-x-4">
              {user && user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="px-4 py-2 rounded-md hover:bg-white hover:text-[#E81C4F] transition-colors flex items-center space-x-2"
                >
                  <BarChart2 className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              )}
              {user ? (
                <>
                  <Link
                    to="/todo"
                    className="px-4 py-2 rounded-md hover:bg-white hover:text-[#E81C4F] transition-colors flex items-center space-x-2"
                  >
                    <List className="h-4 w-4" />
                    <span>Todo</span>
                  </Link>

                  {/* Profile dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-white hover:text-[#E81C4F] transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>{user.name}</span>
                    </button>

                    {/* Dropdown menu */}
                    {profileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                      >
                        <div className="p-4 text-gray-700">
                          <p>{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <button
                          onClick={logoutUser}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md hover:bg-white hover:text-[#E81C4F] transition-colors flex items-center space-x-2"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-white text-[#E81C4F] rounded-md hover:bg-opacity-90 transition-colors flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-[#d1193f] transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md text-white hover:bg-[#d1193f] transition-colors">Home</Link>

          {user && user.role === "admin" && (
            <Link to="/admin/dashboard" className="block px-3 py-2 rounded-md text-white hover:bg-[#d1193f] transition-colors">
              Dashboard
            </Link>
          )}
          {user ? (
            <>
              <Link to="/todo" className="block px-3 py-2 rounded-md text-white hover:bg-[#d1193f] transition-colors">
                Todo
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false); // Close menu after logout
                  logoutUser();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-white hover:bg-[#d1193f] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 rounded-md text-white hover:bg-[#d1193f] transition-colors">
                Login
              </Link>
              <Link to="/register" className="block px-3 py-2 rounded-md text-white hover:bg-[#d1193f] transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;

import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, CheckSquare, User, LogIn, LogOut, List, BarChart2, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuOpen && !event.target.closest('.profile-menu')) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [profileMenuOpen]);

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center space-x-2
        ${isActiveRoute(to) 
          ? 'bg-white text-[#E81C4F] font-medium shadow-sm' 
          : 'hover:bg-white/10 text-white'}`}
    >
      {children}
    </Link>


  );
  NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  return (
    <nav className="bg-gradient-to-r from-[#E81C4F] to-[#FF4D7D] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <CheckSquare className="h-8 w-8" />
              </motion.div>
              <span className="font-bold text-2xl tracking-tight">मेरो Task</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/">
              <span>Home</span>
            </NavLink>

            {user && (
              <>
                {user.role === "admin" && (
                  <NavLink to="/admin/dashboard">
                    <BarChart2 className="h-4 w-4" />
                    <span>Dashboard</span>
                  </NavLink>
                )}
                <NavLink to="/todo">
                  <List className="h-4 w-4" />
                  <span>Todo</span>
                </NavLink>

                {/* Profile dropdown */}
                <div className="relative profile-menu">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setProfileMenuOpen(!profileMenuOpen);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200
                      ${profileMenuOpen 
                        ? 'bg-white text-[#E81C4F]' 
                        : 'hover:bg-white/10 text-white'}`}
                  >
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </button>

                  <AnimatePresence>
                    {profileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10 overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-100">
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/profile"
                            className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 transition-colors w-full"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                          <button
                            onClick={logoutUser}
                            className="flex items-center space-x-2 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors w-full"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {!user && (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors flex items-center space-x-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-[#E81C4F] rounded-md hover:bg-opacity-90 transition-colors flex items-center space-x-2 shadow-sm"
                >
                  <User className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md transition-colors ${
                  isActiveRoute('/') ? 'bg-white text-[#E81C4F]' : 'text-white hover:bg-white/10'
                }`}
              >
                Home
              </Link>

              {user && (
                <>
                  {user.role === "admin" && (
                    <Link 
                      to="/admin/dashboard" 
                      className={`block px-3 py-2 rounded-md transition-colors ${
                        isActiveRoute('/admin/dashboard') ? 'bg-white text-[#E81C4F]' : 'text-white hover:bg-white/10'
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link 
                    to="/todo" 
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      isActiveRoute('/todo') ? 'bg-white text-[#E81C4F]' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    Todo
                  </Link>
                  <div className="px-3 py-2 text-sm text-white/70">
                    Signed in as {user.email}
                  </div>
                  <button
                    onClick={logoutUser}
                    className="block w-full text-left px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}

              {!user && (
                <>
                  <Link 
                    to="/login" 
                    className="block px-3 py-2 rounded-md text-white hover:bg-white/10 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-3 py-2 rounded-md bg-white text-[#E81C4F] hover:bg-opacity-90 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};




export default Navbar;
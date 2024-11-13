import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"
      >
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="text-[#E81C4F] hover:text-[#d1193f]">
              Register
            </Link>
          </p>
        </div>
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <InputField
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            icon={<Lock className="h-5 w-5 text-gray-400" />}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleIcon={
              showPassword ? (
                <EyeOff
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <Eye
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )
            }
          />
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-[#E81C4F] hover:text-[#d1193f]">
              Forgot Password?
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-white bg-[#E81C4F] hover:bg-[#d1193f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E81C4F]"
            >
              Login
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const InputField = ({ icon, type, placeholder, value, onChange, toggleIcon }) => (
  <div className="relative rounded-md shadow-sm">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {icon}
    </div>
    <input
      type={type}
      className="focus:ring-[#E81C4F] focus:border-[#E81C4F] block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md text-sm placeholder-gray-400"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {toggleIcon && (
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        {toggleIcon}
      </div>
    )}
  </div>
);

InputField.propTypes = {
  icon: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  toggleIcon: PropTypes.node,
};

export default LoginPage;

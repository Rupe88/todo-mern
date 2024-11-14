import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setIsSubmitting(true);  // Disable button
    await forgotPassword(email);
    setIsSubmitting(false); // Enable button
    setEmail(''); // Clear the email input after submission
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Forgot Password</h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your email to receive a password reset link.
        </p>
        <form onSubmit={handleForgotPassword}>
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your email"
            required
          />
    <button
  type="submit"
  disabled={isSubmitting}
  className={`w-full bg-red-600 hover:bg-red-700 text-white p-2 rounded-md mt-4 transition duration-200 ${
    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  {isSubmitting ? "Sending..." : "Send Reset Link"}
</button>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

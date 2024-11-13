import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, user: true }]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3000/chat', {
        message: input,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      setMessages((prev) => [...prev, { text: response.data.response, user: false }]);
    } catch (error) {
      console.error('Error:', error);
      setError('Oops! Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-50 bg-[#E81C4F] text-white">
      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bbg-[#E81C4F] text-white font-bold py-2 px-4 rounded-full shadow-lg"
            onClick={() => setIsOpen(true)}
          >
        Timro AI
          </motion.button>
        )}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col"
          >
            <div className="bg-[#E81C4F] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-bold">Timro Homework Garne Mitra</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                Close
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-2 p-2 rounded-lg ${
                      message.user 
                        ? 'bg-blue-100 text-pink-800 ml-auto' 
                        : 'bg-gray-100 text-gray-800'
                    } max-w-[70%]`}
                  >
                    {message.text}
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                </div>
              )}
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{error}</span>
                </motion.div>
              )}
            </div>
            <div className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-grow mr-2 p-2 border rounded"
                  disabled={isLoading}
                />
                <button 
                  onClick={sendMessage}
                  className={`bg-[#E81C4F] text-white font-bold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChatBot;
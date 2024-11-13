import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import {TodoProvider} from './context/TodoContext';
import { AdminProvider } from './context/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <TodoProvider>
          <AdminProvider>

          <ToastContainer position="top-right" autoClose={5000} />
          <App />

          </AdminProvider>

        </TodoProvider>
 
      </AuthProvider>
    </Router>
  </StrictMode>,
)

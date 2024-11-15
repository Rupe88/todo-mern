import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './compoennts/Navbar';
import TodoPage from './pages/TodoPage';
import ResetPassword from './pages/ResetPassword';
// import { AuthContext } from "./context/AuthContext";
// import { useContext } from "react";
import DashboardPage from './pages/admin/DashboardPage';
import ForgotPassword from './compoennts/ForgotPassword';
// import ChatBot from "./chatbot/ChatBot";
import { Suspense } from 'react';
import AboutPage from './pages/AboutPage';
const App = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <Navbar />
        {/* <ChatBot/> */}
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
          <Route path='/features' element={<AboutPage/>}/>

        </Routes>
      </Suspense>
    </>
  );
};

export default App;

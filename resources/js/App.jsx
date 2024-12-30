import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ToastNotification from './components/ToastNotification';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage'; 
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import BoardDetail from './components/BoardDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastNotification /> 
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/board/show/:boardId" element={<BoardDetail />} />
        </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);

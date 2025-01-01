import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ToastNotification from './components/ToastNotification';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import BoardDetail from './components/BoardDetail';

function App() {
  const location = useLocation();

  const noNavbarPages = ['/board/show/'];

  const shouldShowNavbar = !noNavbarPages.some(page => location.pathname.startsWith(page));

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <ToastNotification />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/board/show/:boardId" element={<BoardDetail />} />
      </Routes>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(
  <Router>
    <App />
  </Router>
);

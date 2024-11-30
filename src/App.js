import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage';
import TaskManagementBoard from './pages/Dashboard'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<TaskManagementBoard/>} />
      </Routes>
    </Router>
  );
}

export default App;
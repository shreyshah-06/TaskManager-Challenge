import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TaskManagementBoard from './pages/Dashboard';
import TokenPage from './pages/TokenPage';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check if the auth token exists in localStorage
  //   const token = localStorage.getItem('authToken');
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* Redirect to login if not authenticated */}
        {/* <Route
          path="/"
          element={isAuthenticated ? <TaskManagementBoard /> : <Navigate to="/login" />}
        /> */}
        
        {/* Public routes */}
        <Route path="/" element={<TaskManagementBoard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Token page route */}
        <Route path="/oauth/success/auth/token" element={<TokenPage />} />
      </Routes>
    </Router>
  );
}

export default App;

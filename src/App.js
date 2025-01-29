import React, { useState, useEffect } from 'react';
import './App.css';
import AirbnbHomePage from './Components/AirBnbHomePage';
import AuthPage from './Components/AuthPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a valid session
    const storedEmail = localStorage.getItem('email');
    if (!storedEmail) {
      // Optionally verify with the server for session validity here
      setIsAuthenticated(false);
    } else {
      localStorage.clear(); // Clear any invalid data in localStorage
      setIsAuthenticated(false);
    }
  }, []);

  const handleLoginSuccess = (email) => {
    localStorage.setItem('email', email); // Save user email to localStorage
    setIsAuthenticated(true); // Mark user as authenticated
  };

  const handleLogout = () => {
    localStorage.removeItem('email'); // Clear email from localStorage
    setIsAuthenticated(false); // Reset authentication state
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <AirbnbHomePage onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;

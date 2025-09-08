import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        showToast('Login successful!', 'success');
        setTimeout(() => {
          navigate('/home');
        }, 1500);
      } else {
        showToast(data.message || 'Invalid credentials', 'error');
      }
    } catch (error) {
      showToast('Error logging in. Please try again.', 'error');
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="logo-section">
            <div className="logo-icon">🛒</div>
            <h1>SportThreads</h1>
            <p>Premium sports jerseys for champions</p>
          </div>
          <div className="toggle-buttons">
            <button className="active">Login</button>
            <button onClick={goToSignup}>Sign Up</button>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <label>Email or Username</label>
            <input
              type="text"
              placeholder="Enter your email or username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-submit">Sign In</button>
          </form>
        </div>
      </div>
      {toast.message && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />}
    </>
  );
};

export default Login;

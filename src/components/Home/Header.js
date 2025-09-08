import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get username from localStorage or token payload
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsername(payload.username || '');
      } catch {
        setUsername('');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/home" className="logo">SportThreads</Link>
        <nav className="nav-links">
          <Link to="/home">Shop</Link>
          <Link to="/home#about">About</Link>
        </nav>
      </div>
      <div className="header-right">
        <span className="user-icon">👤 {username || 'user'}</span>
        <span className="cart-icon" onClick={() => {
          window.dispatchEvent(new Event('toggleCart'));
          setTimeout(() => {
            const cartSection = document.querySelector('.cart-container');
            if (cartSection) {
              cartSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }}>🛒</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;

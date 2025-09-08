import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section about">
        <h3>SportThreads</h3>
        <p>
          Premium authentic sports jerseys from your favorite football, cricket, and NBA teams. Quality guaranteed, passion delivered.
        </p>
        <div className="social-icons">
          <span>📘</span>
          <span>🐦</span>
          <span>📸</span>
        </div>
      </div>
      <div className="footer-section quick-links">
        <h4>Quick Links</h4>
        <ul>
          <li>Football Jerseys</li>
          <li>Cricket Jerseys</li>
          <li>NBA Jerseys</li>
          <li>New Arrivals</li>
          <li>Sale Items</li>
        </ul>
      </div>
      <div className="footer-section customer-service">
        <h4>Customer Service</h4>
        <ul>
          <li>Contact Us</li>
          <li>Size Guide</li>
          <li>Shipping Info</li>
          <li>Returns</li>
          <li>FAQ</li>
        </ul>
      </div>
      <div className="footer-section contact-info">
        <h4>Contact Info</h4>
        <ul>
          <li>📧 ayanbiswas1331@gmail.com</li>
          <li>📞 +91 8116615667</li>
          <li>📍 Palashipara, Nadia, West Bengal 741155</li>
        </ul>
      </div>
      <div className="footer-bottom">
        &copy; 2024 SportThreads. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

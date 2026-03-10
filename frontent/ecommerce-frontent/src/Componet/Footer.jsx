import React from 'react'
import '../styles/home.css';

export default function Footer() {
  return (
    <div>
       <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="/" className="logo">Shop<span>Hub</span></a>
            <p>Your one-stop destination for all your shopping needs. 
               Quality products, great prices, and excellent customer service.</p>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📸</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📺</a>
            </div>
          </div>
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/Allproduct">Products</a></li>
              <li><a href="/">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact Us</h4>
            <ul>
              <li>📍 123 Store Street, City</li>
              <li>📞 91+8053104762</li>
              <li>✉️ support@shophub.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ShopHub. All rights reserved.   #tarunthakur</p>
        </div>
      </footer>
    </div>
  )
}

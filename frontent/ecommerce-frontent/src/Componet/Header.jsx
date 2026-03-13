import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {

const [isLogin, setIsLogin] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
const navigate = useNavigate();

useEffect(() => {
const token = localStorage.getItem("token");
if (token) {
setIsLogin(true);
}
}, []);

const handleLogout = () => {
localStorage.removeItem("token");
setIsLogin(false);
navigate("/login");
};

return ( <header className="header"> <nav className="navbar">


    <NavLink to="/" className="logo">
      Shop<span>Hub</span>
    </NavLink>

    {/* Hamburger */}
    <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? "✖" : "☰"}
    </div>

    <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
      <li><NavLink to="/" className="nav-link">Home</NavLink></li>
      <li><NavLink to="/category" className="nav-link">Shop</NavLink></li>
      <li><NavLink to="/Allproduct" className="nav-link">All Products</NavLink></li>
      <li><NavLink to="/order" className="nav-link">Order</NavLink></li>

      {/* Mobile login/logout */}
      <li className="mobile-auth">
        {isLogin ? (
          <button onClick={handleLogout} className="btn-primary-logout">
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login" className="btn-primary">Login</NavLink>
            <NavLink to="/register" className="btn-secondary">Register</NavLink>
          </>
        )}
      </li>

      <li className="mobile-cart">
        <NavLink to="/cart" className="nav-link">🛒 Cart</NavLink>
      </li>

    </ul>

    {/* Desktop actions */}
    <div className="nav-actions">
      <NavLink to="/cart" className="nav-link">🛒 Cart</NavLink>

      {isLogin ? (
        <button onClick={handleLogout} className="btn-primary-logout">
          Logout
        </button>
      ) : (
        <>
          <NavLink to="/login" className="btn-primary">Login</NavLink>
          <NavLink to="/register" className="btn-secondary">Register</NavLink>
        </>
      )}
    </div>

  </nav>
</header>

);
}

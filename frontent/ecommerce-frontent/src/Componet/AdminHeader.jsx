import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/adminheader.css'

export default function AdminHeader() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="admin-header">

      <div className="admin-logo">
        Admin Panel
      </div>

      <nav className="admin-nav">

        <Link to="/adminproduct">
          Manage Products
        </Link>

        <Link to="/admincategories">
          Manage Categories
        </Link>
        <Link to="/admin">
          Manage Order
        </Link>

      </nav>

      <div className="admin-actions">

        {token && (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}

      </div>

    </header>
  );
}
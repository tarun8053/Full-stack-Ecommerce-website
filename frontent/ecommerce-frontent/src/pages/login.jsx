import React from "react";
import "../styles/login.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../Componet/Header";
import Footer from "../Componet/Footer";

function Login() {

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/auth/login`, { email, password })
      .then(response => {
        const token = response.data.token;
        const decoded = jwtDecode(token);

        
        //console.log(response.data.isAdmin)
        
        
        localStorage.setItem("token", response.data.token);
        if(decoded.isAdmin){
         
          localStorage.setItem("isAdmin","true");
          navigate("/admin");
          
        }else{
          localStorage.setItem("isAdmin","false")
          navigate("/");
          
        }
        
      })
      .catch(error => {
        alert("Something wrong..!");
        console.log("error occured", error);
      });
  }

  return (
    <div>
      <Header/>
      <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" required />

          <button type="submit">Login</button>
        </form>

        <p className="signup-text">
          Don't have an account? <NavLink to="/register"><span>Register</span></NavLink>
        </p>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Login;
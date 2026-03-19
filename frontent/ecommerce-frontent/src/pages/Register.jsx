
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
import Header from "../Componet/Header";
import { useLoader } from "../LoaderContext";

export default function Register() {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const address = formData.get("address");
    const contactNumber = formData.get("phone");

    try {
      showLoader();

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/register`,
        { name, email, password, address, contactNumber }
      );

      console.log(response.data);
      alert("Registration Successfully");
      navigate("/login");

    } catch (error) {
      console.error("this is error", error);
      alert("registration failed, please try again.");
    } finally {
      hideLoader(); // ✅ important
    }
  }

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-card">
          <h2>Create Account</h2>
          <p className="subtitle">Register for your account</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" placeholder="Enter your name" required />

            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required />

            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your password" required />

            <label>Address</label>
            <input type="text" name="address" placeholder="Enter your address" required />

            <label>Contact Number</label>
            <input type="text" name="phone" placeholder="Enter your phone number" required />

            <button type="submit">Register</button>
          </form>

          <p className="signup-text">
            Already have an account? 
            <NavLink to="/login"><span>Login</span></NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}


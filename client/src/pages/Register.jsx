import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      alert(res.data.message);

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-page">

      <Link to="/" className="home-link">
        ← Back to Home
      </Link>

      <div className="auth-card">

        <div className="auth-left">
          <h1>Join Chefora 🍴</h1>

          <p>
            Create an account to save recipes,
            upload dishes and connect with food lovers.
          </p>
        </div>

        <div className="auth-right">

          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-box">
              <FaUser />
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-box">
              <FaLock />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">
              Register
            </button>

            <p className="switch-page">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;
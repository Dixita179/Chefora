import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
  "https://chefora-5n7r.onrender.com/api/auth/login",
  formData
);
     

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-page">

      <Link to="/" className="home-link">
        ← Back to Home
      </Link>

      <div className="auth-card">

        <div className="auth-left">
          <h1>Welcome Back 👋</h1>

          <p>
            Login to continue exploring delicious recipes,
            cooking videos and your favorite dishes.
          </p>
        </div>

        <div className="auth-right">

          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-box">
              <FaEnvelope />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
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
              Login
            </button>

            <p className="switch-page">
              Don't have an account?
              <Link to="/register"> Register</Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AuthPopup.css";

function AuthPopup({ delay = 5000 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Skip if user already dismissed it this session, or is logged in
    const dismissed = sessionStorage.getItem("authPopupDismissed");
    const token = localStorage.getItem("token"); // adjust to however you store auth

    if (dismissed || token) return;

    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("authPopupDismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="auth-popup-overlay" onClick={handleClose}>
      <div className="auth-popup" onClick={(e) => e.stopPropagation()}>
        <button className="auth-popup-close" onClick={handleClose}>
          &times;
        </button>

        <h3>Join Chefora</h3>
        <p>Log in or create an account to save your favorite recipes.</p>

        <div className="auth-popup-actions">
          <Link to="/login" className="auth-popup-btn login" onClick={handleClose}>
            Login
          </Link>
          <Link to="/register" className="auth-popup-btn register" onClick={handleClose}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthPopup;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPopup.css";

function AuthPopup({ delay = 5000 }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

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

  const goTo = (path) => {
    sessionStorage.setItem("authPopupDismissed", "true");
    setShow(false);
    navigate(path); // programmatic navigation — not dependent on Link's click timing
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
          <button className="auth-popup-btn login" onClick={() => goTo("/login")}>
            Login
          </button>
          <button className="auth-popup-btn register" onClick={() => goTo("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPopup;
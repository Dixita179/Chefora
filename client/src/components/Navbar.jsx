import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const changeNavbar = () => {
      setScroll(window.scrollY >= 50);
    };

    window.addEventListener("scroll", changeNavbar);

    return () => window.removeEventListener("scroll", changeNavbar);
  }, []);

  return (
    <nav className={scroll ? "navbar active" : "navbar"}>
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          {/* Uncomment if you want to use your logo image */}
          {/* <img src={logo} alt="Chefora Logo" /> */}

          <h2>
            Che<span>fora</span>
          </h2>
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/recipes">Recipes</Link>
        </li>

        <li>
          <Link to="/favorites">Favorites</Link>
        </li>

        <li>
          <Link to="/upload">Upload</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>

      {/* Right Side */}
      <div className="nav-right">
        <FaSearch className="search" />

        <Link to="/login" className="login">
          Login
        </Link>

        <Link to="/register" className="register">
          Register
        </Link>

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
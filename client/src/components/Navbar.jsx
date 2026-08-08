import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const changeNavbar = () => {
      setScroll(window.scrollY >= 50);
    };

    window.addEventListener("scroll", changeNavbar);

    return () => window.removeEventListener("scroll", changeNavbar);
  }, []);

  // Close the mobile drawer whenever the route changes (e.g. clicking into a recipe)
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Check login state on mount, and again whenever the route changes
  // (so logging in/out on another page updates the navbar right away)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("user"));
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    closeMenu();
    navigate("/");
  };

  return (
    <nav className={scroll ? "navbar active" : "navbar"}>

      <div className="logo">
        <Link to="/">
          <h2>
            Che<span>fora</span>
          </h2>
        </Link>
      </div>

      {/* Dims the page behind the open drawer; clicking it closes the menu */}
      <div
        className={menuOpen ? "nav-overlay active" : "nav-overlay"}
        onClick={closeMenu}
      />

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li className="drawer-close-row">
          <button
            type="button"
            className="drawer-close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </li>

        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>

        <li>
          <Link to="/recipes" onClick={closeMenu}>Recipes</Link>
        </li>

        <li>
          <Link to="/favorites" onClick={closeMenu}>Favorites</Link>
        </li>

        <li>
          <Link to="/upload" onClick={closeMenu}>Upload</Link>
        </li>

        <li>
          <Link to="/profile" onClick={closeMenu}>Profile</Link>
        </li>

        {/* Auth links live here too so they're reachable on mobile */}
        <li className="mobile-auth">
          {isLoggedIn ? (
            <button type="button" className="logout" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="login" onClick={closeMenu}>
                Login
              </Link>

              <Link to="/register" className="register" onClick={closeMenu}>
                Register
              </Link>
            </>
          )}
        </li>
      </ul>


      <div className="nav-right">
        {isLoggedIn ? (
          <button type="button" className="logout" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="login">
              Login
            </Link>

            <Link to="/register" className="register">
              Register
            </Link>
          </>
        )}

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
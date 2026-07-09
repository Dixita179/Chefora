import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo Section */}

        <div className="footer-logo">

          <h2>
            Che<span>fora</span>
          </h2>

          <p>
            Discover delicious recipes, share your creations, and
            connect with food lovers from around the world.
          </p>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

            <a href="#">
              <FaPinterestP />
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <ul>

            <li><a href="#">Home</a></li>

            <li><a href="#">Recipes</a></li>

            <li><a href="#">Categories</a></li>

            <li><a href="#">Videos</a></li>

            <li><a href="#">Blog</a></li>

          </ul>

        </div>

        {/* Company */}

        <div className="footer-links">

          <h3>Company</h3>

          <ul>

            <li><a href="#">About Us</a></li>

            <li><a href="#">Contact</a></li>

            <li><a href="#">Privacy Policy</a></li>

            <li><a href="#">Terms & Conditions</a></li>

            <li><a href="#">FAQ</a></li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>
            <FaMapMarkerAlt />
            New Delhi, India
          </p>

          <p>
            <FaPhoneAlt />
            +91 98765 43210
          </p>

          <p>
            <FaEnvelope />
            support@chefora.com
          </p>

        </div>

      </div>

      {/* Copyright */}

      <div className="footer-bottom">

        <p>
          © 2026 <span>Chefora</span>. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;
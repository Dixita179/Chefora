import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-page">
      <h1>404</h1>
      <p>Hmm, this page doesn't exist.</p>
      <Link to="/" className="notfound-home-link">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
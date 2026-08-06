import "./Favourites.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaClock } from "react-icons/fa";

const API_BASE = "https://chefora-5n7r.onrender.com";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API_BASE}/api/users/me/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFavorites(res.data);
      } catch (err) {
        console.error("Failed to load favorites:", err);
        setError("Couldn't load your favorites. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites-page">

      <div className="favorites-header">

        <h1>
          <FaHeart /> My Favorites
        </h1>

        <p>
          All your saved recipes in one place.
        </p>

      </div>

      {loading && <p className="favorites-status">Loading your favorites...</p>}

      {error && <p className="favorites-status error">{error}</p>}

      {!loading && !error && favorites.length === 0 && (
        <p className="favorites-status">
          You haven't saved any recipes yet — tap the heart on a recipe to add one here.
        </p>
      )}

      <div className="favorites-grid">

        {favorites.map((recipe) => (

          <div className="favorite-card" key={recipe._id}>

            <img
              src={recipe.image}
              alt={recipe.title}
            />

            <div className="favorite-content">

              <h3>{recipe.title}</h3>

              <p>
                By {recipe.author || "Unknown chef"}
              </p>

              <span>
                <FaClock /> {recipe.time}
              </span>

              <Link
                to={`/recipe/${recipe._id}`}
                className="view-btn"
              >
                View Recipe
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Favorites;
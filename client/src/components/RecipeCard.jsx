import "./RecipeCard.css";
import { Link } from "react-router-dom";
import { FaStar, FaClock, FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "https://chefora-5n7r.onrender.com";

function RecipeCard({ recipes = [] }) {

  const [searchTerm, setSearchTerm] = useState("");
  const [favoritedIds, setFavoritedIds] = useState(new Set());

  // Find out which recipes the logged-in user has already favorited,
  // so hearts show filled correctly on page load.
  useEffect(() => {
    const loadFavoriteStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // not logged in — leave all hearts empty

      try {
        const res = await axios.get(`${API_BASE}/api/users/me/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFavoritedIds(new Set(res.data.map((r) => r._id)));
      } catch (err) {
        console.error("Failed to load favorite status:", err);
      }
    };

    loadFavoriteStatus();
  }, []);

  const toggleFavorite = async (e, recipeId) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to save favorites.");
      return;
    }

    const alreadyFavorited = favoritedIds.has(recipeId);

    // Optimistic UI update — flips instantly, no waiting on the network
    setFavoritedIds((prev) => {
      const next = new Set(prev);
      alreadyFavorited ? next.delete(recipeId) : next.add(recipeId);
      return next;
    });

    try {
      if (alreadyFavorited) {
        await axios.delete(
          `${API_BASE}/api/users/me/favorites/${recipeId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${API_BASE}/api/users/me/favorites/${recipeId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (err) {
      console.error("Failed to update favorite:", err);

      // Revert the optimistic change since the server call failed
      setFavoritedIds((prev) => {
        const next = new Set(prev);
        alreadyFavorited ? next.add(recipeId) : next.delete(recipeId);
        return next;
      });
    }
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="recipes-section">

      <div className="recipe-search-box">
        <FaSearch />

        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <div className="section-heading">

        <span>TRENDING RECIPES</span>

        <h2>Discover Popular Recipes</h2>

        <p>
          Explore delicious recipes loved by thousands of food lovers around
          the world.
        </p>

      </div>


      <div className="recipe-grid">

        {filteredRecipes.length === 0 ? (

          <h3>No Recipes Found 😢</h3>

        ) : (

          filteredRecipes.map((recipe) => {
            const isFavorited = favoritedIds.has(recipe._id);

            return (
              <div className="recipe-card" key={recipe._id}>


                <div className="recipe-image">

                  <img
                    src={
                      recipe.image
                        ? recipe.image.startsWith("http")
                          ? recipe.image
                          : `https://chefora-5n7r.onrender.com${recipe.image}`
                        : "/default-recipe.jpg"
                    }
                    alt={recipe.title}
                  />


                  <div className="recipe-overlay">

                    {recipe.youtubeLink ? (
                      // Has a YouTube link -> open it directly in a new tab
                      <a
                        href={recipe.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="view-btn">
                          View Recipe
                        </button>
                      </a>
                    ) : (
                      // No YouTube link -> go to internal page, which plays the
                      // uploaded video (or shows "No video uploaded" if none)
                      <Link to={`/recipe/${recipe._id}`} state={recipe}>
                        <button className="view-btn">
                          View Recipe
                        </button>
                      </Link>
                    )}

                  </div>


                  <button
                    type="button"
                    className={isFavorited ? "favorite active" : "favorite"}
                    onClick={(e) => toggleFavorite(e, recipe._id)}
                    aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isFavorited ? <FaHeart /> : <FaRegHeart />}
                  </button>


                </div>


                <div className="recipe-content">

                  <h3>{recipe.title}</h3>


                  <div className="recipe-meta">

                    <span>
                      <FaStar /> {recipe.rating || "5.0"}
                    </span>


                    <span>
                      <FaClock /> {recipe.time}
                    </span>


                  </div>

                </div>


              </div>
            );
          })

        )}

      </div>


    </section>
  );
}


export default RecipeCard;
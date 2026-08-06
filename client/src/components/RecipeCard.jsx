import "./RecipeCard.css";
import { Link } from "react-router-dom";
import { FaStar, FaClock, FaHeart, FaSearch } from "react-icons/fa";
import { useState } from "react";

function RecipeCard({ recipes = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <>
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
          filteredRecipes.map((recipe) => (
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
                    <Link
                      to={`/recipe/${recipe._id}`}
                      state={recipe}
                    >
                      <button className="view-btn">
                        View Recipe
                      </button>
                    </Link>
                  )}
                </div>

                <div
                  className={`favorite ${
                    favorites.includes(recipe._id) ? "active" : ""
                  }`}
                  onClick={() => toggleFavorite(recipe._id)}
                >
                  <FaHeart />
                </div>
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
          ))
        )}
      </div>
    </>
  );
}

export default RecipeCard;
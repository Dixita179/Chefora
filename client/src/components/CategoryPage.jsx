import "./CategoryPage.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = "https://chefora-5n7r.onrender.com";

function CategoryPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/recipes`);
        setRecipes(res.data);
      } catch (err) {
        console.error("Failed to load recipes:", err);
        setError("Couldn't load recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <section className="category-page">
      <div className="category-page-header">
        <Link to="/" className="back-link">← Back to Categories</Link>
        <h1>All Recipes</h1>
      </div>

      {loading && <p className="category-status">Loading recipes...</p>}

      {error && <p className="category-status error">{error}</p>}

      {!loading && !error && recipes.length === 0 && (
        <p className="category-status">No recipes yet — check back soon!</p>
      )}

      <div className="category-recipe-grid">
        {recipes.map((recipe) => (
          <div className="category-recipe-card" key={recipe._id}>
            <img
              src={
                recipe.image
                  ? recipe.image.startsWith("http")
                    ? recipe.image
                    : `${API_BASE}${recipe.image}`
                  : "/default-recipe.jpg"
              }
              alt={recipe.title}
            />
            <div className="category-recipe-info">
              <h3>{recipe.title}</h3>
              <Link to={`/recipe/${recipe._id}`}>
                <button>View Recipe</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;
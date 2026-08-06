import "./RecipeCard.css";
import { FaStar, FaClock, FaHeart, FaSearch } from "react-icons/fa";
import { useState } from "react";

function RecipeCard({ recipes = [] }) {

  const [searchTerm, setSearchTerm] = useState("");

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

                  <a
                    href={recipe.youtubeLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!recipe.youtubeLink) {
                        e.preventDefault();
                        alert("No YouTube video linked for this recipe yet.");
                      }
                    }}
                  >

                    <button className="view-btn">
                      View Recipe
                    </button>

                  </a>

                </div>


                <div className="favorite">
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


    </section>
  );
}


export default RecipeCard;

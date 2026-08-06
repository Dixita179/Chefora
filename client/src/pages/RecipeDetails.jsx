import "./RecipeDetails.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import {
  FaClock,
  FaHeart,
  FaPlayCircle,
  FaArrowLeft,
} from "react-icons/fa";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `https://chefora-5n7r.onrender.com/api/recipes/${id}`
        );

        setRecipe(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <div style={{ padding: "120px", textAlign: "center" }}>
        <h2>Loading Recipe...</h2>
      </div>
    );
  }

  return (
    <div className="recipe-details">
      <SearchBar />

      <Link to="/recipes" className="back-btn">
        <FaArrowLeft /> Back to Recipes
      </Link>

      <img
        src={
          recipe.image
            ? `https://chefora-5n7r.onrender.com${recipe.image}`
            : "https://via.placeholder.com/1200x450"
        }
        alt={recipe.title}
        className="recipe-banner"
      />

      <div className="recipe-container">
        <h1>{recipe.title}</h1>

        <p className="chef-name">
          By Chefora Kitchen
        </p>

        <div className="recipe-meta">
          <span>
            <FaClock /> {recipe.time}
          </span>

          <span>
            ⭐ {recipe.rating || "5.0"}
          </span>

          <button className="fav-btn">
            <FaHeart /> Favorite
          </button>
        </div>

        <p className="description">
          {recipe.description ||
            "Welcome to this delicious recipe from Chefora. Follow the recipe below and enjoy cooking!"}
        </p>

        <h2>
          <FaPlayCircle /> Recipe Video
        </h2>

        {recipe.video ? (
          <video
            controls
            width="100%"
            className="recipe-video"
          >
            <source
              src={`https://chefora-5n7r.onrender.com${recipe.video}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>No video uploaded.</p>
        )}

        <h2>Ingredients</h2>

        <p style={{ whiteSpace: "pre-line" }}>
          {recipe.ingredients}
        </p>

        <h2>Instructions</h2>

        <p style={{ whiteSpace: "pre-line" }}>
          {recipe.instructions}
        </p>
      </div>
    </div>
  );
}

export default RecipeDetails;
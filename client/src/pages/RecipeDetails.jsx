import "./RecipeDetails.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaClock,
  FaHeart,
  FaPlayCircle,
  FaArrowLeft,
  FaYoutube,
} from "react-icons/fa";

// Extracts a playable embed URL from common YouTube link formats
function getYoutubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    let videoId = null;

    if (parsed.hostname.includes("youtu.be")) {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes("youtube.com")) {
      videoId = parsed.searchParams.get("v");

      if (!videoId && parsed.pathname.includes("/embed/")) {
        videoId = parsed.pathname.split("/embed/")[1];
      }
      if (!videoId && parsed.pathname.includes("/shorts/")) {
        videoId = parsed.pathname.split("/shorts/")[1];
      }
    }

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `https://chefora-5n7r.onrender.com/api/recipes/${id}`
        );

        setRecipe(res.data);
      } catch (err) {
        console.error(err);

        if (err.response) {
          setError(err.response.data.message || "Recipe not found.");
        } else {
          setError("Unable to connect to the server.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "120px", textAlign: "center" }}>
        <h2>Loading Recipe...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "120px", textAlign: "center" }}>
        <h2>{error}</h2>

        <Link to="/recipes" className="back-btn">
          <FaArrowLeft /> Back to Recipes
        </Link>
      </div>
    );
  }

  const youtubeEmbedUrl = getYoutubeEmbedUrl(recipe.youtubeLink);

  return (
    <div className="recipe-details-page">
      <Link to="/recipes" className="back-btn">
        <FaArrowLeft /> Back to Recipes
      </Link>

      <img
        src={
          recipe.image
            ? recipe.image.startsWith("http")
              ? recipe.image
              : `https://chefora-5n7r.onrender.com${recipe.image}`
            : "https://via.placeholder.com/1200x450"
        }
        alt={recipe.title}
        className="recipe-banner"
      />

      <div className="recipe-container">
        <h1>{recipe.title}</h1>

        <p className="chef-name">
          By {recipe.author || "Chefora Kitchen"}
        </p>

        <div className="recipe-meta">
          <span>
            <FaClock /> {recipe.time}
          </span>

          <span>⭐ {recipe.rating || "5.0"}</span>

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

        {youtubeEmbedUrl ? (
          <>
            <div className="recipe-video-embed-wrapper">
              <iframe
                src={youtubeEmbedUrl}
                title={`${recipe.title} - YouTube video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="recipe-video-embed"
              ></iframe>
            </div>

            <a
              href={recipe.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-external-link"
            >
              <FaYoutube /> Watch on YouTube
            </a>
          </>
        ) : recipe.video ? (
          <video controls width="100%" className="recipe-video">
            <source
              src={
                recipe.video.startsWith("http")
                  ? recipe.video
                  : `https://chefora-5n7r.onrender.com${recipe.video}`
              }
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
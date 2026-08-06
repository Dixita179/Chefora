import "./RecipeDetails.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import {
  FaClock,
  FaFire,
  FaHeart,
  FaRegHeart,
  FaStar,
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

// Splits freeform textarea text into clean list items.
// Prefers one-item-per-line; falls back to comma-splitting
// if the text was entered as a single line.
function splitToItems(text) {
  if (!text) return [];

  const byLine = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (byLine.length > 1) return byLine;

  if (byLine.length === 1 && byLine[0].includes(",")) {
    return byLine[0]
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return byLine;
}

function resolveMediaUrl(path) {
  if (!path) return "";
  return path.startsWith("http")
    ? path
    : `https://chefora-5n7r.onrender.com${path}`;
}

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

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

  const toggleChecked = (idx) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (loading) {
    return (
      <div className="recipe-status-page">
        <p className="recipe-status-eyebrow">Chefora</p>
        <h2>Setting the table...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipe-status-page">
        <p className="recipe-status-eyebrow">Chefora</p>
        <h2>{error}</h2>
        <Link to="/recipes" className="status-back-btn">
          <FaArrowLeft /> Back to Recipes
        </Link>
      </div>
    );
  }

  const youtubeEmbedUrl = getYoutubeEmbedUrl(recipe.youtubeLink);
  const ingredients = splitToItems(recipe.ingredients);
  const steps = splitToItems(recipe.instructions);

  return (
    <div className="recipe-details-page">
      {/* HERO */}
      <div className="rd-hero">
        <img
          src={
            recipe.image
              ? resolveMediaUrl(recipe.image)
              : "https://via.placeholder.com/1600x900"
          }
          alt={recipe.title}
          className="rd-hero-img"
        />

        <div className="rd-hero-overlay" />

        <Link to="/recipes" className="rd-pill rd-back-pill">
          <FaArrowLeft /> Recipes
        </Link>

        <button
          className="rd-pill rd-fav-pill"
          onClick={() => setFavorited((f) => !f)}
          aria-label="Toggle favorite"
        >
          {favorited ? <FaHeart /> : <FaRegHeart />}
        </button>

        <div className="rd-hero-content">
          {recipe.category && (
            <span className="rd-tag">{recipe.category}</span>
          )}

          <h1>{recipe.title}</h1>

          <div className="rd-meta-row">
            <span>By {recipe.author || "Chefora Kitchen"}</span>

            <span>
              <FaStar /> {recipe.rating || "5.0"}
            </span>

            <span>
              <FaClock /> {recipe.time}
            </span>

            {recipe.difficulty && (
              <span>
                <FaFire /> {recipe.difficulty}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="rd-description">
        {recipe.description ||
          "A Chefora community favorite — straightforward to make, and even better shared."}
      </p>

      {/* BODY: ingredient card + method */}
      <div className="rd-body">
        <aside className="rd-ingredients-card">
          <div className="rd-pin" />

          <span className="rd-eyebrow">Ingredients</span>

          {ingredients.length === 0 ? (
            <p className="rd-empty">No ingredients listed.</p>
          ) : (
            <ul className="rd-ingredient-list">
              {ingredients.map((item, idx) => (
                <li
                  key={idx}
                  className={checkedItems[idx] ? "checked" : ""}
                  onClick={() => toggleChecked(idx)}
                >
                  <span className="rd-checkbox">
                    {checkedItems[idx] && <span className="rd-check" />}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </aside>

        <div className="rd-method">
          <span className="rd-eyebrow">Method</span>

          {steps.length === 0 ? (
            <p className="rd-empty">No instructions listed.</p>
          ) : (
            <ol className="rd-step-list">
              {steps.map((step, idx) => (
                <li key={idx}>
                  <span className="rd-step-num">{idx + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          )}

          {(youtubeEmbedUrl || recipe.video) && (
            <div className="rd-video-section">
              <span className="rd-eyebrow">
                <FaPlayCircle /> Watch it made
              </span>

              {youtubeEmbedUrl ? (
                <>
                  <div className="rd-video-embed-wrapper">
                    <iframe
                      src={youtubeEmbedUrl}
                      title={`${recipe.title} - YouTube video`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rd-video-embed"
                    ></iframe>
                  </div>

                  <a
                    href={recipe.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rd-youtube-link"
                  >
                    <FaYoutube /> Watch on YouTube
                  </a>
                </>
              ) : (
                <video
                  controls
                  className="rd-video-native"
                  poster={recipe.image ? resolveMediaUrl(recipe.image) : undefined}
                >
                  <source
                    src={resolveMediaUrl(recipe.video)}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RecipeDetails;
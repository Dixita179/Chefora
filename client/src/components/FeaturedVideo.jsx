import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlayCircle } from "react-icons/fa";
import "./FeaturedVideo.css";

function FeaturedVideo() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          "https://chefora-5n7r.onrender.com/api/recipes"
        );

        // pick the first recipe that actually has a video
        const withVideo = res.data.find((r) => r.video);

        setRecipe(withVideo || null);
      } catch (err) {
        console.error("Failed to load featured video:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) return null; // don't show anything while loading
  if (!recipe) return null; // no recipe with a video yet, section just won't render

  return (
    <section id="recipes-section" className="featured-video-section">
      <div className="section-heading">
        <span>FEATURED VIDEO</span>
        <h2>
          <FaPlayCircle /> Watch: {recipe.title}
        </h2>
      </div>

      <div className="featured-video-wrapper">
        <video
          controls
          className="featured-video-player"
          poster={
            recipe.image
              ? `https://chefora-5n7r.onrender.com${recipe.image}`
              : undefined
          }
        >
          <source
            src={`https://chefora-5n7r.onrender.com${recipe.video}`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <Link to={`/recipe/${recipe._id}`} className="view-full-recipe-link">
          View Full Recipe →
        </Link>
      </div>
    </section>
  );
}

export default FeaturedVideo;

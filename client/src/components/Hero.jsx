import "./Hero.css";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPlay, FaStar } from "react-icons/fa";
import hero from "../assets/images/hero.jpg";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="hero">

      <div className="hero-container">

        <div className="hero-left">

          <span className="hero-tag">
            🍴 Welcome to Chefora
          </span>

          <h1>
            Cook.
            <br />
            Share.
            <br />
            Discover.
          </h1>

          <p>
            Explore thousands of delicious recipes from passionate home cooks
            and professional chefs. Save your favorites, watch cooking videos,
            and discover new flavors every day.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/recipes")}
            >
              Explore Recipes
              <FaArrowRight />
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                document
                  .getElementById("recipes-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <FaPlay />
              Watch Video
            </button>

          </div>

        </div>

        <div className="hero-right">

          <img src={hero} alt="Food" />

        </div>

      </div>

    </section>
  );
}

export default Hero;
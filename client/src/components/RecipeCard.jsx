import "./RecipeCard.css";

import recipe1 from "../assets/images/recipe1.jpg";
import recipe3 from "../assets/images/recipe3.jpg";
import cake1 from "../assets/images/cake1.jpg";

import { FaStar, FaClock, FaHeart } from "react-icons/fa";

const recipes = [
  {
    title: "Mix Salad",
    image: recipe1,
    rating: "4.8",
    time: "25 mins",
  },
  {
    title: "Chicken Biryani",
    image: recipe3,
    rating: "4.9",
    time: "45 mins",
  },
  {
    title: "Chocolate Cake",
    image: cake2,
    rating: "5.0",
    time: "60 mins",
  },
];

function RecipeCard() {
  return (
    <section className="recipes">

      <div className="recipes-container">

        <div className="section-heading">

          <span>TRENDING RECIPES</span>

          <h2>Discover Popular Recipes</h2>

          <p>
            Explore delicious recipes loved by thousands of food lovers around the world.
          </p>

        </div>

        <div className="recipe-grid">

          {recipes.map((recipe) => (

            <div className="recipe-card" key={recipe.title}>

              <div className="recipe-image">

                <img src={recipe.image} alt={recipe.title} />

                <div className="recipe-overlay">

                  <button>View Recipe</button>

                </div>

                <div className="favorite">

                  <FaHeart />

                </div>

              </div>

              <div className="recipe-content">

                <h3>{recipe.title}</h3>

                <div className="recipe-meta">

                  <span>
                    <FaStar /> {recipe.rating}
                  </span>

                  <span>
                    <FaClock /> {recipe.time}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default RecipeCard;
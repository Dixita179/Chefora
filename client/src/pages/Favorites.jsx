import "./Favourites.css";
import { Link } from "react-router-dom";
import { FaHeart, FaClock } from "react-icons/fa";

function Favorites() {

  const favorites = [
   
  {
    id: 1,
    title: "Creamy Garlic Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    chef: "Dikshita Nath",
    time: "25 mins"
  },
  {
    id: 2,
    title: "Butter Chicken",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800",
    chef: "Rahul Sharma",
    time: "45 mins"
  },
  {
    id: 3,
    title: "Veg Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    chef: "Priya Das",
    time: "30 mins"
  },
  {
    id: 4,
    title: "Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    chef: "Emily Brown",
    time: "50 mins"
  },
  {
    id: 5,
    title: "Fresh Garden Salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
    chef: "Sarah Wilson",
    time: "15 mins"
  },
  {
    id: 6,
    title: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800",
    chef: "Amit Kumar",
    time: "60 mins"
  },
  {
    id: 7,
    title: "Classic Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
    chef: "John Smith",
    time: "20 mins"
  },
  {
    id: 8,
    title: "Blueberry Pancakes",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    chef: "Sophia Lee",
    time: "20 mins"
  },
  {
    id: 9,
    title: "Sushi Platter",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
    chef: "Kenji Tanaka",
    time: "40 mins"
  }

  ];

  return (
    <div className="favorites-page">

      <div className="favorites-header">

        <h1>
          <FaHeart /> My Favorites
        </h1>

        <p>
          All your saved recipes in one place.
        </p>

      </div>

      <div className="favorites-grid">

        {favorites.map((recipe) => (

          <div className="favorite-card" key={recipe.id}>

            <img
              src={recipe.image}
              alt={recipe.title}
            />

            <div className="favorite-content">

              <h3>{recipe.title}</h3>

              <p>
                By {recipe.chef}
              </p>

              <span>
                <FaClock /> {recipe.time}
              </span>

              <Link
                to={`/recipe/${recipe.id}`}
                className="view-btn"
              >
                View Recipe
              </Link>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Favorites;
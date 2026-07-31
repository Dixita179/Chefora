import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";

const recipes = [
  {
    _id: "1",
    title: "Chicken Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800",
    rating: "4.9",
    time: "45 mins",
    video: "https://www.youtube.com/embed/95BCU1n268w",
    ingredients: "Rice, Chicken, Yogurt, Spices",
    instructions: "Cook rice, marinate chicken, layer and dum cook."
  },
  {
    _id: "2",
    title: "White Sauce Pasta",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    rating: "4.8",
    time: "25 mins",
    video: "https://www.youtube.com/embed/qH__o17xHls",
    ingredients: "Pasta, Butter, Milk, Cheese",
    instructions: "Prepare white sauce and mix with cooked pasta."
  },
  {
    _id: "3",
    title: "Chocolate Cake",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    rating: "5.0",
    time: "60 mins",
    video: "https://www.youtube.com/embed/FHYFYvN8P6Q",
    ingredients: "Flour, Cocoa, Sugar, Eggs",
    instructions: "Mix ingredients, bake and decorate."
  },
  {
    _id: "4",
    title: "Veg Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    rating: "4.7",
    time: "35 mins",
    video: "https://www.youtube.com/embed/sv3TXMSv6Lw",
    ingredients: "Pizza Base, Cheese, Veggies",
    instructions: "Add toppings and bake."
  },
  {
    _id: "5",
    title: "Pancakes",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    rating: "4.9",
    time: "20 mins",
    video: "https://www.youtube.com/embed/NCMKedZvnyI",
    ingredients: "Flour, Eggs, Milk",
    instructions: "Mix batter and cook on pan."
  },
  {
    _id: "6",
    title: "Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
    rating: "4.6",
    time: "15 mins",
    video: "https://www.youtube.com/embed/QXvQm14N4gM",
    ingredients: "Lettuce, Croutons, Parmesan",
    instructions: "Mix all ingredients together."
  }
];

function Recipes() {
  return (
    <>
      <Navbar />

      <section
        style={{
          padding: "120px 20px 60px",
          minHeight: "80vh",
          background: "#fff5f5",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <h1
              style={{
                color: "#B11226",
                fontSize: "40px",
              }}
            >
              🍴 All Recipes
            </h1>

            <p>
              Explore delicious recipes shared by the Chefora community.
            </p>
          </div>

          <RecipeCard recipes={recipes} />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Recipes;
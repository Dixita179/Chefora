import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import Footer from "../components/Footer";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          "https://chefora-5n7r.onrender.com/api/recipes"
        );

        setRecipes(res.data);
      } catch (err) {
        console.error(err);
        setError("Unable to load recipes right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

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

          {loading ? (
            <p style={{ textAlign: "center" }}>Loading recipes...</p>
          ) : error ? (
            <p style={{ textAlign: "center", color: "red" }}>{error}</p>
          ) : (
            <RecipeCard recipes={recipes} />
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Recipes;

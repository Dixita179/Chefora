import { useState, useEffect } from "react";
import axios from "axios";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import RecipeCard from "../components/RecipeCard";
import WhyUs from "../components/WhyUs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import AuthPopup from "../components/AuthPopup";
import FeaturedVideo from "./FeaturedVideo"; // adjust path

   function Home() {
     return (
       <>
         <Hero />
         <FeaturedVideo />
         {/* rest of your page, like RecipeCard list */}
       </>
     );
   }
function Home() {

  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all recipes from MongoDB
  useEffect(() => {

    const fetchRecipes = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/recipes"
        );

        setRecipes(res.data);

      }

      catch(error){

        console.log(error);

      }

    };

    fetchRecipes();

  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <>
      <AuthPopup delay={5000} />

      <Hero />

      <SearchBar
        value={searchTerm}
        onSearch={setSearchTerm}
      />

      <CategoryCard />

      
      <WhyUs />

      <Newsletter />

      <Footer />

    </>

  );

}

export default Home;
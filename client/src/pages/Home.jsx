import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import RecipeCard from "../components/RecipeCard";
import WhyUs from "../components/WhyUs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <SearchBar />

      <CategoryCard />

      <RecipeCard />

      <WhyUs />

      <Newsletter />

      <Footer />
    </>
  );
}

export default Home;
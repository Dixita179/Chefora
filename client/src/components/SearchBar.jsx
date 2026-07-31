import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ recipes = [] }) {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = term.trim().toLowerCase();
    if (!query) return;

    // Try exact title match first
    let match = recipes.find(
      (r) => r.title?.toLowerCase() === query
    );

    // Fallback: first title that contains the search term
    if (!match) {
      match = recipes.find((r) =>
        r.title?.toLowerCase().includes(query)
      );
    }

    if (match) {
      navigate(`/recipe/${match._id}`);
    } else {
      // No match found — send to recipes list instead of a dead route
      navigate(`/recipes?search=${encodeURIComponent(term.trim())}`);
    }
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-content">
          <h2>Find Your Next Favorite Recipe</h2>

          <p>
            Search from thousands of delicious recipes by name, ingredient,
            cuisine, or meal type.
          </p>

          <form className="search-box" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search recipes, ingredients, cuisines..."
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />

            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <section className="search-section">

      <div className="search-container">

        <div className="search-content">

          <h2>Find Your Next Favorite Recipe</h2>

          <p>
            Search from thousands of delicious recipes by name, ingredient,
            cuisine, or meal type.
          </p>

          <div className="search-box">

            <input
              type="text"
              placeholder="Search recipes, ingredients, cuisines..."
            />

            <button>
              <FaSearch />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default SearchBar;
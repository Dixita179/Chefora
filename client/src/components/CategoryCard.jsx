import "./CategoryCard.css";
import { Link } from "react-router-dom";

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snacks",
  "Drinks",
];

function CategoryCard() {
  return (
    <section className="categories">

      <div className="categories-container">

        <h2 className="categories-title">
          Categories
        </h2>

        <div className="categories-grid">

          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="category-box"
            >
              <h3>{category}</h3>
            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}

export default CategoryCard;
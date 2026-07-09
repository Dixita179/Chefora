import "./CategoryCard.css";

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
            <div
              key={category}
              className="category-box"
            >
              <h3>{category}</h3>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default CategoryCard;
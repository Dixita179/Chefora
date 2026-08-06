import "./UploadRecipe.css";
import { useState } from "react";
import axios from "axios";
import {
  FaStar,
  FaClock,
  FaFire,
  FaUtensils,
  FaImage,
  FaVideo,
  FaCheckCircle,
} from "react-icons/fa";

function UploadRecipe() {
  const [recipe, setRecipe] = useState({
    title: "",
    category: "",
    time: "",
    difficulty: "",
    ingredients: "",
    instructions: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // Live counts for the preview card
  const ingredientCount = recipe.ingredients
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean).length;

  const stepCount = recipe.instructions
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean).length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();

      const storedUser = localStorage.getItem("user");
      const loggedInUser = storedUser ? JSON.parse(storedUser) : null;

      formData.append("author", loggedInUser?.username || "Guest User");
      formData.append("source", "user");
      formData.append("title", recipe.title);
      formData.append("category", recipe.category);
      formData.append("time", recipe.time);
      formData.append("difficulty", recipe.difficulty);
      formData.append("ingredients", recipe.ingredients);
      formData.append("instructions", recipe.instructions);

      if (imageFile) formData.append("image", imageFile);
      if (videoFile) formData.append("video", videoFile);

      const res = await axios.post(
        "https://chefora-5n7r.onrender.com/api/recipes/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(res.data.message);

      setRecipe({
        title: "",
        category: "",
        time: "",
        difficulty: "",
        ingredients: "",
        instructions: "",
      });
      setImageFile(null);
      setVideoFile(null);
      setImagePreview("");
      setVideoPreview("");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Upload Failed!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="up-page">
      <div className="up-shell">
        {/* FORM */}
        <div className="up-form-col">
          <p className="up-eyebrow">Chefora</p>
          <h1>Share Your Recipe</h1>
          <p className="up-subhead">
            Fill in the details below — your recipe card will come together
            underneath as you go.
          </p>

          <form onSubmit={handleSubmit}>
            <section className="up-section">
              <span className="up-section-label">The Basics</span>

              <div className="up-field">
                <label>Recipe Title</label>
                <input
                  type="text"
                  name="title"
                  value={recipe.title}
                  onChange={handleChange}
                  placeholder="e.g. Grandma's Sunday Roast"
                  required
                />
              </div>

              <div className="up-row">
                <div className="up-field">
                  <label>Category</label>
                  <select
                    name="category"
                    value={recipe.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snacks</option>
                    <option>Dessert</option>
                    <option>Drinks</option>
                  </select>
                </div>

                <div className="up-field">
                  <label>Cooking Time</label>
                  <input
                    type="text"
                    name="time"
                    value={recipe.time}
                    onChange={handleChange}
                    placeholder="30 mins"
                    required
                  />
                </div>
              </div>

              <div className="up-field">
                <label>Difficulty</label>
                <div className="up-difficulty-group">
                  {["Easy", "Medium", "Hard"].map((level) => (
                    <button
                      type="button"
                      key={level}
                      className={
                        recipe.difficulty === level
                          ? "up-diff-btn active"
                          : "up-diff-btn"
                      }
                      onClick={() => setRecipe({ ...recipe, difficulty: level })}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="up-section">
              <span className="up-section-label">What You'll Need</span>

              <div className="up-field">
                <label>Ingredients (one per line)</label>
                <textarea
                  rows="5"
                  name="ingredients"
                  value={recipe.ingredients}
                  onChange={handleChange}
                  placeholder={"2 cups flour\n1 tsp salt\n3 eggs"}
                  required
                />
              </div>
            </section>

            <section className="up-section">
              <span className="up-section-label">How It's Made</span>

              <div className="up-field">
                <label>Instructions (one step per line)</label>
                <textarea
                  rows="6"
                  name="instructions"
                  value={recipe.instructions}
                  onChange={handleChange}
                  placeholder={"Preheat oven to 180°C\nMix dry ingredients\nBake for 30 minutes"}
                  required
                />
              </div>
            </section>

            <section className="up-section">
              <span className="up-section-label">Show It Off</span>

              <div className="up-row">
                <div className="up-field">
                  <label>
                    <FaImage /> Recipe Photo
                  </label>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <div className="up-field">
                  <label>
                    <FaVideo /> Recipe Video 
                  </label>
                  <input type="file" accept="video/*" onChange={handleVideoChange} />
                </div>
              </div>

              {videoPreview && (
                <video controls className="up-video-preview">
                  <source src={videoPreview} />
                </video>
              )}
            </section>

            <button type="submit" className="up-submit-btn" disabled={submitting}>
              {submitting ? "Publishing..." : "Publish Recipe"}
            </button>
          </form>
        </div>

        {/* LIVE PREVIEW CARD */}
        <aside className="up-preview-col">
          <span className="up-eyebrow">Live Preview</span>

          <div className="up-card up-card-animate">
            <div className="up-card-image">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="up-card-image-fade" />
              ) : (
                <div className="up-card-image-placeholder">
                  <FaImage />
                  <span>Add a photo</span>
                </div>
              )}

              {recipe.category && (
                <span className="up-card-tag">{recipe.category}</span>
              )}
            </div>

            <div className="up-card-body">
              <h3>{recipe.title || "Your recipe title"}</h3>

              <div className="up-card-meta">
                <span>
                  <FaStar /> 5.0
                </span>

                {recipe.time && (
                  <span>
                    <FaClock /> {recipe.time}
                  </span>
                )}

                {recipe.difficulty && (
                  <span>
                    <FaFire /> {recipe.difficulty}
                  </span>
                )}
              </div>

              <div className="up-card-counts">
                <span>
                  <FaCheckCircle />
                  {ingredientCount} ingredient{ingredientCount === 1 ? "" : "s"}
                </span>

                <span>
                  <FaUtensils />
                  {stepCount} step{stepCount === 1 ? "" : "s"}
                </span>
              </div>

              {videoFile && (
                <div className="up-card-video-tag">
                  <FaVideo /> Video attached
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default UploadRecipe;
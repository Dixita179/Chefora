import "./UploadRecipe.css";
import { useState } from "react";
import axios from "axios";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("author", "Dikshita");
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
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1>🍳 Upload Your Recipe</h1>

        <p>Share your delicious recipes with the Chefora community.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>🍝 Recipe Title</label>

            <input
              type="text"
              name="title"
              value={recipe.title}
              onChange={handleChange}
              placeholder="Enter recipe title"
              required
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>🥗 Category</label>

              <select
                name="category"
                value={recipe.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snacks</option>
                <option>Dessert</option>
                <option>Drinks</option>
              </select>
            </div>

            <div className="form-group">
              <label>⏱ Cooking Time</label>

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

          <div className="form-group">
            <label>🔥 Difficulty</label>

            <select
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleChange}
              required
            >
              <option value="">Choose Difficulty</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="form-group">
            <label>🥕 Ingredients</label>

            <textarea
              rows="5"
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              placeholder="Enter ingredients..."
              required
            />
          </div>

          <div className="form-group">
            <label>👩‍🍳 Instructions</label>

            <textarea
              rows="6"
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              placeholder="Write cooking instructions..."
              required
            />
          </div>

          <div className="row">
            <div className="form-group">
              <label>📷 Recipe Image</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    marginTop: "15px",
                    width: "100%",
                    borderRadius: "15px",
                  }}
                />
              )}
            </div>

            <div className="form-group">
              <label>🎥 Recipe Video</label>

              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
              />

              {videoPreview && (
                <video
                  controls
                  width="100%"
                  style={{
                    marginTop: "15px",
                    borderRadius: "15px",
                  }}
                >
                  <source src={videoPreview} />
                </video>
              )}
            </div>
          </div>

          <button type="submit" className="upload-btn">
            🚀 Upload Recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadRecipe;
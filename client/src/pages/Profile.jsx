import "./Profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaUtensils, FaHeart, FaVideo, FaEdit, FaTimes, FaCamera } from "react-icons/fa";

const API_BASE = "https://chefora-5n7r.onrender.com";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [picFile, setPicFile] = useState(null); // actual File object, for backend upload later

  // Fetch the CURRENT logged-in user's profile + their own recipes on mount
  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setLoadError(null);

      try {
        const token = localStorage.getItem("token"); // adjust key if your auth stores it differently

        const profileRes = await axios.get(`${API_BASE}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(profileRes.data);

        // If you have a dedicated "my recipes" endpoint, use that instead:
        // const recipesRes = await axios.get(`${API_BASE}/api/recipes/mine`, { headers: {...} });
        // For now, fetching all recipes and filtering by the logged-in user's id:
        const recipesRes = await axios.get(`${API_BASE}/api/recipes`);
        const mine = recipesRes.data.filter(
          (r) => r.userId === profileRes.data._id || r.author === profileRes.data._id
        );
        setRecipes(mine);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setLoadError("Couldn't load your profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // runs once when the component mounts (i.e. whenever someone lands on their profile)

  const openEdit = () => {
    setFormData(profile);
    setPicFile(null);
    setIsEditing(true);
  };

  const closeEdit = () => setIsEditing(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPicFile(file);

    // Show an instant local preview
    const previewUrl = URL.createObjectURL(file);
    setFormData({ ...formData, pic: previewUrl });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("bio", formData.bio);
      if (picFile) data.append("profilePic", picFile);

      const res = await axios.put(`${API_BASE}/api/users/me`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data); // update with what the SERVER actually saved, not just local state
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  if (loading) return <div className="profile-page">Loading profile...</div>;
  if (loadError) return <div className="profile-page">{loadError}</div>;
  if (!profile) return <div className="profile-page">No profile found.</div>;

  return (
    <div className="profile-page">

      <div className="profile-header">

        <img
          src={profile.pic}
          alt="Profile"
          className="profile-pic"
        />

        <h1>{profile.name}</h1>

        <p className="bio">
          {profile.bio}
        </p>

        <button className="edit-btn" onClick={openEdit}>
          <FaEdit /> Edit Profile
        </button>

      </div>

      <div className="stats">

        <div className="stat-card">
          <FaUtensils />
          <h2>{recipes.length}</h2>
          <p>Recipes</p>
        </div>

        <div className="stat-card">
          <FaHeart />
          <h2>{profile.favoritesCount ?? 0}</h2>
          <p>Favorites</p>
        </div>

        <div className="stat-card">
          <FaVideo />
          <h2>{profile.videosCount ?? 0}</h2>
          <p>Videos</p>
        </div>

      </div>

      <div className="recipe-section">

        <h2>My Recipes</h2>

        <div className="recipe-grid">

          {recipes.length === 0 && <p>No recipes uploaded yet.</p>}

          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe._id || recipe.id}>

              <img
                src={recipe.image}
                alt={recipe.title}
              />

              <div className="recipe-info">
                <h3>{recipe.title}</h3>

                <button>
                  View Recipe
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>

      {isEditing && (
        <div className="edit-modal-overlay" onClick={closeEdit}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>

            <button className="edit-modal-close" onClick={closeEdit}>
              <FaTimes />
            </button>

            <h2>Edit Profile</h2>

            <form onSubmit={handleSave}>

              <div className="pic-upload-wrapper">
                <img
                  src={formData.pic}
                  alt="Profile preview"
                  className="pic-preview"
                />

                <label htmlFor="picUpload" className="pic-upload-label">
                  <FaCamera />
                </label>

                <input
                  id="picUpload"
                  type="file"
                  accept="image/*"
                  onChange={handlePicChange}
                  hidden
                />
              </div>

              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <label>Bio</label>
              <textarea
                name="bio"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
              />

              <div className="edit-modal-actions">
                <button type="button" className="cancel-btn" onClick={closeEdit}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;
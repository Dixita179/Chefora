import "./Profile.css";
import { useState } from "react";
import { FaUtensils, FaHeart, FaVideo, FaEdit, FaTimes, FaCamera } from "react-icons/fa";

function Profile() {
  const recipes = [
    {
      id: 1,
      title: "Creamy Garlic Pasta",
      image:
        "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600",
    },
    {
      id: 2,
      title: "Butter Chicken",
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600",
    },
    {
      id: 3,
      title: "Chocolate Cake",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
    },
  ];

  const [profile, setProfile] = useState({
    name: "Dikshita Nath",
    bio: "🍳 Passionate home chef • Food Blogger • Love experimenting with new recipes ❤️",
    pic: "https://i.pravatar.cc/250?img=47",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [picFile, setPicFile] = useState(null); // actual File object, for backend upload later

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

    // TODO: replace with your real backend call. Example with file upload:
    //
    // const data = new FormData();
    // data.append("name", formData.name);
    // data.append("bio", formData.bio);
    // if (picFile) data.append("profilePic", picFile);
    //
    // const res = await axios.put("http://localhost:5000/api/users/me", data, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    // setProfile(res.data);

    setProfile(formData);
    setIsEditing(false);
  };

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
          <h2>25</h2>
          <p>Recipes</p>
        </div>

        <div className="stat-card">
          <FaHeart />
          <h2>182</h2>
          <p>Favorites</p>
        </div>

        <div className="stat-card">
          <FaVideo />
          <h2>14</h2>
          <p>Videos</p>
        </div>

      </div>

      <div className="recipe-section">

        <h2>My Recipes</h2>

        <div className="recipe-grid">

          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>

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
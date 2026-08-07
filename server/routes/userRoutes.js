const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const upload = require("../middleware/upload"); // your existing Cloudinary/multer config

const router = express.Router();

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "chefora_secret"
    );

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Get logged in user
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      name: user.username,
      bio: user.bio || "Food Lover 🍴",
      pic:
        user.profileImage ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      favoritesCount: user.favorites?.length || 0,
      videosCount: 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update profile — now handles an optional uploaded picture via multer/Cloudinary
router.put("/me", auth, upload.single("profilePic"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = req.body.name || user.username;
    user.bio = req.body.bio || user.bio;

    // multer-storage-cloudinary puts the uploaded file's URL on req.file.path
    if (req.file) {
      user.profileImage = req.file.path;
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.username,
      bio: user.bio,
      pic:
        user.profileImage ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      favoritesCount: user.favorites?.length || 0,
      videosCount: 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get the logged-in user's favorited recipes (populated with full recipe data)
router.get("/me/favorites", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a recipe to favorites
router.post("/me/favorites/:recipeId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyFavorited = user.favorites.some(
      (id) => id.toString() === req.params.recipeId
    );

    if (!alreadyFavorited) {
      user.favorites.push(req.params.recipeId);
      await user.save();
    }

    res.json({ message: "Added to favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove a recipe from favorites
router.delete("/me/favorites/:recipeId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== req.params.recipeId
    );

    await user.save();

    res.json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
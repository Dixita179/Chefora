const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

    res.json({
      _id: user._id,
      name: user.username,
      bio: user.bio || "Food Lover 🍴",
      pic:
        user.pic ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      favoritesCount: 0,
      videosCount: 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update profile
router.put("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.username = req.body.name || user.username;
    user.bio = req.body.bio || user.bio;

    await user.save();

    res.json({
      _id: user._id,
      name: user.username,
      bio: user.bio,
      pic:
        user.pic ||
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      favoritesCount: 0,
      videosCount: 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
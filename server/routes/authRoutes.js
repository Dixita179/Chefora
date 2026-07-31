const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ======================
// Register User
// ======================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
    });

    // Password will be hashed by the User model pre-save hook
    await user.save();

    res.status(201).json({
      message: "Registration Successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ======================
// Login User
// ======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET || "chefora_secret",
      {
        expiresIn: "7d",
      }
    );

    // Send response
    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Export router
module.exports = router;
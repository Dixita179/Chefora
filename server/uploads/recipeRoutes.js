const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const Recipe = require("../models/Recipe");

// Upload Recipe
router.post(
  "/upload",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const recipe = new Recipe({
        title: req.body.title,
        category: req.body.category,
        time: req.body.time,
        difficulty: req.body.difficulty,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        youtubeLink: req.body.youtubeLink || "",

        image: req.files.image
          ? "/uploads/images/" + req.files.image[0].filename
          : "",

        video: req.files.video
          ? "/uploads/videos/" + req.files.video[0].filename
          : ""
      });

      await recipe.save();

      res.status(201).json({
        message: "Recipe Uploaded Successfully",
        recipe
      });

    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    res.json(recipes);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Search recipes
router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q;

    const recipes = await Recipe.find({
      title: {
        $regex: keyword,
        $options: "i"
      }
    });

    res.json(recipes);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Update recipe (e.g. add/change youtubeLink)
router.patch("/:id", async (req, res) => {
  try {
    const allowedFields = [
      "title",
      "category",
      "time",
      "difficulty",
      "ingredients",
      "instructions",
      "youtubeLink",
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe updated", recipe });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(500).json({ error: err.message });
  }
});

// Get recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found"
      });
    }

    res.json(recipe);

  } catch (err) {
    // Handle invalid ObjectId format gracefully instead of a raw 500
    if (err.name === "CastError") {
      return res.status(404).json({
        message: "Recipe not found"
      });
    }

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;

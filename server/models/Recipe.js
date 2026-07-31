const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    ingredients: {
      type: String,
      required: true,
    },

    instructions: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    video: {
      type: String,
      required: true,
    },

    // Who uploaded the recipe
    author: {
      type: String,
      default: "Guest User",
    },

    // Demo recipe or user-uploaded recipe
    source: {
      type: String,
      enum: ["demo", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);
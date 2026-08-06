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

    // Self-hosted uploaded video (optional now — recipe may use youtubeLink instead)
    video: {
      type: String,
      required: false,
    },

    // Optional YouTube link for the recipe video
    youtubeLink: {
      type: String,
      required: false,
      trim: true,
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

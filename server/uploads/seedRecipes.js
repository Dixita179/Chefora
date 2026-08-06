// seedDemoRecipes.js
//
// Run this once from your backend project folder to insert demo recipes
// that have YouTube links pre-filled (for showcasing the feature).
//
// Usage:
//   node seedDemoRecipes.js
//
// Requires your .env file (with MONGO_URI) to be in the same folder,
// and mongoose + dotenv already installed (they already are, since
// your server.js uses them).

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Recipe = require("./models/Recipe");

dotenv.config();

const demoRecipes = [
  {
    title: "Chicken Biryani",
    category: "Dinner",
    time: "45 mins",
    difficulty: "Medium",
    ingredients: "Rice, Chicken, Yogurt, Spices, Onions, Ghee",
    instructions:
      "Marinate chicken in yogurt and spices. Cook rice separately. Layer rice and chicken, then dum cook on low heat for 20 minutes.",
    image:
      "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800",
    youtubeLink: "https://www.youtube.com/watch?v=95BCU1n268w",
    author: "Chefora Kitchen",
    source: "demo",
  },
  {
    title: "White Sauce Pasta",
    category: "Lunch",
    time: "25 mins",
    difficulty: "Easy",
    ingredients: "Pasta, Butter, Milk, Cheese, Garlic",
    instructions:
      "Boil pasta until al dente. Prepare white sauce with butter, flour, and milk. Mix in cheese and combine with pasta.",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
    youtubeLink: "https://www.youtube.com/watch?v=qH__o17xHls",
    author: "Chefora Kitchen",
    source: "demo",
  },
  {
    title: "Chocolate Cake",
    category: "Dessert",
    time: "60 mins",
    difficulty: "Medium",
    ingredients: "Flour, Cocoa, Sugar, Eggs, Butter, Baking Powder",
    instructions:
      "Mix dry and wet ingredients separately, then combine. Pour into a greased pan and bake at 180°C for 35 minutes. Cool and decorate.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
    youtubeLink: "https://www.youtube.com/watch?v=FHYFYvN8P6Q",
    author: "Chefora Kitchen",
    source: "demo",
  },
  {
    title: "Veg Pizza",
    category: "Snacks",
    time: "35 mins",
    difficulty: "Medium",
    ingredients: "Pizza Base, Cheese, Bell Peppers, Onion, Tomato Sauce",
    instructions:
      "Spread sauce on the base, add toppings and cheese, then bake at 220°C for 12-15 minutes until golden.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
    youtubeLink: "https://www.youtube.com/watch?v=sv3TXMSv6Lw",
    author: "Chefora Kitchen",
    source: "demo",
  },
  {
    title: "Pancakes",
    category: "Breakfast",
    time: "20 mins",
    difficulty: "Easy",
    ingredients: "Flour, Eggs, Milk, Sugar, Baking Powder",
    instructions:
      "Whisk all ingredients into a smooth batter. Cook on a greased pan until bubbles form, then flip and cook the other side.",
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800",
    youtubeLink: "https://www.youtube.com/watch?v=NCMKedZvnyI",
    author: "Chefora Kitchen",
    source: "demo",
  },
  {
    title: "Caesar Salad",
    category: "Lunch",
    time: "15 mins",
    difficulty: "Easy",
    ingredients: "Lettuce, Croutons, Parmesan, Caesar Dressing",
    instructions:
      "Chop lettuce, toss with dressing, croutons, and shaved parmesan.",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800",
    youtubeLink: "https://www.youtube.com/watch?v=QXvQm14N4gM",
    author: "Chefora Kitchen",
    source: "demo",
  },
];

async function seed() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI not found in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");

  // Avoid duplicate seeding if run more than once
  for (const demo of demoRecipes) {
    const exists = await Recipe.findOne({
      title: demo.title,
      source: "demo",
    });

    if (exists) {
      console.log(`Skipping (already exists): ${demo.title}`);
      continue;
    }

    await Recipe.create(demo);
    console.log(`Inserted: ${demo.title}`);
  }

  console.log("Done seeding demo recipes.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});

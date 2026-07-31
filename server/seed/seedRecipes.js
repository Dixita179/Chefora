const mongoose = require("mongoose");
require("dotenv").config();

const Recipe = require("../models/Recipe"); // Change to ../models/Recipe if needed

const recipes = [
  {
    title: "Chicken Biryani",
    category: "Dinner",
    time: "45 mins",
    difficulty: "Medium",
    ingredients: "Chicken, Rice, Onion, Yogurt, Spices",
    instructions: "Cook rice. Cook chicken. Layer and steam.",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d51a",
    video: "https://www.youtube.com/embed/95BCU1n268w",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Creamy White Sauce Pasta",
    category: "Lunch",
    time: "25 mins",
    difficulty: "Easy",
    ingredients: "Pasta, Cheese, Milk, Garlic",
    instructions: "Boil pasta. Make white sauce. Mix together.",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",
    video: "https://www.youtube.com/embed/8M4JmM0q7S0",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Chocolate Cake",
    category: "Dessert",
    time: "60 mins",
    difficulty: "Medium",
    ingredients: "Flour, Cocoa Powder, Eggs, Butter",
    instructions: "Prepare batter and bake.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    video: "https://www.youtube.com/embed/rJ5t5Zt6QDY",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Veg Pizza",
    category: "Dinner",
    time: "35 mins",
    difficulty: "Easy",
    ingredients: "Pizza Base, Cheese, Capsicum, Onion",
    instructions: "Add toppings and bake.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    video: "https://www.youtube.com/embed/sv3TXMSv6Lw",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Pancakes",
    category: "Breakfast",
    time: "20 mins",
    difficulty: "Easy",
    ingredients: "Flour, Eggs, Milk, Sugar",
    instructions: "Mix ingredients and cook on a pan.",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
    video: "https://www.youtube.com/embed/NCMKedZvnyI",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Caesar Salad",
    category: "Lunch",
    time: "15 mins",
    difficulty: "Easy",
    ingredients: "Lettuce, Croutons, Parmesan, Dressing",
    instructions: "Mix everything together.",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    video: "https://www.youtube.com/embed/9Qz5R0qM5hI",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Butter Chicken",
    category: "Dinner",
    time: "50 mins",
    difficulty: "Medium",
    ingredients: "Chicken, Butter, Tomato, Cream",
    instructions: "Cook chicken in rich tomato gravy.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    video: "https://www.youtube.com/embed/a03U45jFxOI",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Masala Dosa",
    category: "Breakfast",
    time: "40 mins",
    difficulty: "Medium",
    ingredients: "Dosa Batter, Potato, Onion",
    instructions: "Prepare potato filling and cook crispy dosa.",
    image: "https://images.unsplash.com/photo-1630383249896-424e482df921",
    video: "https://www.youtube.com/embed/CCab5oh0ZOc",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Pav Bhaji",
    category: "Snacks",
    time: "35 mins",
    difficulty: "Easy",
    ingredients: "Potato, Tomato, Peas, Butter",
    instructions: "Mash vegetables and serve with buttered pav.",
    image: "https://images.unsplash.com/photo-1617622141573-6d9b08d2b52c",
    video: "https://www.youtube.com/embed/dM9L7K6JX7k",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Rajma Chawal",
    category: "Lunch",
    time: "45 mins",
    difficulty: "Easy",
    ingredients: "Rajma, Rice, Onion, Tomato",
    instructions: "Cook rajma curry and serve with rice.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe",
    video: "https://www.youtube.com/embed/fxT8y9V0P2k",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Garlic Bread",
    category: "Snacks",
    time: "20 mins",
    difficulty: "Easy",
    ingredients: "Bread, Garlic, Butter",
    instructions: "Spread garlic butter and bake.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    video: "https://www.youtube.com/embed/3fP2wLqQ6pE",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Margherita Pizza",
    category: "Dinner",
    time: "40 mins",
    difficulty: "Medium",
    ingredients: "Pizza Dough, Mozzarella, Tomato Sauce",
    instructions: "Bake until cheese melts.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    video: "https://www.youtube.com/embed/sv3TXMSv6Lw",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Oreo Milkshake",
    category: "Drinks",
    time: "10 mins",
    difficulty: "Easy",
    ingredients: "Oreo, Milk, Ice Cream",
    instructions: "Blend until creamy.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
    video: "https://www.youtube.com/embed/KQ0jz0A6A0w",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Mango Smoothie",
    category: "Drinks",
    time: "10 mins",
    difficulty: "Easy",
    ingredients: "Mango, Milk, Honey",
    instructions: "Blend all ingredients together.",
    image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
    video: "https://www.youtube.com/embed/V4r1kM8PzX4",
    author: "Chefora",
    source: "demo"
  },
  {
    title: "Strawberry Cheesecake",
    category: "Dessert",
    time: "60 mins",
    difficulty: "Medium",
    ingredients: "Cream Cheese, Strawberry, Biscuits",
    instructions: "Prepare base, add filling and chill.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187",
    video: "https://www.youtube.com/embed/4nM8qISQh4E",
    author: "Chefora",
    source: "demo"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Recipe.deleteMany({ source: "demo" });

    await Recipe.insertMany(recipes);

    console.log("15 Demo Recipes Inserted Successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seedDatabase();
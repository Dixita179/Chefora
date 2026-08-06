const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


// Make uploads folder public

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Chefora Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.use("/api/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
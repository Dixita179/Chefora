import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; // adjust path to wherever Navbar.jsx actually lives

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadRecipe from "./pages/UploadRecipe";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/upload" element={<UploadRecipe />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
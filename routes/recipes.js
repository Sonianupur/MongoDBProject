const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const verifyAuthorization = require("../middleware/authorization");

// =========================================================
// READ recipes list from DB
// =========================================================
router.get("/list", verifyAuthorization, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalRecipes = await Recipe.countDocuments();
    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const totalPages = Math.ceil(totalRecipes / limit);

    res.render("recipes/list", { recipes, currentPage: page, totalPages });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

// =========================================================
// Render Form to add new recipe
// =========================================================
router.get("/add", (req, res) => {
  res.render("recipes/add");
});

// =========================================================
// CREATE New Recipe
// =========================================================
router.post("/add", verifyAuthorization, async (req, res) => {
  const { Title, Ingredients, Instructions, Image_Name, Cleaned_Ingredients } =
    req.body;
  const recipe = new Recipe({
    Title,
    Ingredients: Ingredients.split(",").map((item) => item.trim()),
    Instructions,
    Image_Name,
    Cleaned_Ingredients: Cleaned_Ingredients.split(",").map((item) =>
      item.trim()
    ),
  });
  await recipe.save();
  res.redirect("/recipes/list");
});

// =========================================================
// READ single recipe details by recipe ID
// =========================================================
router.get("/list/:id", verifyAuthorization, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.render("recipes/details", { recipe });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// =========================================================
// Render Form to Edit a recipe details by recipe ID
// =========================================================
router.get("/:id/edit", verifyAuthorization, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send("Recipe not found");
    }
    res.render("recipes/edit", { recipe });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// =========================================================
// UPDATE a recipe details by recipe ID
// =========================================================
router.put("/:id/edit", verifyAuthorization, async (req, res) => {
  const { Title, Ingredients, Instructions, Image_Name, Cleaned_Ingredients } =
    req.body;
  try {
    await Recipe.findByIdAndUpdate(req.params.id, {
      Title,
      Ingredients: Ingredients.split(",").map((item) => item.trim()),
      Instructions,
      Image_Name,
      Cleaned_Ingredients: Cleaned_Ingredients.split(",").map((item) =>
        item.trim()
      ),
    });
    res.redirect(`/recipes/list/${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// =========================================================
// DELETE recipe by recipe ID
// =======================================================
router.delete("/list/:id", verifyAuthorization, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect("/recipes/list");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

// const mongoose = require('mongoose');S

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Ingredients: { type: [String], required: true },
  Instructions: { type: String, required: true },
  Image_Name: { type: String, required: true },
  Cleaned_Ingredients: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

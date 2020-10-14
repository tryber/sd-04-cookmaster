const recipeModel = require('../models/recipeModel');

async function listRecipes(req, res) {
  const recipes = await recipeModel.getAllRecipes();
  return res.render('home', { recipes, user: req.user });
}

async function showRecipesByUser(req, res) {
  const recipes = await recipeModel.getRecipe(Number(req.params.id));
  res.render('recipe', { recipes, user: req.user });
}

module.exports = { listRecipes, showRecipesByUser };

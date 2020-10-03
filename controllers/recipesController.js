const recipesModel = require('../models/recipesModel');

const showAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();

  res.render('home', { recipes, user: req.user });
};

const showRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.getRecipeById(id);

  res.render('recipes/recipe', { ...recipe, user: req.user });
};

module.exports = {
  showAllRecipes,
  showRecipe,
};

const recipesModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipes = await recipesModel.getRecipes();

  res.render('home', { recipes, user: req.user });
};

const details = async (req, res) => {
  const { id } = req.params;
  const recipeDetails = await recipesModel.getRecipeDetails(id);
  res.render('recipeDetails', { recipeDetails, user: req.user });
};

module.exports = { listRecipes, details };

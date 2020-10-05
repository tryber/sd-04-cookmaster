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

const editRecipe = async (_req, res) => {
  res.render('editRecipe');
};

const deleteRecipe = async (_req, res) => {
  res.render('deleteRecipe');
};

module.exports = { listRecipes, details, editRecipe, deleteRecipe };

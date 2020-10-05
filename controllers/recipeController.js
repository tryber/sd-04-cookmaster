const recipesModel = require('../models/recipeModel');

const showAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getRecipes();

  res.render('home', { recipes, user: req.user });
};

const showRecipeDetails = async (req, res) => {
  const recipes = await recipesModel.getRecipes();

  res.render('recipe', { recipes, user: req.user });
};

const showRecipe = async (req, res) => {
  const { id } = req.params;

  const recipes = await recipesModel.find(id);
  res.render('recipe', { recipes, user: req.user });
};

const editRecipe = async (req, res) => {
  const { id } = req.params;

  const recipes = await recipesModel.find(id);
  res.render('recipe', { recipes, user: req.user });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const recipes = await recipesModel.find(id);
  res.render('recipe', { recipes, user: req.user });
};

module.exports = {
  showAllRecipes,
  showRecipeDetails,
  showRecipe,
  editRecipe,
  deleteRecipe,
};

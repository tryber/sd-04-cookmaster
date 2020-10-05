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

const searchRecipes = async (req, res) => {
  const { q } = req.query;

  const recipes = await recipesModel.getRecipes();

  if (!q) return res.render('searchRecipes', { user: req.user, recipeByName: null });

  const recipeByName = recipes.find((recipe) => recipe.recipeName === q);

  return res.render('searchRecipes', { recipeByName, user: req.user });
};

const registerRecipes = async (req, res) => {
  res.render('registerRecipes', { user: req.user });
};

const editRecipe = async (_req, res) => {
  res.render('editRecipe');
};

const deleteRecipe = async (_req, res) => {
  res.render('deleteRecipe');
};

module.exports = {
  listRecipes,
  details,
  searchRecipes,
  registerRecipes,
  editRecipe,
  deleteRecipe,
};

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

const editRecipe = async (_req, res) => {
  res.render('recipes/edit');
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  if (q === '') return res.render('recipes/search', { recipes: null, user: req.user });

  const recipes = await recipesModel.searchRecipes(q);
  res.render('recipes/searchRecipe', { recipes, user: req.user });
};

module.exports = {
  showAllRecipes,
  showRecipe,
  editRecipe,
  searchRecipe,
};

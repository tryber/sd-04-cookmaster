const recipesModel = require('../models/recipesModel');

const showAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();
  console.log(req);
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

module.exports = {
  showAllRecipes,
  showRecipe,
  editRecipe,
};

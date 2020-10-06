const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await recipeModel.getAllRecipes();
  res.render('home', { recipes, message: null, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.getRecipeById(id);
  return res.status(200).render('recipes/details', { recipe, user: req.user });
};

module.exports = {
  listRecipes,
  recipeDetails,
};

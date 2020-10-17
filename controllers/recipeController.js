const recipeModel = require('../models/recipeModel');

const listAllRecipes = async (req, res) => {
  const recipes = await recipeModel.findAllRecipes();
  res.render('home', { user: req.user, recipes });
};

const recipeDetail = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipeModel.findRecipeById(id);
  res.render('recipeDetails', { user: req.user, recipes });
};

module.exports = { listAllRecipes, recipeDetail };

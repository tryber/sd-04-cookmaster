const recipesModel = require('../models/recipesModel');
const Recipes = require('../models/recipesModel');

const index = async (req, res) => {
  const allRecipes = await Recipes.getAll();

  res.render('home', { allRecipes, user: req.user });
};

const show = async (req, res) => {
  const recipeDetails = await Recipes.getById(req.params.id);

  res.render('recipes/details', { recipeDetails, user: req.user });
};

module.exports = {
  index,
  show,
};
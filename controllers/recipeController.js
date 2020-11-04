const Recipes = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipe = await Recipes.getRecipes();
  return res.render('home', { recipe, user: req.user });
};

const recipeDetail = async (req, res) => {
  const { id } = req.params;
  const theRecipe = await Recipes.findById(id);
  return res.render('recipeDetail', { theRecipe, user: req.user });
};

const recipeName = async (req, res) => {
  const { name } = req.params;
  const recName = await Recipes.findByName(name);
  return res.render('recipeDetail', { recName, user: req.user });
};

module.exports = { listRecipes, recipeDetail, recipeName };

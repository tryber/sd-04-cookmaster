const Recipes = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipe = await Recipes.getRecipes();
  const { user = '' } = req;
  res.render('home', { recipe, user: user });
};

const recipeDetail = async (req, res) => {
  const { id } = req.params;
  const recipeDetail = await Recipes.findById(id);
  return res.render('recipeDetail', { recipeDetail });
};

module.exports = { listRecipes, recipeDetail };

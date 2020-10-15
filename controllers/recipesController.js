const { getRecipes, getRecipesById } = require('../models/recipesModel');

const recipesCtrl = async (req, res) => {
  const recipes = await getRecipes();
  const { token } = req.cookies || {};
  return res.render('home', { recipes, token });
};

const recipesDtls = async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipesById(id);
  return res.render('recipesDetails', { recipe, user: req.user });
};

module.exports = {
  recipesCtrl,
  recipesDtls,
};

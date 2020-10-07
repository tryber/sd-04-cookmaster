const { getRecipes, getRecipeById } = require('../models/recipeModel');

const findAllRecipes = async (req, res) => {
  const recipes = await getRecipes();
  const { user = '' } = req;

  return res.render('home', { recipes, user });
};

const findRecipeDetails = async (req, res) => {
  const { user } = req;
  const recipe = await getRecipeById(req.params.id);
  const isRecipeOwner = !!user && user.id === recipe.id;

  return res.render('recipeDetails', { recipe, isRecipeOwner, user });
};

module.exports = {
  findAllRecipes,
  findRecipeDetails,
};

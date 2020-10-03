const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await recipeModel.getAllRecipes();
  res.render('home', { recipes, message: null, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.getRecipeById(id);
  return res.status(200).render('recipes/recipeDetails', { recipe, user: req.user });
};

const searchRecipes = async (req, res) => {
  const { q } = req.query;
  if (!q && q !== '') res.status(200).render('recipes/search', { recipes: null, user: req.user });
  const recipes = await recipeModel.getRecipeByName(q);
  res.status(200).render('recipes/search', { recipes, user: req.user, query: q });
}

module.exports = {
  listRecipes,
  recipeDetails,
  searchRecipes,
};

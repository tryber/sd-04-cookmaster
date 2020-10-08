const { findAllRecipes, findRecipeById, searchRecipeByName } = require('../models/recipeModel');

const index = async (req, res) => {
  const recipes = await findAllRecipes();

  return res.render('home', { recipes, user: req.user });
};

const findRecipeDetails = async (req, res) => {
  const { user } = req;
  const recipe = await findRecipeById(req.params.id);
  const isRecipeOwner = !!user && user.id === recipe.id;

  return res.render('recipeDetails', { recipe, isRecipeOwner, user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  if (q === '') return res.render('search', { recipes: [], user: req.user });

  const recipes = await searchRecipeByName(q);
  return res.render('search', { recipes, user: req.user });
};

module.exports = {
  index,
  findRecipeDetails,
  searchRecipe,
};

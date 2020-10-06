const { getAll, getRecipeById, searchRecipeModel } = require('../models/listRecipesModel');

const listRecipes = async (req, res) => {
  const recipes = await getAll();

  res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeById(id);

  res.render('recipeDetails', { recipe, user: req.user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  if ( q === '' ) return res.render('search', { recipes: null, user: req.user });

  const recipes = await searchRecipeModel(q);
  res.render('search', { recipes, user: req.user})
}

module.exports = {
  listRecipes,
  recipeDetails,
  searchRecipe,
};

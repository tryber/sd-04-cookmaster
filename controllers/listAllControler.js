const { getAll, getRecipeById } = require('../models/listRecipesModel');

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
  const searchFor = req.query;
  console.log(searchFor)

  const recipes = [];
  res.render('search', { recipes, user: req.user})
}

module.exports = {
  listRecipes,
  recipeDetails,
  searchRecipe,
};

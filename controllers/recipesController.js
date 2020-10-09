const Recipe = require('../models/recipeModel');

const recipeList = async (req, res) => {
  const user = req.user;
  const recipes = await Recipe.getAllRecipes();
  res.render('home', { recipes, user });
};

const showDetails = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const recipes = await Recipe.getRecipeById(id);
  const recipe = recipes[0];
  res.render('details', { recipe, user });
};

module.exports = {
  recipeList,
  showDetails,
};

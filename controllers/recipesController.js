const Recipes = require('../models/recipesModel');

const index = async (req, res) => {
  const recipes = await Recipes.listRecipes();
  const user = req.user;
  return res.render('home', { recipes, user });
};

const recipesDetails = async (req, res) => {
  const recipe = await Recipes.recipesById(req.params.id);
  return res.render('recipes/detail', { recipe, user: req.user });
};

const userRecipes = async (req, res) => {
  const recipes = await Recipes.recipesByUserId(req.user.id);
  // console.log(recipes);
  res.render('/', { recipes });
};

module.exports = {
  index,
  recipesDetails,
  userRecipes,
};

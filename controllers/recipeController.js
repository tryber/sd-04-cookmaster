const RecipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await RecipeModel.getAllRecipes();
  const user = req.user;
  res.render('home', { recipes, user });
};

const recipeById = async (req, res) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const recipe = await RecipeModel.getByIdRecipe(idNumber);
  const user = req.user;
  res.render('recipeById', { recipe, user });
};

module.exports = { listRecipes, recipeById };

const RecipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await RecipeModel.getAllRecipes();
  const user = req.user;
  res.render('home', { recipes, user });
};

module.exports = { listRecipes };

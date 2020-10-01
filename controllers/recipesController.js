const Recipe = require('../models/recipeModel');

const recipeList = async (req, res) => {
  const user = req.user;
  const recipes = await Recipe.getAllRecipes();
  res.render('home', { recipes, user });
};

module.exports = {
  recipeList,
};

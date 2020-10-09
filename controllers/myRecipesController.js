const Recipe = require('../models/recipeModel');

const showMyRecipes = async (req, res) => {
  const user = req.user;
  const recipes = await Recipe.getAllRecipes();
  res.render('myRecipe', { user, recipes });
};

module.exports = {
  showMyRecipes,
};

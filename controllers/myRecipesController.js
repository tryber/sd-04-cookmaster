const Recipe = require('../models/recipeModel');

const showMyRecipes = async (req, res) => {
  const user = req.user;
  const recipes = await Recipe.getAllRecipes();
  console.log(recipes);
  res.render('myRecipe', { user, recipes });
};

module.exports = {
  showMyRecipes,
};

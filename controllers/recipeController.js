const recipesModel = require('../models/recipeModel');

const showAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getRecipes();

  console.log(recipes);
  res.render('home', { recipes, user: req.user });
};

module.exports = {
  showAllRecipes,
};

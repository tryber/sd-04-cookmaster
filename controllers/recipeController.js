const recipesModel = require('../models/recipeModel');

const showAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getRecipes();

  res.render('home', { recipes, user: req.user });
};

module.exports = {
  showAllRecipes,
};

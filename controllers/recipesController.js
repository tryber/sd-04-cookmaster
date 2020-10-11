const Recipe = require('../models/recipesModel');

const home = async (req, res) => {
  const recipes = await Recipe.findAll();
  res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const recipes = await Recipe.findById(req.params.id);
  res.render('recipes', { recipes, user: req.user });
};

module.exports = {
  home,
  recipeDetails,
};

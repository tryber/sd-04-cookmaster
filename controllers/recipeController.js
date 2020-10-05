const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();
  return res.render('home', { recipes, user: req.user });
  // tem q colocar tb o user para acessar na home e na navbar
};

module.exports = {
  showRecipes,
};

const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();
  return res.render('home', { recipes });
};

module.exports = {
  showRecipes,
};

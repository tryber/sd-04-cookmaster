const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();
  return res.render('home', { recipes });
};

// Exportando para ser usado no index.js
module.exports = {
  showRecipes,
};

const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();
  return res.render('home', { recipes, user: req.user });
  // Enviando receitas e user para a home na navbar
};

// Exportando para ser usado no index.js
module.exports = {
  showRecipes,
};

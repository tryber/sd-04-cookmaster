const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();
  return res.render('home', { recipes, user: req.user });
  // Enviando receitas e user para a home na navbar
};

const searchRecipesController = async (req, res) => {
  // o input de texto fica acessível pela prop q do obj req.query
  const { q } = req.query;

  if (q === '') return res.render('searchRecipes', { recipes: null, user: req.user });
  const recipes = await recipeModel.searchRecipesModel(q);
  return res.render('searchRecipes', { recipes, user: req.user });
};

// Exportando para ser usado no index.js
module.exports = {
  showRecipes,
  searchRecipesController,
};

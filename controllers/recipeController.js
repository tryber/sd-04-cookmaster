const recipeModel = require('../models/recipeModel');

// Controller de mostrar receitas na home
const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();
  const user = req.user || null;
  res.render('home', { recipes, user });
  // Enviando receitas e user para a home na navbar
};

// Controller da página de busca de receitas
const searchRecipesController = async (req, res) => {
  // o input de texto fica acessível pela prop q do obj req.query
  const { q } = req.query;

  if (q === '') return res.render('searchRecipes', { recipes: null, user: req.user });
  const recipes = await recipeModel.searchRecipesModel(q);
  return res.render('searchRecipes', { recipes, user: req.user });
};

// Controller da página de receita aberta detalhada
const openRecipesController = async (req, res) => {
  const { id } = req.params;
  const user = req.user || null;
  const recipe = await recipeModel.openRecipesModel(id);

  res.render('recipeDetails', { ...recipe, user });
};

// Exportando para ser usado no index.js
module.exports = {
  showRecipes,
  searchRecipesController,
  openRecipesController,
};

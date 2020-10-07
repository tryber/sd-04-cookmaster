const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();

  return res.render('home', { recipes, user: req.user });
};

const seeRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.recipeById(id);

  res.render('seerecipe', { ...recipe, user: req.user });
};

// créditos a explicação de Tereza
const searchRecipess = async (req, res) => {
  const { q } = req.query;
  if (q === '') return res.render('searchRecipe', { recipes: null, user: req.user });
  const recipes = await recipeModel.searchRecipes(q);
  return res.render('searchRecipe', { recipes, user: req.user });
};

module.exports = {
  showRecipes,
  seeRecipe,
  searchRecipess,
};

const recipesModels = require('../models/recipesModels');
const userModel = require('../models/userModel');
const { validation } = require('../services/isValid');

// Pagina Inicial
const index = async (req, res) => {
  const recipes = await recipesModels.getAllRecipes();

  res.render('home', { recipes, user: req.user });
};

// Cadastros Controllers
const cadastroForm = async (req, res) => res.render('cadastro', { message: null });

const cadastro = async (req, res) => {
  const isValid = await validation({ ...req.body });
  if (isValid.status === 'ok') {
    await userModel.addUser({ ...req.body });
    res.render('cadastro', { message: isValid.message });
  } else {
    res.render('cadastro', { message: isValid.message });
  }
};

// Recipe Details Controllers
const recipeDetails = async (req, res) => {
  const recipe = await recipesModels.findRecipeById(req.params.id);
  res.render('recipeDetail', { recipe, user: req.user });
};

// Search Bar
const search = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.render('search', { recipes: [] });
  const recipes = await recipesModels.findRecipeByName(q);
  return res.render('search', { recipes, user: req.user });
};

const newRecipe = async (req, res) => {
  res.render('newRecipe', { user: req.user });
};
module.exports = {
  index,
  cadastro,
  cadastroForm,
  recipeDetails,
  search,
  newRecipe,
};

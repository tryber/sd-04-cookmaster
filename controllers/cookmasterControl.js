const recipesModels = require('../models/recipesModels');
const updateModels = require('../models/updateModels');
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

// Nova receita Controller
const newRecipe = async (req, res) => {
  console.log(req.user);
  res.render('newRecipe', { user: req.user });
};

const postNewRecipe = async (req, res) => {
  await recipesModels.newRecipe(req.body);
  return res.redirect('/');
};

// Edit Recipe Controller
const edit = async (req, res) => {
  const recipe = await recipesModels.findRecipeById(req.params.id);
  return res.render('edit', { recipe, user: req.user });
};

const editPost = async (req, res) => {
  const { receita, ingredientes, preparo } = req.body;
  const id = req.params.id;
  await updateModels.updateRecipe(id, receita, ingredientes, preparo);
  return res.redirect(`/recipes/${req.params.id}`);
};

module.exports = {
  index,
  cadastro,
  cadastroForm,
  recipeDetails,
  search,
  newRecipe,
  edit,
  editPost,
  postNewRecipe,
};

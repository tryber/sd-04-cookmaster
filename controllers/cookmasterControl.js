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
  res.render('newRecipe', { user: req.user });
};

const postNewRecipe = async (req, res) => {
  await recipesModels.newRecipe(req.body);
  return res.redirect('/');
};

// Edit Recipe Controller GET
const edit = async (req, res) => {
  const recipe = await recipesModels.findRecipeById(req.params.id);
  return res.render('edit', { recipe, user: req.user });
};

// Edit Recipe Controller POST
const editPost = async (req, res) => {
  const { receita, ingredientes, preparo } = req.body;
  const id = req.params.id;
  await updateModels.updateRecipe(id, receita, ingredientes, preparo);
  return res.redirect('/me/recipes');
};

// Controller com Minhas Receitas
const myRecipe = async (req, res) => {
  const id = req.user.id;
  const recipes = await recipesModels.allByUser(id);
  res.render('myRecipe', { recipes, user: req.user });
};

// Controller com Deletar receitas GET
const deleteRecipe = async (req, res) => {
  const id = req.params.id;
  return res.render('delete', { id, message: null });
};

// Controller com Deletar Receitas
const delPost = async (req, res) => {
  const id = req.params.id;
  const recipe = await recipesModels.findRecipeById(id);
  const user = await userModel.findById(recipe.userId);
  const password = await req.body.password;

  if (user.password !== password) {
    return res.render('delete', { recipe, id, user: req.user, message: 'Senha Incorreta.' });
  }

  await updateModels.deleteRecipe(req.params.id);
  return res.redirect('/');
};

// Controllers User Edit
const userEdit = async (req, res) => {
  const userData = await userModel.findById(req.user.id);
  console.log('chamou o GET', userData);
  res.render('editUser', { userData, user: req.user, message: null });
};

const userEditPost = async (req, res) => {
  console.log('chamou o Post', req.body);
  const isValid = await validation({ ...req.body });
  if (isValid.status === 'ok') {
    await userModel.editUserModel(req.body);
    res.redirect('/');
  } else {
    res.render('cadastro', { userData: { ...req.body }, user: req.user, message: isValid.message });
  }
};

module.exports = {
  userEditPost,
  userEdit,
  delPost,
  cadastro,
  cadastroForm,
  deleteRecipe,
  edit,
  editPost,
  index,
  myRecipe,
  newRecipe,
  postNewRecipe,
  recipeDetails,
  search,
};

const recipesModel = require('../models/recipeModel');

const showAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getRecipes();

  res.render('home', { recipes, user: req.user });
};

// minhas receitas
const showUserRecipes = async (req, res) => {
  const { id } = req.user;
  const recipes = await recipesModel.getRecipes();

  res.render('userRecipes', { recipes, user: req.user });
};

const showRecipeDetails = async (req, res) => {
  const recipes = await recipesModel.getRecipes();

  res.render('recipe', { recipes, user: req.user });
};

const showRecipe = async (req, res) => {
  const { id } = req.params;

  const recipes = await recipesModel.find(id);
  res.render('recipe', { recipes, user: req.user });
};

const editRecipe = async (req, res) => {
  const { id } = req.params;

  const recipes = await recipesModel.find(id);
  res.render('updateRecipe', { recipes, user: req.user, message: null });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const recipes = await recipesModel.find(id);
  res.render('recipe', { recipes, user: req.user });
};

const buscaReceita = async (req, res) => {
  const { q } = req.query;

  const recipes = await recipesModel.getRecipesByName(q);

  res.render('search', { recipes, user: req.user });
};

const newRecipe = async (req, res) => {
  res.render('newReceita', { user: req.user, message: null });
};

const create = async (req, res) => {
  const { nameRecipe, task, instrucoes } = req.body;
  const { id, firstName, lastName } = req.user;

  if (!recipesModel.isValid(nameRecipe, task, instrucoes)) {
    return res.status(400).render('newReceita', { user: req.user, message: 'dados invalidos' });
  }
  {
    const user = await `${firstName} ${lastName}`;
    await recipesModel.createRecipe(id, user, nameRecipe, task, instrucoes);

    return res.redirect('/recipes');
  }
};

module.exports = {
  showAllRecipes,
  showUserRecipes,
  showRecipeDetails,
  showRecipe,
  editRecipe,
  deleteRecipe,
  buscaReceita,
  newRecipe,
  create,
};

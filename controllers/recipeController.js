const recipesModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const showAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getRecipes();

  res.render('home', { recipes, user: req.user });
};

// minhas receitas
const showUserRecipes = async (req, res) => {
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
  const ingTrat = recipes[2].replace('[', '').replace(']', '').replace('" ', '');
  res.render('recipe', { recipes, ingTrat, user: req.user });
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

const editRecipe = async (req, res) => {
  const { id } = req.params;

  const recipes = await recipesModel.find(id);

  const ingredients = recipes[2].split(',');

  res.render('updateRecipe', { recipes, ingredients, user: req.user, message: null });
};

const update = async (req, res) => {
  const { nameRecipe, item, instrucoes } = req.body;
  const { id } = req.params;
  await recipesModel.updateRecipe(id, nameRecipe, item, instrucoes);

  return res.redirect('/me/recipes');
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  res.render('deleteForm', { id, user: req.user, message: null });
};

const validaDelete = async (req, res) => {
  const { confirmPass } = req.body;
  const user = await userModel.findById(req.user.id);

  if (confirmPass === user.password) {
    await recipesModel.deleteRecipeModel(req.params.id);
    return res.redirect('/');
  }
  {
    const { id } = req.params;
    return res.render('deleteForm', { id, user: req.user, message: 'Senha Incorreta.' });
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
  update,
  validaDelete,
};

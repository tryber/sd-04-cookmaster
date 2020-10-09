const Recipes = require('../models/recipeModel');
const User = require('../models/userModel');

const listAllRecipes = async (req, res) => {
  const recipes = await Recipes.getAllRecipes();

  res.status(200).render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (!id) res.status(404).render('notFound');

  res.status(200).render('recipes', { recipe, user: req.user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  const recipes = q ? await Recipes.searchRecipeByName(q) : await Recipes.getAllRecipes();
  let message;

  if (recipes === []) {
    message = 'Nada encontrado...';
    console.log('linha 28', message);
    res.status(200).render('searchRecipe', { recipes, user: req.user, message });
  }

  console.log('linha 29', recipes);
  res.status(200).render('searchRecipe', { recipes, user: req.user, message });
};

const addRecipe = async (req, res) => {
  const { name, ingredientList, instructions } = req.body;

  const { iD, firstName, lastName } = req.user;

  const fullName = `${firstName} ${lastName}`;

  await Recipes.createRecipe(iD, fullName, name, ingredientList, instructions);
  // res.render('newRecipe', { user: req.user });
  res.redirect('/');
};

const newRecipe = async (req, res) => {
  res.render('newRecipe', { user: req.user });
};

const renderRemoveRecipe = async (req, res) => {
  console.log('linha 48 req.user', req.user);

  const userActual = await User.findById(req.user.iD);
  console.log('linha 51, userActual ', userActual.iD);

  if (userActual.iD !== req.user.iD)
    return res.status(200).render('deleteRecipe', {
      user: req.user,
      message: 'Você não tem autorização para excluir essa receita...',
    });
  res.status(200).render('deleteRecipe', { message: null, user: req.user });
};

const removeRecipe = async (req, res) => {
  const { password } = req.body;
  const validatePassword = Recipes.isPasswordValid(req.user.password, senha);

  console.log('linha 65 senha digitada', senha);
  console.log('linha 66', validatePassword);
  console.log('linha 67', req.user);
  // await Recipes.deleteRecipe(req.user.iD);

  res.status(200).render('home', { message: null, user: req.user });
};

const renderEditRecipe = async (req, res) => {
  const userActual = req.user;
  const isUser = User.findById(req.user.iD);
  const recipe =
  res.status(200).render('editRecipes', { user: userActual });
};

const myRecipes = async (req, res) => {
  res.status(200).render('myRecipes', { user: req.user });
};
module.exports = {
  recipeDetails,
  listAllRecipes,
  newRecipe,
  addRecipe,
  searchRecipe,
  removeRecipe,
  renderRemoveRecipe,
  renderEditRecipe,
  myRecipes,
};

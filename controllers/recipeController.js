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
  try {
    const { q } = req.query;

    const recipes = q ? await Recipes.searchRecipeByName(q) : await Recipes.getAllRecipes();

    if (recipes.length === 0) {
      const message = 'Nada encontrado...';
      console.log('linha 29', message);
      return res.status(200).render('searchRecipe', { recipes, user: req.user, message });
    }

    console.log('linha 32', recipes);
    res.status(200).render('searchRecipe', { recipes, user: req.user, message: null });
  } catch (err) {
    console.log('catch', err.name);
    console.log('catch', err.message);
  }
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
  const recipe = await Recipes.getRecipeById(req.params.id);

  console.log('linha 59, recipe userID', recipe.userId);

  const userDB = await User.findById(req.user.iD);
  console.log('linha 62, userActual, iD ', userDB.iD);
  console.log('linha 63, userActual, senha ', userDB.password);
  console.log('linha 64, recipe Id', req.params.id);
  if (userDB.iD !== recipe.userId)
    return res.status(200).render('deleteRecipe', {
      user: req.user,
      message: 'Você não tem autorização para excluir essa receita...',
    });
  res.status(200).render('deleteRecipe', { message: null, user: req.user });
};

const removeRecipe = async (req, res) => {
  const { password } = req.body;
  const userData = await User.findById(req.user.iD);
  const validatePassword = await Recipes.isPasswordValid(userData.password, password);
  console.log('linha77 req.user.iD', req.user.iD);
  console.log('linha78 userDataId', userData.iD);
  console.log('linha79 user firstName', userData.firstName);
  console.log('linha 80 password input', password);
  console.log('linha 81, user password', userData.password);
  console.log('linha 82', validatePassword);
  const recipeId = req.params.id;
  console.log('linha 84, req.params.id', recipeId);

  if (validatePassword) {
    await Recipes.deleteRecipe(recipeId);
    res.status(202).redirect('/');
  }

  // validatePassword ? await Recipes.deleteRecipe(recipeId) : null;

  res.render('deleteRecipe', { message: 'Senha Incorreta.', user: req.user });
};

const renderEditRecipe = async (req, res) => {
  // const isUser = await User.findById(req.user.iD);
  console.log('linha 92 is User', req.user);
  console.log('linha 93 req.params', req.params);
  const recipe = await Recipes.getRecipeById(req.params.id);
  console.log('linha 95', recipe);

  res.status(200).render('editRecipes', { user: req.user, recipe });
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

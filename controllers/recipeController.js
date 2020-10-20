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

  if (recipes.length === 0) {
    const message = 'Nada encontrado...';

    return res.status(200).render('searchRecipe', { recipes, user: req.user, message });
  }

  return res.status(200).render('searchRecipe', { recipes, user: req.user, message: null });
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

  const userDB = await User.findById(req.user.iD);

  if (userDB.iD !== recipe.userId) {
    return res.status(200).render('deleteRecipe', {
      user: req.user,
      message: 'Você não tem autorização para excluir essa receita...',
    });
  }
  return res.status(200).render('deleteRecipe', { message: null, user: req.user });
};

const removeRecipe = async (req, res) => {
  const { password } = req.body;
  const userData = await User.findById(req.user.iD);
  const validatePassword = await Recipes.isPasswordValid(userData.password, password);

  const recipeId = req.params.id;

  if (validatePassword) {
    await Recipes.deleteRecipe(recipeId);
    res.status(202).redirect('/');
  }

  res.render('deleteRecipe', { message: 'Senha Incorreta.', user: req.user });
};

const renderEditRecipe = async (req, res) => {
  const isUser = await User.findById(req.user.iD);
  // console.log('linha 81, is User: ', isUser);
  // console.log('linha 82, req.params: ', req.params);
  const recipe = await Recipes.getRecipeById(req.params.id);
  // console.log('linha 84, recipe: ', recipe);

  if (isUser.iD !== recipe.userId) {
    res.redirect(`/recipes/${recipe.iD}`);
  }

  res.status(200).render('editRecipes', { user: req.user, recipe });
};

const editRecipe = async (req, res) => {
  const { id, name, ingredients, instructions } = req.body;
  // console.log('linha 95, recipe', name, ingredients, instructions);
  await Recipes.updateRecipe(id, name, ingredients, instructions);
  res.redirect('/');
};

const myRecipes = async (req, res) => {
  const userId = req.user.iD;
  const allRecipes = await Recipes.getAllRecipes();
  const userOwnerRecipe = allRecipes.filter((recipe) => recipe.userId === userId);
  // console.log('userId: ', userId);
  // console.log('receitas do user: ', userOwnerRecipe);

  res.status(200).render('myRecipes', { user: req.user, recipes: userOwnerRecipe });
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
  editRecipe,
  myRecipes,
};

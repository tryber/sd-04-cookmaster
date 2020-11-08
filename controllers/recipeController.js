const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();
  const user = req.user || null;
  res.render('home', { recipes, user });
};

const searchRecipesController = async (req, res) => {
  const { q } = req.query;

  if (q === '') return res.render('searchRecipes', { recipes: null, user: req.user });
  const recipes = await recipeModel.searchRecipesModel(q);
  return res.render('searchRecipes', { recipes, user: req.user });
};

const openRecipesController = async (req, res) => {
  const { id } = req.params;
  const user = req.user || null;
  const recipe = await recipeModel.openRecipesModel(id);

  res.render('recipeDetails', { ...recipe, user });
};

const newRecipePage = async (req, res) => {
  const user = req.user;
  res.render('admin/newRecipe', { user });
};

const createRecipeController = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { id, name: firstName, lastName } = req.user;
  const fullName = `${firstName} ${lastName}`;
  await recipeModel.createRecipeModel(id, fullName, name, ingredients, instructions);
  res.redirect('/');
};

const editRecipePage = async (req, res) => {
  const recipes = await recipeModel.openRecipesModel(req.params.id);

  if (req.user.id !== recipes.userId) {
    res.redirect(`/recipes/${recipes.id}`);
  }
  return res.render('admin/editRecipe', { recipes, user: req.user });
};

const editRecipe = async (req, res) => {
  const id = req.params.id;
  const { name, ingredients, instructions } = req.body;
  await recipeModel.editRecipeModel(id, name, ingredients, instructions);
  res.redirect('/me/recipes');
};

const myRecipesPage = async (req, res) => {
  const userId = req.user.id;
  recipeModel.getRecipeByUser(userId)
    .then((recipes) => {
      res.render('admin/myRecipes', { user: req.user, recipes });
    });
};

const deleteRecipePage = async (req, res) => {
  const recipes = await recipeModel.openRecipesModel(req.params.id);

  if (req.user.id !== recipes.userId) {
    res.redirect('/');
  }
  return res.render('admin/deleteRecipe', { user: req.user, recipeId: req.params.id, message: null });
};

const deleteRecipes = async (req, res) => {
  const user = req.user.id;
  const { senha } = req.body;
  const userPass = await userModel.findById(user);
  if (senha === userPass.password) {
    await recipeModel.deleteRecipe(req.params.id);
    res.redirect('/');
  }
  return res.render('admin/deleteRecipe', {
    message: 'Senha Incorreta.',
    user: req.user,
    recipeId: req.params.id,
  });
};

module.exports = {
  showRecipes,
  searchRecipesController,
  openRecipesController,
  newRecipePage,
  createRecipeController,
  editRecipePage,
  editRecipe,
  myRecipesPage,
  deleteRecipePage,
  deleteRecipes,
};

const recipeModel = require('../models/recipeModel');

const show = async (req, res) => {
  const recipes = await recipeModel.getAll();
  res.render('home', { recipes, user: req.user });
};

const showRecipeDetail = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.findById(id);
  res.render('recipes', { recipe, user: req.user });
};

const showUserRecipes = async (req, res) => {
  const { user } = req;
  const recipes = await recipeModel.findByUserId(user.id);
  res.render('myRecipes', { recipes, user });
};

const searchRecipes = async (req, res) => {
  const recipes = await recipeModel.findByName(req.query.q);
  res.render('recipesSearch', { recipes, user: req.user });
};

const formNewRecipe = (req, res) => {
  res.render('newRecipe', { user: req.user });
};

const addNewRecipe = async (req, res) => {
  const { userId, user, recipeName, recipeIngredients, recipeInstructions } = req.body;

  await recipeModel.add(userId, user, recipeName, recipeIngredients.join(), recipeInstructions);

  return res.redirect('/');
  // res.render('newRecipe', { user: req.user });
};

const updateForm = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.findById(id);
  return res.render('editRecipe', { recipe, user: req.user });
};

const update = async (req, res) => {
  const { recipeId, recipeName, recipeIngredients, recipeInstructions } = req.body;
  await recipeModel.update(recipeId, recipeName, recipeIngredients.join(), recipeInstructions);
  return res.redirect('/');
};

module.exports = {
  show,
  showRecipeDetail,
  showUserRecipes,
  searchRecipes,
  formNewRecipe,
  addNewRecipe,
  updateForm,
  update,
};

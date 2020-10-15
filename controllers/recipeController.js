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

const searchRecipes = async (req, res) => {
  const recipes = await recipeModel.findByName(req.query.q);
  res.render('recipesSearch', { recipes, user: req.user });
};

const formNewRecipe = (req, res) => {
  res.render('newRecipe', { user: req.user, message: null });
};

const addNewRecipe = async (req, res) => {
  const { userId, user, recipeName, recipeIngredients, recipeInstructions } = req.body;

  await recipeModel.add(userId, user, recipeName, recipeIngredients.join(), recipeInstructions);

  // return res.redirect('/');
  res.render('newRecipe', { user: req.user, message: 'Receita salva!' });
};

module.exports = {
  show,
  showRecipeDetail,
  searchRecipes,
  formNewRecipe,
  addNewRecipe,
};

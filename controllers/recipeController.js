const recipeModel = require('../models/recipeModel');

const listAllRecipes = async (req, res) => {
  const recipes = await recipeModel.findAllRecipes();
  res.render('home', { user: req.user, recipes });
};

const recipeDetail = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipeModel.findRecipeById(id);
  res.render('recipeDetails', { user: req.user, recipes });
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipeModel.findRecipeById(id);
  res.render('editRecipe', { user: req.user, recipes });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const recipes = await recipeModel.findRecipeById(id);
  res.render('deleteRecipe', { user: req.user, recipes });
};

const searchRecipe = async (req, res) => {
  const recipes = await recipeModel.searchRecipe(req.query.q);
  res.render('searchRecipe', { user: req.user, message: 'Nenhuma receita encontrada', recipes });
};

const recipeForm = (_, res) => res.status(200).render('newRecipe', { message: null });

const newRecipe = async (req, res) => {
  const { id, firstName } = req.user;
  const { name, ingredients, instructions } = req.body;
  const recipe = { id, firstName, name, ingredients, instructions };
  const recipes = await recipeModel.findAllRecipes();

  recipeModel.newRecipe(recipe);

  return res.status(200).render('home', { user: req.user, recipes });
};

module.exports = {
  listAllRecipes,
  recipeDetail,
  editRecipe,
  deleteRecipe,
  searchRecipe,
  recipeForm,
  newRecipe,
};

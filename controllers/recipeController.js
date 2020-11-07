const { findByName } = require('../models/recipesModel');
const Recipes = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipe = await Recipes.getRecipes();
  return res.render('home', { recipe, user: req.user });
};

const recipeDetail = async (req, res) => {
  const { id } = req.params;
  const theRecipe = await Recipes.findById(id);
  return res.render('recipeDetail', { theRecipe, user: req.user });
};

const recipeByName = async (req, res) => {
  const { name } = req.params;
  const recName = await Recipes.findByName(name);
  return res.render('recipeDetail', { recName, user: req.user });
};

const recipeSearch = async (req, res) => {
  const { search } = req.query;
  const recipes = await findByName(search);
  return res.render('searchRecipe', { recipes, user: req.user });
};

const addNewRecipe = (req, res) => {
  res.render('newRecipe', { user: req.user });
};

const createRecipe = async (req, res) => {
  const { recipeName, ingredients, instruction } = req.body;
  const { id, firstName, lastName } = req.user;
  const fullName = `${firstName} ${lastName}`;
  await Recipes.addRecipe(id, fullName, recipeName, ingredients, instruction);
  res.redirect('/');
};

module.exports = {
  listRecipes,
  recipeDetail,
  recipeByName,
  recipeSearch,
  addNewRecipe,
  createRecipe,
};

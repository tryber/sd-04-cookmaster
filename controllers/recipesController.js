const Recipes = require('../models/recipesModel');

const showAll = async (req, res) => {
  const allRecipes = await Recipes.getAll();

  res.render('home', { allRecipes, user: req.user });
};

const showOne = async (req, res) => {
  const recipeDetails = await Recipes.getById(req.params.id);

  res.render('recipeDetails', { recipeDetails, user: req.user });
};

const searchRecipes = async (req, res) => {
  const recipes = await Recipes.getByName(req.query.q);

  res.render('search', { recipes, user: req.user });
};

const myRecipes = async (req, res) => {
  const recipes = await Recipes.getRecipesByUserId(req.user.id);

  res.render('myRecipes', { recipes, user: req.user });
};

const renderNewRecipe = (req, res) => res.render('newRecipe', { user: req.user });

const addNewRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { name: userName, id } = req.user;
  await Recipes.addNewRecipe(id, userName, name, ingredients, instructions);
  res.render('newRecipe', { user: req.user });
};

module.exports = { showAll, showOne, searchRecipes, myRecipes, renderNewRecipe, addNewRecipe };

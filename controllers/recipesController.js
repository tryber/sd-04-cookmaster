const recipesModel = require('../models/recipesModel');
const Recipes = require('../models/recipesModel');

const showAll = async (req, res) => {
  const allRecipes = await Recipes.getAll();

  res.render('home', { allRecipes, user: req.user });
};

const showOne = async (req, res) => {
  const recipeDetails = await Recipes.getById(req.params.id);

  res.render('recipeDetails', { recipeDetails, user: req.user });
};

const searchQuery = async (req, res) => {
  const searchedRecipes = await Recipes.getByName(req.query.q);

  res.render('recipes/search', { searchedRecipes, user: req.user });
};

const renderNew = (req, res) => res.render('recipes/new', { user: req.user });

const addNew = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { name: userName, id } = req.user;
  await recipesModel.addRecipe(id, userName, name, ingredients, instructions);

  res.render('recipes/new', { user: req.user });
};

module.exports = { showAll, showOne, searchQuery, addNew, renderNew };

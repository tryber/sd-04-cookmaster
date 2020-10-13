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
  console.log(searchedRecipes);

  res.render('recipesSearch', { searchedRecipes, user: req.user });
};

module.exports = { showAll, showOne, searchQuery };

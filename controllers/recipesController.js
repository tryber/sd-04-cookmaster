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

module.exports = { showAll, showOne, searchRecipes };

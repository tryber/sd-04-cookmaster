const recipesModel = require('../models/recipesModel');


const index = async (req, res) => {
  const recipes = await recipesModel.getAll();

  res.render('home', { recipes, user: req.user });
};

const show = async (req, res) => {
  const recipeDetails = await recipesModel.getById(req.params.id);

  res.render('recipes/details', { recipeDetails, user: req.user });
};

const search = async (req, res) => {
  const searchedRecipes = await recipesModel.getByName(req.query.q);
  const userRecipes = await recipesModel.getUserRecipes(req.user.id);

  res.render('recipes/search', { searchedRecipes, userRecipes, user: req.user });
};

module.exports = {
  index,
  show,
  search,
};

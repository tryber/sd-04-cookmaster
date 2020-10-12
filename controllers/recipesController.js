const Recipe = require('../models/recipesModel');

const home = async (req, res) => {
  const recipes = await Recipe.findAll();
  res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const recipes = await Recipe.findById(req.params.id);
  res.render('recipes', { recipes, user: req.user });
};

const search = async (req, res) => {
  const param = req.query.q;
  const recipes = await Recipe.findByName(param);
  res.render('search', { param, recipes });
};

const newRecipe = async (_, res) => {
  res.render('newRecipe');
};

const recipes = async (req, res) => {
  await Recipe.nRecipe(req.body, req.user);
  res.redirect('/');
};

module.exports = {
  home,
  recipeDetails,
  search,
  newRecipe,
  recipes,
};

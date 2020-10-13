const Recipe = require('../models/recipesModel');
const userModel = require('../models/userModel');

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

const editRecipe = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.render('editRecipe', { recipe });
};

const recipeEdition = async (req, res) => {
  await Recipe.editRecipe(req.params.id, req.body.name, req.body.items, req.body.setting);
  res.redirect('/');
};

const deleteRecipe = async (req, res) => {
  const id = req.params.id;
  const pass = await userModel.getPass(req.user.id);
  let message = req.query.message;
  if (message) message = decodeURIComponent(message);
  res.render('deleteRecipe', { pass, message, id });
};

const recipeDelete = async (req, res) => {
  await Recipe.deleteRecipe(req.params.id);
  res.redirect('/');
};

module.exports = {
  home,
  recipeDetails,
  search,
  newRecipe,
  recipes,
  editRecipe,
  recipeEdition,
  deleteRecipe,
  recipeDelete,
};

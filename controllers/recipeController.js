const Recipes = require('../models/recipeModel');

const listAllRecipes = async (req, res) => {
  const recipes = await Recipes.getAllRecipes();

  res.status(200).render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (!id) res.status(404).render('notFound');

  res.status(200).render('recipes', { recipe, user: req.user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;
  const recipes = q ? await Recipes.searchRecipeByName(q) : await Recipes.getAllRecipes();
  let message;
  if (!recipes || recipes === []) message = 'Nada encontrado...';

  res.status(200).render('searchRecipe', { recipes, user: req.user, message });
};

const addRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  // console.log(name, instructions);

  await Recipes.createRecipe(req.id, req.user, name, ingredients, instructions);
  res.render('newRecipe');
};

const newRecipe = async (req, res) => {
  res.render('newRecipe', { user: req.user });
};

module.exports = {
  recipeDetails,
  listAllRecipes,
  newRecipe,
  addRecipe,
  searchRecipe,
};

const Recipes = require('../models/recipeModel');

const listAllRecipes = async (req, res) => {
  const recipes = await Recipes.getAllRecipes();

  res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (!id) res.status(404).render('notFound');

  res.render('recipes', { recipe, user: req.user });
};

const addRecipe = (req, res) => {
  res.render('newRecipe');
};

const createRecipe = async (req, res) => {
  const { id, user, name, ingredients, instructions } = await req.body;
  const newRecipeCreated = await Recipes.createRecipe(id, user, name, ingredients, instructions);

  console.log(newRecipeCreated);

  res.render('newRecipe', { newRecipeCreated });
};

module.exports = { recipeDetails, listAllRecipes, createRecipe };

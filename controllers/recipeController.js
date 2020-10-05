const Recipes = require('../models/recipeModel');

const listAllRecipes = async (req, res) => {
  const recipes = await Recipes.getAllRecipes();

  console.log('listAll',req.user);

  res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (!id) res.status(404).render('notFound');

  console.log('usuário: ', req.user);

  res.render('recipes', { recipe, user: req.user });
};

const createRecipe = async (req, res) => {
  const { id, user, name, ingredients, instructions } = await req.body;
  const newRecipeCreated = await Recipes.create(id, user, name, ingredients, instructions);

  res.render('newRecipe', { newRecipeCreated });
};

module.exports = { recipeDetails, listAllRecipes, createRecipe };

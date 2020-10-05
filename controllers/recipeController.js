const Recipes = require('../models/recipeModel');

const listAllRecipes = async (_req, res) => {
  const recipes = await Recipes.getAllRecipes();

  // console.log('recipes home\n', recipes);

  res.render('home', { recipes });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (!id) res.status(404).render('notFound');

  // console.log(req.params);
  // console.log('receita/:id', recipe);

  res.render('recipes', { recipe });
};

const createRecipe = async (req, res) => {
  const { id, user, name, ingredients, instructions } = await req.body;
  const newRecipeCreated = await Recipes.create(id, user, name, ingredients, instructions);
  console.log('recipe Created!\n', newRecipeCreated);

  // res.render('newRecipe', { newRecipeCreated });
};

module.exports = { recipeDetails, listAllRecipes, createRecipe };

const { getAllRecipes, getRecipeById } = require('../models/recipesModel');

const homeRecipes = async ({ userData = false }, res) => {
  const recipes = await getAllRecipes();
  res.render('home', { recipes, userData });
};

const oneRecipe = async ({ params: { id }, userData = false }, res) => {
  const recipe = await getRecipeById(id);
  res.render('recipe', { ...recipe, userData });
};

module.exports = {
  homeRecipes,
  oneRecipe,
};

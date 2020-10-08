const recipe = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  try {
    const recipes = await recipe.getAllRecipes();
    return res.render('home', { recipes, user: req.user });
  } catch (error) {
    return error;
  }
};

const showRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipeResult = await recipe.getRecipeById(Number(id));
    console.log(recipeResult);
    return res.render('recipe', { recipeResult, user: req.user });
  } catch (error) {
    return error;
  }
};

module.exports = {
  listRecipes,
  showRecipeById
};

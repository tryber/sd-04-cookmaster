const recipeModel = require('../models/recipeModel');

const getAllRecipes = async (req, res) => {
  const recipes = await recipeModel.findAllRecipes();
  return res.render('home', {
    recipes,
    message: `foram encontrados ${recipes.length} receitas`,
    user: req.user,
  });
};

const showMoreInfo = async (req, res) => {
  const recipeData = await recipeModel.findRecipeById(req.params.id);
  return res.render('recipes/recipeInfo', {
    recipeData: recipeData[0],
    message: null,
    user: req.user,
  });
};

module.exports = {
  getAllRecipes,
  showMoreInfo,
};

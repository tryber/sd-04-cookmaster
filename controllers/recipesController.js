const { getRecipes, findRecipeById } = require('../models/getRecipes');


const getAllRecipes = async (req, res) => {
  const recipes = await getRecipes();
  const { token = '' } = req.cookies || {};
  return res.render('home', { recipes, token });
};

const getRecipe = async (req, res) => {
  const { user } = req;
  const recipe = await findRecipeById(req.params.id);
  const isRecipeCreator = (!!user && user.id === recipe.userId);

  return res.render('recipeDetails', { recipe, isRecipeCreator });
};

module.exports = {
  getAllRecipes,
  getRecipe,
};

const { getRecipes, findRecipeById, getRecipesByName } = require('../models/getRecipes');


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

const searchRecipe = async (req, res) => {
  const { q } = req.query;
  const recipes = await getRecipesByName(q);
  res.render('searchRecipe', { recipes });
}

module.exports = {
  getAllRecipes,
  getRecipe,
  searchRecipe,
};

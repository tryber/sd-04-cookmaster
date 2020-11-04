const recipesModel = require('../models/recipesModel');

const listAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();

  try {
    res.status(200).render('home', { recipes, user: req.user });
  } catch (error) {
    res.status(500).send('<p>Desculpe, ocorreu algum erro, tente novamente<p>');
  }
};

const recipeDetail = async (req, res) => {
  const recipe = await recipesModel.getRecipeById(req.params.id);

  const { ingredients } = recipe;
  const ingredientsSplit = ingredients.split(',');
  recipe.ingredients = ingredientsSplit;

  res.status(200).render('details', { recipe, user: req.user });
};

module.exports = {
  listAllRecipes,
  recipeDetail,
};

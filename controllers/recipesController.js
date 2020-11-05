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

const searchRecipesByQuery = async (req, res) => {
  const { q } = req.query;
  console.log('q:', q);
  
  if (q === '') return res.render('searchRecipes', { recipes: [], user: req.user });
  
  const recipes = await recipesModel.getRecipeByQuery(q);
  console.log('recipes:', recipes);

  
  return res.render('searchRecipes', { recipes, user: req.user });
};

module.exports = {
  listAllRecipes,
  recipeDetail,
  searchRecipesByQuery,
};

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

const searchPage = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.render('recipes/recipeSearch', { recipes: null, user: req.user });
  }

  const recipes = await recipeModel.findSearchRecipes(q);
  return res.render('recipes/recipeSearch', { recipes, user: req.user });
};

const newRecipe = (req, res) => res.render('recipes/newRecipe', { user: req.user });

const postRecipe = async (req, res) => {
  const user = req.user;
  if (user) {
    const recipeData = {
      user_id: req.user.id,
      user: `${req.user.firstName} ${req.user.lastName}`,
      name: req.body.recipeName,
      ingredients: req.body.ingredients.join(','),
      instructions: req.body.preparing,
    };
    await recipeModel.createRecipe(recipeData);
    return res.redirect('/');
  }

  return res.redirect('/');
};

module.exports = {
  getAllRecipes,
  showMoreInfo,
  searchPage,
  newRecipe,
  postRecipe,
};

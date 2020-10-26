const RecipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await RecipeModel.getAllRecipes();
  const user = req.user;
  res.render('home', { recipes, user });
};

const recipeById = async (req, res) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const recipe = await RecipeModel.getByIdRecipe(idNumber);
  const user = req.user;
  res.render('recipeById', { recipe, user });
};

const search = async (req, res) => {
  const user = req.user;
  const { q } = req.query;
  const recipes = await RecipeModel.getRecipeByName(q);
  return res.render('search', { recipes, user, query: q });
};

const cadastroRecipe = async (req, res) => {
  const user = req.user;
  return res.render('addRecipe', { user });
};

const registerRecipe = async (req, res) => {
  const user = req.user;
  const { nomeReceitaInput, ingredients, modoPreparo } = req.body;
  if (typeof ingredients === 'object') {
    await RecipeModel.createRecipe(
      user.id,
      `${user.firstName} ${user.lastName}`,
      nomeReceitaInput,
      ingredients.join(','),
      modoPreparo,
    );
  } else {
    await RecipeModel.createRecipe(
      user.id,
      `${user.firstName} ${user.lastName}`,
      nomeReceitaInput,
      ingredients,
      modoPreparo,
    );
  }
  res.redirect('/');
};

module.exports = { listRecipes, recipeById, search, cadastroRecipe, registerRecipe };

const { getRecipes, getRecipesById, getRecipesByName, createNewRecipe } = require('../models/recipesModel');

const recipesCtrl = async (req, res) => {
  const recipes = await getRecipes();
  const { token } = req.cookies || {};
  return res.render('home', { recipes, token });
};

const recipesDtls = async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipesById(id);
  return res.render('recipesDetails', { recipe, user: req.user });
};

const recipesSearch = async (req, res) => {
  const { q } = req.query;
  const recipes = await getRecipesByName(q);
  return res.render('searchRecipes', { recipes, user: req.user });
};

const newRecipeForm = async (req, res) => res.render('newRecipes', { user: req.user });

const newRecipe = async (req, res) => {
  const { nome, ingredientes, instrucoes } = req.body;
  const { id, name, lastName } = req.user;
  
  await createNewRecipe(
    id,
    `${name} ${lastName}`,
    nome,
    ingredientes,
    instrucoes,
  );

  return res.redirect('/');
};

module.exports = {
  recipesCtrl,
  recipesDtls,
  recipesSearch,
  newRecipeForm,
  newRecipe,
};

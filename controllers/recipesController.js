const { getRecipes, getRecipesById, getRecipesByName, createNewRecipe, updateRecipe, getRecipesByUserID } = require('../models/recipesModel');

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

const editRecipeForm = async (req, res) => {
  const { id } = req.params;
  const recipe = await getRecipesById(id);
  if (req.user.id !== recipe.userId) return res.redirect(`/recipes/${id}`);
  return res.render('editRecipes', { recipe, user: req.user });
};

const editRecipe = async (req, res) => {
  const { nome, ingredientes, instrucoes } = req.body;
  const { id } = req.params;

  await updateRecipe(id, nome, ingredientes, instrucoes);

  return res.redirect('/');
};

const myRecipes = async (req, res) => {
  const { user } = req;
  const recipes = await getRecipesByUserID(user.id);

  res.render('myRecipes', { recipes, user })
};

module.exports = {
  recipesCtrl,
  recipesDtls,
  recipesSearch,
  newRecipeForm,
  newRecipe,
  editRecipeForm,
  editRecipe,
  myRecipes,
};

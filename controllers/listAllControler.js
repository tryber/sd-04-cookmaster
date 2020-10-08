const { getAll, getRecipeById, searchRecipeModel, newRecipeInsert, updateRecipeModel, getRecipeByUser, deleteModel } = require('../models/listRecipesModel');
const { findById } = require('../models/userModel');

const listRecipes = async (req, res) => {
  const recipes = await getAll();

  return res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeById(id);

  return res.render('recipeDetails', { recipe, user: req.user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  if (q === '') return res.render('search', { recipes: null, user: req.user });

  const recipes = await searchRecipeModel(q);
  return res.render('search', { recipes, user: req.user });
};

const NewRecipe = async (req, res) =>
  res.render('newRecipe', { message: null, user: req.user });

const newRecipeForm = async (req, res) => {
  const formInfo = req.body;
  await newRecipeInsert(req.user, formInfo);
  res.redirect('/');
};

const editRecipe = async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeById(id);

  res.render('editRecipe', { recipe, user: req.user });
};

const updateRecipe = async (req, res) => {
  const { nameRec, ingredients, instructions } = req.body;
  const { id } = req.params;

  await updateRecipeModel(id, nameRec, ingredients, instructions);
  res.redirect('/');
};

const myRecipes = async (req, res) => {
  const { id } = req.user;

  const recipes = await getRecipeByUser(id);

  res.render('myRecipes', { recipes, user: req.user });
};

const deleteRecipePage = async (req, res) => {
  const recipe = req.params;

  res.render('deleteRecipe', { message: null, recipe, user: req.user });
};

const deleteRecipe = async (req, res) => {
  const { confirmPassword } = req.body;
  const recipe = req.params;
  const { id } = req.user;

  const completeUser = await findById(id);
  const { password } = completeUser;

  if (password !== confirmPassword) {
    res.render('deleteRecipe', { message: 'Senha incorreta.', recipe, user: req.user });
  }

  await deleteModel(recipe.id);
  res.redirect('/');
};

module.exports = {
  listRecipes,
  recipeDetails,
  searchRecipe,
  NewRecipe,
  newRecipeForm,
  editRecipe,
  updateRecipe,
  myRecipes,
  deleteRecipePage,
  deleteRecipe,
};

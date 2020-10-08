const recipesModel = require('../models/recipesModel');
const { findById } = require('../models/userModel');

const listRecipes = async (req, res) => {
  const recipes = await recipesModel.getRecipes();
  res.render('home', { recipes, user: req.user });
};

const details = async (req, res) => {
  const { id } = req.params;
  const recipeDetails = await recipesModel.getRecipeDetails(id);
  res.render('recipeDetails', { recipeDetails, user: req.user, id });
};

const searchRecipes = async (req, res) => {
  const { q } = req.query;

  const recipes = await recipesModel.getRecipes();

  if (!q) return res.render('searchRecipes', { user: req.user, recipeByName: null });

  const recipeByName = recipes.find((recipe) => recipe.recipeName === q);

  return res.render('searchRecipes', { recipeByName, user: req.user });
};

const registerRecipes = async (req, res) => {
  res.render('registerRecipes', { user: req.user });
};

const newRecipe = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  const userName = `${req.user.name} ${req.user.lastName}`;
  const userID = req.user.id;

  await recipesModel.createRecipe(userID, userName, recipeName, ingredients, instructions);
  res.render('recipes');
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const recipeDetails = await recipesModel.getRecipeDetails(id);
  res.render('editRecipe', { user: req.user, recipeDetails, id });
};

const confirmUpdate = async (req, res) => {
  console.log(req.user);
  console.log(req.params);
  // se editada com sucesso
  // const recipes = await recipesModel.getRecipes();
  res.render('home', { recipes, user: req.user });
};

const deleteRecipe = async (req, res) => {
  const id = req.params.id;
  res.render('deleteRecipe', { user: req.user, message: null, id });
};

const checkPassword = async (req, res) => {
  const { password } = req.body;
  const userID = req.user.id;
  const recipeID = req.params.id;

  const userData = await findById(userID);
  if (password === userData.password) {
    await recipesModel.removeRecipe(recipeID);
    return res.redirect('/');
  }
  return res.render('deleteRecipe', { message: 'Senha Incorreta.', id: recipeID });
};

module.exports = {
  listRecipes,
  details,
  searchRecipes,
  newRecipe,
  registerRecipes,
  editRecipe,
  confirmUpdate,
  deleteRecipe,
  checkPassword,
};

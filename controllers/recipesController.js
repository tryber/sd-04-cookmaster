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

  await recipesModel.createRecipe(userID, userName, recipeName, ingredients.join(), instructions);
  const recipes = await recipesModel.getRecipes();
  res.render('home', { recipes, user: req.user });
};

const editRecipe = async (req, res) => {
  const recipeID = req.params.id;
  const recipeDetails = await recipesModel.getRecipeDetails(recipeID);
  res.render('editRecipe', { user: req.user, recipeDetails, id: recipeID });
};

const confirmUpdate = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  const recipeID = req.params.id;

  const recipeDetails = await recipesModel.getRecipeDetails(recipeID);

  const userID = req.user.id;

  if (userID === recipeDetails.userID) {
    await recipesModel.editRecipe(recipeID, recipeName, ingredients.join(), instructions);
    const recipes = await recipesModel.getRecipes();
    res.render('home', { recipes, user: req.user });
  }

  return res.redirect(`/recipes/${recipeID}`);
};

const deleteRecipe = async (req, res) => {
  const recipeID = req.params.id;
  res.render('deleteRecipe', { user: req.user, message: null, id: recipeID });
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

const myRecipes = async (req, res) => {
  const userID = req.user.id;
  const recipes = await recipesModel.getRecipesByUserId(userID);
  res.render('myRecipes', { recipes, user: req.user });
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
  myRecipes,
};

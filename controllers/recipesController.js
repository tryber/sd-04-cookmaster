const recipesModel = require('../models/recipesModel');

const allRecipes = async (req, res) => {
  const recipes = (await recipesModel.fetchAllRecipesModel()) || [];
  return res.render('home', { recipes, message: null, user: req.user });
};

const recipePage = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.fetchRecipeIdModel(id);
  return res.render('recipe', { recipe, message: null, user: req.user });
};

const searchRecipes = async (req, res) => {
  const name = req.query.q;
  let recipes = [];
  if (name) {
    recipes = await recipesModel.fetchRecipeNameModel(name);
  }
  return res.render('search', { recipes, message: null, user: req.user });
};

const createRecipePage = async (req, res) =>
  res.render('createRecipe', { message: null, redirect: null, user: req.user });

const createRecipe = async (req, res) => {
  const {
    body: { name, ingredients, instructions },
    user,
  } = req;
  const warningCounts = await recipesModel.insertRecipeIdModel(
    user.id,
    `${user.firstName} ${user.lastName}`,
    name,
    ingredients.join(),
    instructions,
  );
  if (warningCounts > 0) {
    res.status(400);
    return res.render('createRecipe', {
      message: 'Algum erro aconteceu e a receita não foi cadastrada!',
      redirect: null,
      user: req.user,
    });
  }
  res.status(200);
  return res.redirect('/');
};
const editRecipePage = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.fetchRecipeIdModel(id);
  const user = req.user;
  if (user.id !== recipe.userId) {
    return res.redirect('/');
  }

  return res.render('editRecipe', { recipe, message: null, redirect: null, user: req.user });
};
const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  if (name && ingredients && instructions) {
    await recipesModel.updateRecipeModel(id, name, ingredients.join(), instructions);
  }
  return res.redirect('/');
};

const myRecipes = async (req, res) => {
  let recipes = (await recipesModel.fetchAllRecipesModel()) || [];
  const user = req.user;
  recipes = recipes.filter((recipe) => recipe.userId === user.id);
  return res.render('myRecipes', { recipes, message: null, user });
};
module.exports = {
  allRecipes,
  recipePage,
  searchRecipes,
  createRecipe,
  createRecipePage,
  editRecipe,
  editRecipePage,
  myRecipes,
};

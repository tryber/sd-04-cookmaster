// const { in } = require('sequelize/types/lib/operators');
// const { recipeController } = require('.');
const { getRecipe } = require('../models/recipeModel');
const recipeModel = require('../models/recipeModel');

async function listRecipes(req, res) {
  const recipes = await recipeModel.getAllRecipes();
  return res.render('home', { recipes, user: req.user });
}

async function showRecipesByUser(req, res) {
  const recipes = await recipeModel.getRecipe(Number(req.params.id));
  res.render('recipe', { recipes, user: req.user });
}

async function myRecipes(req, res) {
  const recipes = await recipeModel.getAllRecipes();
  res.render('userRecipes', { recipes, user: req.user });
}

async function searchRecipe(req, res) {
  const recipes = await recipeModel.getRecipeByName(req.query.q);
  res.render('search', { recipes, user: req.user });
}

async function recipeRegister(req, res) {
  res.render('new', { user: req.user, message: null });
}

async function recipeEdit(req, res) {
  // const { idUser } = req.user;
  const { id } = req.params;
  const recipe = await getRecipe(id);

  const ingredients = recipe.ingredients.split(',');
  console.log(ingredients);
  res.render('edit', { recipe, ingredients, user: req.user, message: null });
}

async function saveEdit(req, res) {
  // const { idUser } = req.user;
  const { id } = req.params;
  const { uRecipeName, uIngredients, uPrepare } = req.body;

  const recipe = await getRecipe(id);
  // const newIngredients = uIngredients.split(',');

  await recipeModel.updateRecipe(id, uRecipeName, uIngredients.toString(), uPrepare);
  return res.redirect('/');
}

async function newRecipe(req, res) {
  const { recipeName, ingredients, prepare } = req.body;
  const { idUser, name, lastName } = req.user;
  // console.log(req.user);

  if (!recipeModel.verifyData(recipeName, ingredients, prepare)) {
    return res.status(400).render('new', { user: req.user, message: 'Preencha todos os campos' });
  }
  {
    const userName = await `${name} ${lastName}`;
    await recipeModel.createRecipe(idUser, userName, recipeName, ingredients.toString(), prepare);
    return res.redirect('/');
  }
}

module.exports = {
  listRecipes,
  showRecipesByUser,
  searchRecipe,
  recipeRegister,
  newRecipe,
  recipeEdit,
  saveEdit,
  myRecipes,
};
